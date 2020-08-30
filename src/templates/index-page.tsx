import "./index-page.css"
import { Link, graphql } from "gatsby"
import React from "react"

import BlogRoll from "../components/BlogRoll"
import Features from "../components/Features"
import Layout from "../components/Layout"

import email from "../img/social/email.svg"
import facebook from "../img/social/facebook.svg"
import github from "../img/social/github.svg"
import linkedin from "../img/social/linkedin.svg"

interface IndexPageTemplateProps {
    image?: any | string
    title?: string
    heading?: string
    subheading?: string
    connections?: {
        github: string
        linkedin: string
        email: string
        facebook: string
    }
    mainpitch?: any
    description?: string
    intro?: {
        blurbs: any[]
    }
}

export const IndexPageTemplate = ({
    image,
    title,
    heading,
    subheading,
    connections,
    mainpitch,
    description,
    intro,
}: IndexPageTemplateProps) => (
    <div>
        <div style={{ position: "fixed", width: "100%", height: "98vh" }}>
            <div id="stars" />
            <div id="stars2" />
            <div id="stars3" />
        </div>
        <div
            className="full-width-image margin-top-0"
            style={{
                background: `radial-gradient(ellipse at bottom, #1b2735 0%, #000000 100%)`,
                backgroundPosition: `top left`,
                backgroundAttachment: `fixed`,
                height: "97vh",
            }}
        >
            <div
                style={{
                    marginTop: "-10%",
                    display: "flex",
                    height: "150px",
                    lineHeight: "1",
                    justifyContent: "space-around",
                    alignItems: "center",
                    flexDirection: "column",
                    textAlign: "center",
                    zIndex: 1, // Place div over stars
                }}
            >
                <h1
                    className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
                    style={{
                        backgroundColor: "transparent",
                        color: "white",
                        lineHeight: "1",
                        padding: "0.25em",
                        marginBottom: "10px",
                    }}
                >
                    <span
                        style={{
                            background:
                                "-webkit-linear-gradient(white, #38495a)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontFamily: "lato, sans-serif",
                            fontWeight: 500,
                            fontSize: "50px",
                            letterSpacing: "1px",
                        }}
                    >
                        {title}
                    </span>
                </h1>
                <div className="social" style={{ width: "300px" }}>
                    <a
                        title="GitHub"
                        href={connections?.github}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={github}
                            alt="GitHub"
                            style={{ width: "1em", height: "1em" }}
                        />
                    </a>
                    <a
                        title="LinkedIn"
                        href={connections?.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            className="fas fa-lg"
                            src={linkedin}
                            alt="LinkedIn"
                            style={{ width: "1em", height: "1em" }}
                        />
                    </a>
                    <a
                        title="Email"
                        href={`mailto:${connections?.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={email}
                            alt="Email"
                            style={{ width: "1em", height: "1em" }}
                        />
                    </a>
                    <a
                        title="Facebook"
                        href={connections?.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={facebook}
                            alt="Facebook"
                            style={{ width: "1em", height: "1em" }}
                        />
                    </a>
                </div>
            </div>
        </div>
        <section className="section section--gradient">
            <div className="container">
                <div className="section">
                    <div className="columns">
                        <div className="column is-10 is-offset-1">
                            <div className="content">
                                <div className="columns">
                                    <div className="column is-12">
                                        <h3 className="has-text-weight-semibold is-size-2">
                                            {heading}
                                        </h3>
                                        <p>{description}</p>
                                    </div>
                                </div>
                                <Features gridItems={intro?.blurbs} />
                                <div className="columns">
                                    <div className="column is-12 has-text-centered">
                                        <Link className="btn" to="/products">
                                            See all products
                                        </Link>
                                    </div>
                                </div>
                                <div className="column is-12">
                                    <h3 className="has-text-weight-semibold is-size-2">
                                        Latest stories
                                    </h3>
                                    <BlogRoll />
                                    <div className="column is-12 has-text-centered">
                                        <Link className="btn" to="/blog">
                                            Read more
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
)

interface IndexPageProps {
    data: {
        markdownRemark: {
            frontmatter: IndexPageTemplateProps
        }
    }
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
    const { markdownRemark: post } = data
    return (
        <Layout>
            <IndexPageTemplate
                image={post.frontmatter.image}
                title={post.frontmatter.title}
                heading={post.frontmatter.heading}
                subheading={post.frontmatter.subheading}
                connections={post.frontmatter.connections}
                mainpitch={post.frontmatter.mainpitch}
                description={post.frontmatter.description}
                intro={post.frontmatter.intro}
            />
        </Layout>
    )
}

export default IndexPage

export const pageQuery = graphql`
    query IndexPageTemplate {
        markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
            frontmatter {
                title
                image {
                    childImageSharp {
                        fluid(maxWidth: 2048, quality: 100) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                heading
                subheading
                connections {
                    github
                    linkedin
                    email
                    facebook
                }
                mainpitch {
                    title
                    description
                }
                description
                intro {
                    blurbs {
                        image {
                            childImageSharp {
                                fluid(maxWidth: 240, quality: 64) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        text
                    }
                    heading
                    description
                }
            }
        }
    }
`
