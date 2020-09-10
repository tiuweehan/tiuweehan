---
templateKey: blog-post
uuid: dc598351-75ab-45c7-a669-43a7a91e0f44
title: Docker in Jenkins in Docker
date: 2020-09-10T17:07:40.202Z
description: Dockerception
featuredpost: false
featuredimage: /img/docker-components.png
tags:
  - docker
  - jenkins
---
<div style="text-align:center"><i>This page is a work in progress</i></div>

<div style="margin:auto; max-width: 500px">

![jenkins](/img/jenkins.png "Jenkins")

</div>

Jenkins is perhaps the most commonly used CI/CD tool for building, testing and deploying applications.

In recent years, the dockerizing of applications has become a standard practice in the industry, and Jenkins is as a result often used for building docker images.

Unlike other popular CI/CD tools like Travis CI or CircleCI, Jenkins is completely **self-hosted**; This means the developer is responsible for deploying the Jenkins application. The benefit however is that it gives the developer full control over the build environment. Coupled with the fact that it is free and open-source, it isn't hard to see why it is widely used.

Since Jenkins is just another application we have to host, an interesting question arises – what if we were to also dockerize Jenkins itself? This leads to a situation where Jenkins requires access to docker from within a docker container.

Well, you might think the solution is easy - just install Docker in Docker, right? As it turns out, there is no obvious solution for this. The official <code>jenkins/jenkins:lts</code> docker image does not come with Docker installed, so we have to look for workarounds.

This was exactly the problem I faced a few months ago, when I was trying to build a Docker image in Jenkins. It took me a few days and extensive Googling to understand and figure out the problem. I found a number of different solutions, but in this article I will present and explain 3 different solutions.

Before I jump into the solutions, let's first understand how Docker works.

# How Docker Works

When I first started learning Docker, my impression was that you just have to install the <code>docker</code> binary and it does everything for you. But there is a lot more going on behind the scenes.

Docker actually uses a **client-server** architecture, kinda like this.

<div style="margin:auto; max-width: 1000px">

![docker-components](/img/docker-components.png "Docker Components")

</div>

<figcaption>Docker client-server architecture</figcaption>

<br />

The **client** refers to the <code>docker</code> binary itself, and is the interface that developers who use Docker are familiar with.

The **server** refers to the **docker daemon**, or <code>dockerd</code>, which is a background process that is responsible for executing the actions requested by the clients. 

The client communicates with the server via a **socket**. A socket allows for 2 processes to communicate with each other, in this case the client and server. For those unfamiliar with networking, a socket is a generic networking construct and is not specific to docker. There are 3 types of sockets used in docker:

* **Unix Socket**: Allows 2 processes on the same operating system to communicate with each other
* **TCP Socket**: Allows 2 processes on same or different hosts to communicate with each other using the TCP protocol
* **FD Socket**: Used on systems that support <code>systemd</code> for [systemd socket activation](http://0pointer.de/blog/projects/socket-activated-containers.html#:~:text=%2D%2D%20Basically%2C%20socket%20activation%20simply,the%20first%20connection%20comes%20in.).

In most cases, only Unix and TCP sockets are used.

An analogy is that the docker client is a **speaker** that issues commands; the docker socket are like **ears** that listen to these commands and sends them to the daemon; the daemon is the **brain** that processes these commands and executes them. 

There are actually a number of other components in Docker (e.g. <code>containerd</code>, which can be thought of as the **hands** in this analogy), but knowing these 3 components is sufficient for understanding the solutions. 

<br />

# Why use such an architecture?

Firstly, it allows for the Docker client to be running separately from the Docker daemon. This allows to issue Docker commands on one host and have it executed on another host. 

Secondly, a Docker daemon can have multiple sockets, and each socket can have multiple clients. This allows the Docker daemon to execute commands received from multiple interfaces. This is just like how the brain has multiple sources of inputs, like eyes and ears, something like this

<div style="margin:auto; max-width: 1000px">

![](/img/naruto.png)

</div>

<figcaption>Each daemon can have multiple sockets, each socket can have multiple clients</figcaption>

<br />

Hopefully you have a better understanding of how Docker works. Let's now look at the different solutions.

<br />

## Solution 1: Build a new Jenkins image with Docker installed

<div style="margin:auto; max-width: 1000px">

![solution-1](/img/solution-1.png "Solution 1")

</div>

<figcaption>Architecture for Solution 1</figcaption>

<br />

The first solution is to install all 3 components directly inside the Jenkins container. We can do by building a new docker image with docker installed over the official <code>jenkins/jenkins:lts</code> image. A sample Dockerfile looks like this

<br />

```dockerfile
from jenkins/jenkins:lts
 
USER root

RUN apt-get update -qq && apt-get install -qqy apt-transport-https ca-certificates curl gnupg2 software-properties-common

RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -

RUN add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"

RUN apt-get update -qq && apt-get install -qqy docker-ce docker-ce-cli containerd.io

RUN usermod -aG docker jenkins

ENTRYPOINT ["/bin/sh", "-c", "service docker start && /sbin/tini -- /usr/local/bin/jenkins.sh"]
```

We can build the image and run a container from the image with following commands:

```shell
# Build image
docker build /path/to/Dockerfile --tag jenkins-docker

# Run container
docker run --rm -d -v ./jenkins_home:/var/jenkins_home -p 8080:8080 -p 50000:50000 --privileged jenkins-docker
```

### Advantages

* The docker processes are generally isolated.

### Disadvantages

* This solution requires giving privileged access to the docker container.
* A new image needs to be built.
* The <code>Entrypoint</code> of the base Jenkins image is overwritten, as there is no (non-super-ultra hacky) way to [extend the Entrypoint of the base image](https://stackoverflow.com/questions/42280792/reuse-inherited-images-cmd-or-entrypoint).
* Installing docker in docker is [generally not recommended](https://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/).

I personally do not like this solution, so let's move on.


<br />

## Solution 2: Mount the host's docker unix socket onto the Jenkins container

<div style="margin:auto; max-width: 1000px">

![solution-2](/img/solution-2.png "Solution 2")

</div>

<figcaption>Architecture for Solution 2</figcaption>

<br />

The second solution is to **mount the docker client and unix socket** into the Jenkins container. This allows the Jenkins container to access the host's docker daemon and create *sibling* containers.

However, this means any containers/images created by the Jenkins container is accessible by the host and vice-versa. A sample <code>docker-compose.yml</code> file is as follows

<br />

```yaml
version: "3.7"

services:
  jenkins:
    image: jenkins/jenkins:lts
    user: root
    container_name: jenkins
    ports:
      - 8080:8080
      - 50000:50000
    volumes:
      - ./jenkins:/var/jenkins_home
      - /usr/bin/docker:/usr/bin/docker
      - /var/run/docker.sock:/var/run/docker.sock
```

### Advantages

* Can work with base Jenkins image directly
* Jenkins container not require privileged access
* Seems like the most common solution on the internet

### Disadvantages

* No isolation between host and Jenkins container
* The docker socket may not have the right permissions within the Jenkins container

<br />

## Solution 3: Run the official docker-in-docker image and expose its TCP socket to the Jenkins container

The saying "the third times the charm" is applicable here. In my humble opinion this is the cleanest solution among the 3. It also took me the longest time to figure out.

<div style="margin:auto; max-width: 1000px">

![solution-3](/img/solution-3.png "Solution 3")

</div>

<figcaption>Architecture for Solution 3</figcaption>

<br />

Docker in docker is a concept not exclusive to this use case. It had been requested many times by developers for a wide variety of use cases. This led to the creation of the official [docker-in-docker](https://hub.docker.com/_/docker) (also known as **dind**) image. Incidentally, this image is used internally by Docker (as in the company) to build and test docker itself. Talk about Dockerception.

This image contains a docker daemon and has a TCP socket bounded at port **2375** (for unencrypted traffic) and **2376** (for encrypted traffic with TLS).  The idea is the mount the docker client into the Jenkins container and use it to connect to the TCP socket over the docker network. This can be done by setting the <code>DOCKER_HOST</code> env variable to <code>tcp://<dind container name>:<port></code> in the Jenkins container. 

In the <code>docker-compose.yml</code> file below, a dedicated network <code>jenkins_dind</code>is used to connect the Jenkins and dind image, so we can use port 2375 in this case.

<br />

```yaml
version: '3.7'
services:
  dind:
    image: docker:dind
    user: root
    privileged: true
    container_name: dind
    expose:
      - 2375
    networks:
      - jenkins_dind
    environment:
      DOCKER_TLS_CERTDIR: ""

  jenkins:
    image: jenkins/jenkins:lts
    user: root
    container_name: jenkins
    depends_on:
      - dind
    ports:
      - 8080:8080
      - 50000:50000
    volumes:
      - ./jenkins:/var/jenkins_home
      - /usr/bin/docker:/usr/bin/docker
    environment:
      DOCKER_HOST: "tcp://dind:2375"
    networks:
      - jenkins_dind

networks:
  jenkins_dind:
    driver: bridge
```

### Advantages

* Can work with base Jenkins image directly
* Isolation between host and Jenkins container

### Disadvantages

* Need to run an additional container
* Need to grant privileged access to dind. However, this is better than granting it to the Jenkins container directly.

# Conclusion

I hope this article helps you to better visualise and understand the Docker architecture, the Docker in Docker problem, as well as the various solutions. 

There are more solutions out there, such as [nestybox](https://www.nestybox.com/), but their implementations should be a variation of the concepts in this article (don't quote me on that though!). I might add on to this article if I find more interesting solutions in the future.

The most ideal scenario would be for Jenkins to release an official solution for this. In the meantime, this a fun problem to solve. That's all folks!