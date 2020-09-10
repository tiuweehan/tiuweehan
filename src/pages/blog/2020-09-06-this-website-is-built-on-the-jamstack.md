---
templateKey: blog-post
uuid: ffd0ccb4-3a4e-4862-bce5-7ec455ec6ad5
title: This website is built on the JAMStack
date: 2020-09-06T14:25:59.038Z
description: "Gatsby + Netlify CMS: A deadly combo"
featuredpost: false
featuredimage: /img/website-architecture.png
tags:
  - JAMStack
---
The best way to learn something is to get your hands dirty.

I wanted to learn more about site reliability engineering (SRE) previously, so I had planned to build an application with a complete infrastructure for my previous landing page that would've looked something like this.

<div style="margin:auto; max-width:1000px"> 

![full-architecture](/img/full-architecture.png)

</div>

You might ask, why are you putting in so much effort just to build a landing page? Well, I just think it's really fascinating to be in full control of an entire system from top to bottom and understanding how each component works and interacts with one another.

But on the other hand, I just wanted a simple landing page with a blog, and this solution is way too time consuming and expensive. I guess this is a typical *what the developer wants vs what is practical* kinda scenario. I do have plans to build a similar application for a larger scale project some time in the future, but for now I just need a website.

In the meantime, I had heard great things about the JAMStack, along with the many associated buzzwords (static site generators, headless CMS, CDNs, etc) and how they were awesome for building websites, so I thought why not give it a try? Spoiler alert: it turned out to be a good decision :)

<br />

# What is the JAMStack?

<div style="margin:auto; max-width:1000px"> 

![jamstack](/img/jamstack.jpg)

</div>

