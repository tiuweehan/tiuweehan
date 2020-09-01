---
templateKey: experience-page
path: /experience
title: Experience
image: /img/jumbotron.jpg
experiences:
  - type: work
    heading: Work Experience
    description: ""
    cards:
      - name: AWS
        link: https://en.wikipedia.org/wiki/Amazon_Web_Services
        image: /img/logo-AWS.png
        heading: Amazon Web Services
        subheading: Cloud Architect
        contents:
          - content: >-
              Aug. 2020 – Present


              &nbsp;


              I am currently an intern at Amazon Web Services, tasked to build solutions using AWS services to solve real world problems.
      - name: Shopee
        link: https://en.wikipedia.org/wiki/Shopee
        image: /img/logo-Shopee.png
        heading: Shopee
        subheading: Platform Engineer
        contents:
          - content: >-
              Jun. 2020 – Aug. 2020


              &nbsp;


              I interned under the [Relational Database Service (RDS)](https://careers.shopee.sg/job-detail/2774/) team, a managed database cloud service developed and used internally by Shopee.
          - content: It was a really great internship. I picked up Golang (which is really
              nice to work with!), learnt about the internals of MySQL, and had
              a taste of how tricky it is to design distributed systems.
          - content: My main task was to design and develop a distributed solution for
              performing [hot physical
              backups](https://storagepipe.com/blog/database-backups-logical-vs-physical-hot-vs-cold/)
              and restores on MySQL clusters using
              [XtraBackup](https://www.percona.com/software/mysql-database/percona-xtrabackup).
              The application is a HTTP server with [Idempotent
              APIs](https://www.restapitutorial.com/lessons/idempotency.html#:~:text=From%20a%20RESTful%20service%20standpoint,as%20making%20a%20single%20request.&text=The%20PUT%20and%20DELETE%20methods%20are%20defined%20to%20be%20idempotent.)
              embedded directly into a custom MySQL docker  image.
          - content: Enhancements include parallelised operations, failover and rollback
              mechanisms, data compression and checksum verification. Apart from
              that, I also implemented an S3 server using MinIO for streaming
              and storing database backups remotely.
          - content: Another task I had was to implement an API Gateway in Golang for
              managing and killing database connections to RDS MySQL clusters
              and instances.
          - content: It was a technically challenging but really fun internship. Thankfully
              my knowledge from [CS2105](https://nusmods.com/modules/CS2105) &
              [CS2106](https://nusmods.com/modules/CS2105) came in handy. I am
              also grateful to my mentor for his constant guidance and
              mentorship.
      - name: CVWO
        link: https://www.comp.nus.edu.sg/~vwo/
        image: /img/logo-CVWO.png
        heading: CVWO
        subheading: Project Lead & Developer
        contents:
          - content: >-
              May. 2020 – Aug. 2020


              &nbsp;


              Computing for Voluntary Welfare Organisations is a student club that develops IT systems for VWOs. In Sumer 2020, I led a team of 8 developers to work on 2 projects, SACNL and Sparks.
          - content: For SACNL, we converted the existing Ruby on Rails app into an
              API  backend server and developed a new frontend in React & Redux.
              We further enhanced the application with backend pagination and
              caching, and dockerized for better ops reliability.
          - content: For Sparks, we implemented new features such as cohort registration,
              CSV imports/exports and PDF reports to meet our client's changing
              requirements. Substantial effort was made as well to improve the
              user experience.
          - content: It was a hectic but productive Summer and I am very thankful to have a
              strong and dedicated team. Project management is new to me and
              this was an awesome learning opportunity.
          - content: >-
              May. 2019 – Aug. 2019


              &nbsp;


              In Summer 2019, I helped to develop a workflow management system for [ASEAN University Network Quality Assurance](http://www.aun-qa.org/), an organisation that evaluates and accredits university degrees
          - content: It was my first taste of full-stack development, DevOps, and Ops, and
              it definitely didn't disappoint! In my humble opinion, it is the
              best internship to have for any Computer Science freshman.
          - content: |-
              If you're still here, here's a cookie

              &nbsp;

              # 🍪
      - name: CSI
        link: csi.nus.edu.sg/web/
        image: /img/logo-CSI.png
        heading: Cancer Science Institute
        subheading: Data Engineer
        contents:
          - content: >-
              Jan. 2019 – May. 2019


              &nbsp;


              I interned under PittLab, a Genomics department in the Cancer Science Institute, and developed several command-line tools to automate workflows and processes.
          - content: I had the opportunity to work with [NSCC](https://www.nscc.sg/)
              supercomputers to parse and extract meaningful results from
              terabytes of raw genomic data. These results were used to evaluate
              [algorithms for identifying
              cancer](https://www.melbournebioinformatics.org.au/tutorials/tutorials/variant_calling_galaxy_1/variant_calling_galaxy_1/)
              based on cost, speed and accuracy.
          - content: I mainly wrote scripts in `sh`, Python and Java for automating
              workflows. These include job submissions with `qsub`, downloading
              genomic data  in parallel from the [TCGA
              database](https://www.cancer.gov/about-nci/organization/ccg/research/structural-genomics/tcga),
              and generating statistics using pandas.
          - content: It was a meaningful experience as it was my first time working on a
              project with real impact. Genomics is an interesting field at the
              crossroads of computing and biology, but at the same time very
              challenging since it requires expertise in both fields.
  - type: project
    heading: Project Experience
    description: ""
    cards:
      - name: TEAMMATES
        link: https://teammatesv4.appspot.com/
        image: /img/logo-TEAMMATES.png
        heading: TEAMMATES
        subheading: Senior Developer
        contents:
          - content: >-
              Jan. 2020 – Present


              &nbsp;


              TEAMMATES is a free open source online peer evaluation system used by more than 500,000 users from hundreds of educational institutions. Its uses **AngularJS** - **Java** - **Google App Engine** as its stack.
          - content: I started on TEAMMATES when I was taking
              [CS3281](https://nusmods.com/modules/CS3281/thematic-systems-project-i).
              I refactored the frontend to improve code quality, testing and
              maintainability, such as developing a Gradle task to standardise
              enums and endpoints between the TypeScript frontend and Java
              backend.
          - content: I am currently a senior developer and also an area lead for DevOps.
        socials:
          - name: GitHub
            logo: github
            link: https://github.com/TEAMMATES/teammates
      - name: Netlify-CMS
        link: https://www.netlifycms.org/
        image: /img/logo-Netlify.png
        heading: Netlify CMS
        subheading: Contributor
        contents:
          - content: >-
              Jan. 2020 – Jun. 2020


              &nbsp;


              Netlify CMS is a [headless content management system (CMS)](https://www.storyblok.com/tp/headless-cms-explained) that uses Git as a database, which I think is really cool. It also happens to be the backend for this website.
          - content: Essentially, it stores data as readable Markdown in the project's git
              repo and provides a nice interface for editing site content
              directly. Using it together with
              [Netlify](https://www.netlify.com/) completes the
              [JAMStack](https://www.netlify.com/jamstack/), a completely
              serverless architecture with zero infrastructure maintainence.
          - content: The Netlify CMS stack consists of **React** - **Redux**
              -**TypeScript**. My main contributions include refactoring the
              codebase to include support for multiple languages, and improving
              on user documentation.
        socials:
          - name: GitHub
            logo: github
            link: https://github.com/netlify/netlify-cms
      - name: Sparks
        link: https://www.comp.nus.edu.sg/~vwo/projects/2020-sparks.html
        image: /img/logo-Sparks.png
        heading: Sparks
        subheading: Project Lead
        contents:
          - content: >-
              May. 2020 – Aug. 2020


              &nbsp;


              Sparks is a [progressive web application](https://www.smashingmagazine.com/2016/08/a-beginners-guide-to-progressive-web-apps/) developed by CVWO for the [GIC Sparks & Smiles program](https://www.gic.com.sg/communities/gic-sparks-and-smiles/). It uses **React Redux**  and **Ruby on Rails** as its stack.
          - content: I took over the project in Summer 2020 from the first batch of
              developers. The system was well-designed but it had not yet
              captured the full workflow of the program. Our team implemented
              features such as batch registration, CSV imports and PDF reports
      - name: SACNL
        link: https://www.comp.nus.edu.sg/~vwo/projects/2020-sacnl.html
        image: /img/logo-SAC-NL.png
        heading: SAC-NL
        subheading: Project Lead & Developer
        contents:
          - content: >-
              May. 2019 – Aug. 2020


              &nbsp;


              SAC-NL is a web portal to help [Senior Activities Centres (SACs)](https://www.healthhub.sg/a-z/medical-and-care-facilities/8/senior_activity_centre) manage their centres. It is currently used by 12 centres (and counting) to manage data for thousands of elderly and volunteers.
          - content: The application has been around since 2007 and was in dire need of an
              upgrade. In Summer 2020, we converted the existing **Ruby on
              Rails** application into an API server and developed a new **React
              Redux** frontend over it.
      - name: AUNQA
        link: https://www.comp.nus.edu.sg/~vwo/projects/2019-aunqa-nlsac.html
        image: /img/logo-AUN-QA.png
        heading: AUN-QA
        subheading: Developer
        contents:
          - content: >-
              May. 2019 – Aug. 2019


              &nbsp;


              [ASEAN University Network Quality Assurance (AUN-QA)](http://www.aun-qa.org/) is a regional body that evaluates and accredits university degrees from its 30 ASEAN member universities.
          - content: Their workflow was previously done entirely via email, which over time
              became a pain to manage. In Summer 2019, my team developed AUN-QA
              from scratch in **React Redux** and **Ruby on Rails**.
          - content: Some of the things I worked on include wireframing, UI/UX, [RBAC
              (role-based access
              control)](https://en.wikipedia.org/wiki/Role-based_access_control),
              audit logs, deploying the application, setting up SSL, automating
              backups to S3 and Google Analytics.
          - content: " It was my first time working on a full-stack application and I learnt
              a tonne of new stuff. Not many internships will allow an intern to
              touch every part of the stack, so I was really fortunate."
      - name: SMUSMIF
        link: https://smusmif.com/
        image: /img/logo-SMU-SMIF.png
        heading: SMU SMIF
        subheading: Project Lead
        contents:
          - content: >-
              Jul. 2019 – Present


              &nbsp;


              [Singapore Manangement University Student Managed Investment Fund](https://www.smusmif.com/) is a virtual investment fund professionally managed by undergraduates at [SMU](https://en.wikipedia.org/wiki/Singapore_Management_University).
          - content: My brother was the president of the fund at the time and needed an
              organisational website to showcase their members in a short
              timeframe. Fresh out of CVWO, I decided to help him develop the
              website from scratch in **React**.
          - content: The features of this website include a [timeline of past
              achievements](https://www.smusmif.com/achievements) and an [alumni
              biography page](https://www.smusmif.com/team). Developing this
              website also inspired me to build my own landing page, which uses
              some of the features from there.
        socials:
          - name: GitHub
            logo: github
            link: https://github.com/tiuweehan/SMU-SMIF
  - type: certification
    heading: Certifications
    description: ""
    cards:
      - name: AWS-CPC
        link: https://aws.amazon.com/certification/certified-cloud-practitioner/
        image: /img/logo-AWS.png
        heading: Certified Cloud Practitioner
        subheading: Amazon Web Services
        contents:
          - content: >-
              Aug. 2020 – Aug. 2023


              &nbsp;


              Took this certification during my internship with AWS, and caught a glimpse into the behemoth that AWS is. One down, more to come!
      - name: GCP-ACE
        link: https://cloud.google.com/certification/guides/cloud-engineer
        image: /img/logo-Google-Cloud.png
        heading: Associate Cloud Engineer
        subheading: Google Cloud Platform
        contents:
          - content: >-
              Aug. 2020 – Aug. 2022


              &nbsp;


              I took the ACE certification as part of the 12-weeks long  Google Cloud Student Sprint program. I learnt about the various GCP services and methodologies for building secure and scalable cloud services.
          - content: I completed the program with a team of students and it was an awesome
              experience. Really grateful to my mentor and team mates for their
              help and support!
  - type: other
    heading: Other Experience
    description: ""
    cards:
      - name: NUS-TA
        link: https://en.wikipedia.org/wiki/National_University_of_Singapore
        image: /img/logo-NUS.png
        heading: Teaching Assistant
        subheading: National University of Singapore
        contents:
          - content: |-
              Aug. 2019 – May. 2020

              &nbsp;

              Taught the following modules:

              &nbsp;

              [CS1101S](https://nusmods.com/modules/CS1101S) (Fall '19)

              [CS2040S](https://nusmods.com/modules/CS2040S) (Spring '20)
          - content: >-
              Jan. 2020 – May. 2020


              &nbsp;


              I was one of three head teaching assistants for [CS2040S](https://nusmods.com/modules/CS2040S) Data Structures and Algorithms in Spring 2020.
          - content: My responsibilities include teaching a class of 12 students,
              coordinating a group of 13 teaching assistants, creating problem
              sets and grading assignments.
          - content: >-
              Aug. 2019 – Dec. 2019


              &nbsp;


              I was a teaching assistant for [CS1101S](https://nusmods.com/modules/CS1101S)[](https://nusmods.com/modules/CS2040S) Programming Methodology in Fall 2019 to a class of 8 students.
      - name: CVWO
        link: https://www.comp.nus.edu.sg/~vwo/
        image: /img/logo-CVWO.png
        heading: President
        subheading: CVWO
        contents:
          - content: >-
              Sep. 2019 – Sep. 2020


              &nbsp;


              Computing for Voluntary Welfare Organisations is a student club that develops IT systems for VWOs. I was president of the club for AY 2019/20.
          - content: My responsibilities include liaising with clients, managing daily
              operations, and recruitment & publicity efforts.
      - name: NUSHackers
        link: https://www.nushackers.org/
        image: /img/logo-NUS-Hackers.png
        heading: Coreteam Member
        subheading: NUS Hackers
        contents:
          - content: >-
              Dec. 2018 – Present


              &nbsp;


              NUS Hackers is a student-run organisation committed to the spread of hacker culture and free, open source software.
          - content: I joined in Dec. 2018 and have organized events such as [Friday
              Hacks](https://www.nushackers.org/fridayhacks) (a weekly tech
              meetup) and [Hack & Roll](https://hacknroll.nushackers.org/) (the
              largest student-run hackathon in Singapore).
---