The [JAMStack](https://jamstack.wtf/) stands for **JavaScript**, **APIs** and **Markup**.

* **JavaScript**: Dynamic functionalities are handled by JavaScript, e.g. React, Angular, Vue, Svelte
* **APIs**: Server side operations are abstracted into reusable APIs and accessed over HTTPS with JavaScript. These APIs can be third party tools or a custom function.
* **Markup**: Websites are served as static HTML files which are often generated from source files (e.g. Markdown) using a Static Site Generator.

The JAMStack is more of a concept than an actual stack. You may be familiar with the LAMP (Linux Apache MySQL PHP) stack or MEAN (MongoDB Express Angular NodeJS) stack. Unlike these stacks however, the JAMStack is not built on any specific technologies.

According to Netlify, this is the [definition](https://jamstack.org/) of the JAMStack.

> Fast and secure sites and apps delivered by **pre-rendering files and serving them directly from a CDN**, removing the requirement to manage or run web servers.

If you don't know what that means, in essence the JAMStack is optimised for speed 🏃‍♂️🏃‍♂️🏃‍♂️

However, the main thing I find attractive is that the JAMStack is **Serverless**, meaning there is no need to maintain any infrastructure (which is a 180º change from my initial plans). This allows the developer to focus on application development and getting an application up and running in no time.

A huge bonus is that websites built on the JAMStack can be completely ***free***. This is mainly because of the free services offered by [Netlify](https://www.netlify.com/), a San Francisco-based cloud computing company. To the people at Netlify, I would like to thank you on behalf of all broke student developers for your service. You da real MVP!

<br />

# Building this website

<div style="margin:auto; max-width:1000px"> 

![website-architecture](/img/website-architecture.png)

</div>

<figcaption>Illustration of how the website works</figcaption>

<br />

This website was built on Gatsby and is deployed on Netlify. I developed this website in about 3  full days, which is testament to how quickly the JAMStack allows for building websites.

To be fair, I did not build this website from scratch, but instead used the [Gatsby-Netlify-CMS starter](https://github.com/netlify-templates/gatsby-starter-netlify-cms) a base for my project. A demo of the starter can be found [here](https://gatsby-netlify-cms.netlify.app/). Before I continue, let me share a bit more about Gatsby and Netlify CMS.

<br />

## Gatsby

<br />

<div style="margin:auto; max-width:500px"> 

![gatsby](/img/gatsby.png)

</div>

<br/>

[Gatsby](https://www.gatsbyjs.com/) is a static site generator. As the name suggests, it is used to generate static sites (Read more about [static vs dynamic sites here](https://wpamelia.com/static-vs-dynamic-website/)). There are many static site generators out there, such as 

* [Hugo](https://gohugo.io/)
* [Jekyll](https://jekyllrb.com/)
* [Gitbook](https://www.gitbook.com/)

which are all great, but I chose Gatsby because it is React-based, and React is a framework I am very familiar with.

Gatsby also uses GraphQL (as opposed to REST API) to fetch data, which is something I've been wanting to learn for a while. Read more about [GraphQL vs REST here](https://www.apollographql.com/blog/graphql-vs-rest-5d425123e34b/).

Other plus points of Gatsby include [server-side rendering](https://www.gatsbyjs.com/docs/glossary/server-side-rendering/), a rich [plugin ecosystem](https://www.gatsbyjs.com/plugins), and good [documentation](https://www.gatsbyjs.com/docs/).

I had never used Gatsby before, but since the great Dan Abramov uses it for his [personal blog](https://overreacted.io/), I was sold.

<br />

## Netlify CMS

<br />

<div style="margin:auto; max-width:500px"> 

![netlify-cms](/img/netlify-cms.png)

</div>

<br/>

[Netlify CMS](https://www.netlifycms.org/) is a headless content management system (CMS) that uses the project's Git repo to store data as human readable Markdown. It also provides a nice web GUI interface for editing content directly on the <code>/admin</code> path of your website.

<br />

<div style="margin:auto; max-width: 1000px">

![](/img/netlify-cms-preview.png)

</div>

<br />

<figcaption>Netlify CMS editor + preview for this website</figcaption>

<br />

This is really awesome because

1. There is no need for an external database for storing website data, unlike other CMS like Wordpress or Drupal.
2. You can preview how the content will look like on your website in real time.
3. The UI and data are managed separately and are hence easier to maintain. This is unlike my previous landing page where the content was hard coded into the website directly.

Of course, this is probably not suitable for storing sensitive data, but still a good choice for a landing page or documentation site.

An added bonus is that since the data is stored in Git, you can track how the contents of your website evolve over time.

While I had never used Netlify CMS before, I had made some contributions to its development when I was taking [CS3282](https://latest.nusmods.com/modules/CS3282/thematic-systems-project-ii) (a software engineering module in NUS), and I really liked its concept. 

It would be nice if there was a way to configure it such that the UI and data are in separate repos though. I may consider building this feature next time.

<br />

## TypeScript

<div style="margin:auto; max-width:500px"> 

![typescript](/img/typescript.png)

</div>

My first order of business was to add [TypeScript](https://www.typescriptlang.org/) to the project. While some developers may not feel the need to use TypeScript for small scale projects, I personally feel that *all* JavaScript projects should move to TypeScript as early as possible. The amount of time saved from the IDE identifying compile-time errors far outweighs the time needed to implement TypeScript.

It was my first time using GraphQL, and integrating TypeScript with GraphQL wasn't as straightforward as with RESTful APIs. There weren't many resources (if any) on implementing TypeScript for this specific stack (Gatsby + Netlify CMS), so I had to figure out many of the types. But was a good exercise and aided me in understanding the codebase.

<br />

## Netlify

<br />

<div style="margin:auto; max-width:400px"> 

![netlify](/img/netlify.png)

</div>

<br />

[Netlify](https://www.netlify.com/) is a company that offers hosting and backend serverless services. Netlify offers free static website hosting, which are great for deploying your very own landing page.

I have also used Netlify together with [Heroku](https://www.heroku.com/) for other projects as a staging environment for full-stack applications.

The process of using Netlify is simple.

1. Create a Netlify account
2. Add a <code>[netlify.toml](https://docs.netlify.com/configure-builds/file-based-configuration/)</code> file to your project repo with your project configuration (e.g. startup script)
3. Push your repo to GitHub
4. Link Netlify to your GitHub repo

That's it! Netlify will automatically build and deploy your website at a <code>*.netlify.app</code> subdomain of your choice. In my case, my website is hosted on <code>weehan.netlify.app</code>.

<br />

### Configuring DNS (Domain Name System)

My next step was to point my domain <code>www.tiuweehan.com</code> to <code>weehan.netlify.app</code>. This was my main worry when I embarked on this project because I didn't know if this was possible. In hindsight I should have probably done this step before starting on development work, but thankfully everything worked out.

<br />

![](/img/digitalocean-dns.png)

<figcaption>My DNS records on DigitalOcean</figcaption>

<br />

The problem is that I manage my domain's DNS records from my [DigitalOcean](https://www.digitalocean.com/) account, and my apex domain (i.e. <code>tiuweehan.com</code>) points to a DigitalOcean droplet (*See A Record above*). I use this droplet for other stuff (e.g. self-hosted [Jenkins](https://www.jenkins.io/) and [Bitwarden](https://bitwarden.com/)) so I can't use my apex domain for my Netlify landing page.

This means I have to use a subdomain like <code>www.tiuweehan.com</code> for my landing page. An easy option would be to transfer my DNS records from DigitalOcean to Netlify DNS. However, I have some <code>MX</code> records for configuring my email, and transferring these records could potentially break something.

Thankfully, Netlify DNS allows [configuring external DNS for a custom domain](https://docs.netlify.com/domains-https/custom-domains/configure-external-dns/), though there were some caveats for the <code>www</code> subdomain. It took a while to figure things out, but <code>www.tiuweehan.com</code> was finally up!

<br />

<div style="margin:auto; max-width: 1000px">

![](/img/netlify-dns.png)

</div>

<div style="text-align:center"><i>My DNS records on Netlify</i></div>

<br /><br />

Since nobody types <code>www</code> anymore, I also have an Nginx server running on my DigitalOcean droplet to 301 redirect all requests from <code>tiuweehan.com</code> to <code>www.tiuweehan.com</code>.

<br />

```nginx
server {
    # Listen on port 80
    listen 80;
    listen [::]:80;

    # Server names
    server_name tiuweehan.com;

    # Redirect to HTTPS
    location / {
        return 301 https://www.tiuweehan.com$request_uri;
    }
}

server {
    # List on port 443
    listen 443;
    listen [::]:443;

    # Server names
    server_name tiuweehan.com;

    # Redirect to HTTPS
    location / {
        return 301 https://www.tiuweehan.com$request_uri;
    }
}
```

<figcaption>Nginx conf for 301 redirect from <code>www.tiuweehan.com</code> to <code>tiuweehan.com</code> </figcaption>

<br />

Another awesome feature about Netlify is that it can [automatically configure HTTPS](https://docs.netlify.com/domains-https/https-ssl/) for your website using [Let's Encrypt](https://letsencrypt.org/) certificates for secure access. Man, what did we ever do to deserve Netlify? (P.S. this post is not sponsored by Netlify).

<br />

## Google Analytics

<div style="margin:auto; max-width:600px"> 

![google-analytics](/img/google-analytics.png)

</div>

<br />

[Google Analytics](https://analytics.google.com/) (GA) is a free service provided by Google for logging and analysing incoming traffic to websites. Implementing GA is as easy as installing the [gatsby-plugin-google-analytics](https://www.gatsbyjs.com/plugins/gatsby-plugin-google-analytics/) and passing your GA token as an environment variable during build time. Gatsby plugins ftw!

<br />

## Disqus

<div style="margin:auto; max-width:500px"> 

![disqus](/img/disqus.jpg)

</div>

[Disqus](https://help.disqus.com/en/articles/1717053-what-is-disqus) is a free hosting service for blog comments, and is used to power the comments for this blog post. I implemented Disqus using the [disqus-react](https://github.com/disqus/disqus-react) library, which is (supposed to be) pretty straightforward.

The problem is Disqus requires the url of the page to be passed into its config, and this is usually found at <code>window.location.url</code>. But since Gatsby uses server-side rendering, the <code>window</code> object is not available during build time. I had to access the url from the [<code>location</code> object](https://www.gatsbyjs.com/docs/location-data-from-props/) passed by Gatsby to the root of the application. To prevent having to pass this <code>location</code> object as props through every intermediate component, I used the Provider pattern to pass the object throughout the application (i.e. [React Context](https://reactjs.org/docs/context.html)).

<br />

## Lighthouse

<div style="margin:auto; max-width:500px"> 

![lighthouse](/img/lighthouse.png)

</div>

<br />

[Lighthouse](https://developers.google.com/web/tools/lighthouse) is a browser extension for detecting performance and quality issues with websites. It is available for Chrome and Firefox. It performs an assessment on a website, scores it based on different metrics and presents it on a nice dashboard.

<br />

<div style="margin:auto; max-width: 1000px">

![](/img/lighthouse-result.png)

</div>

<figcaption>Lighthouse results for this website </figcaption>

<br />

Seems like my website did pretty well, but there are some issues I'll have to fix. Note that I haven't actually tried to optimise my website (besides using Gatsby), so I guess that's evidence for how awesome this stack is.

<br />

# Conclusion

Phew, that took a while to write. Sometimes I look back on some of my projects and forgot how and why I implemented them. This post will serve as good future documentation for myself :)

If anyone is even reading this, I hope this post was useful and will perhaps even inspire you to build your own website. I learnt a lot in the process and the results were gratifying. That's all folks!