import "./index-page.css"
import { Link, graphql } from "gatsby"
import React from "react"

import BlogRoll from "../components/BlogRoll"
import Layout from "../components/Layout"

import { IPageProps } from "../../types/location-types"
import { renderImage } from "../utils/ImageUtils"
import Content, { HTMLContent } from "../components/Content"

interface IndexPageTemplateProps {
    title?: string
    heading?: string
    connections?: Array<{
        name: string
        logo: any | string
        link: string
    }>
    resume?: {
        publicURL: string
    }
    content?: string | null
    contentComponent?: React.FC<any>
}

export const IndexPageTemplate = ({
    title,
    heading,
    connections,
    resume,
    content,
    contentComponent,
}: IndexPageTemplateProps) => {
    const PageContent = contentComponent || Content

    return (
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
                        {connections?.map((connection) => (
                            <a
                                key={connection.name}
                                title={connection.name}
                                href={connection.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={renderImage(connection.logo)}
                                    alt={connection.name}
                                    style={{ width: "1em", height: "1em" }}
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <section
                className="section section--gradient"
                style={{
                    minHeight: "100vh",
                }}
            >
                <div className="container">
                    <div className="section">
                        <div className="columns">
                            <div className="column is-10 is-offset-1">
                                <div className="content">
                                    <div className="columns">
                                        <div className="column is-12 has-text-centered">
                                            <h3 className="has-text-weight-semibold is-size-2">
                                                {heading}
                                            </h3>
                                            <PageContent
                                                className="content"
                                                content={content}
                                            />
                                            <p>
                                                Find my resume{" "}
                                                <a
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    href={resume?.publicURL}
                                                >
                                                    here
                                                </a>
                                                .
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section section--gradient">
                <div className="container">
                    <div className="section">
                        <div className="columns">
                            <div className="column is-10 is-offset-1">
                                <div className="content">
                                    <div className="column is-12">
                                        <h3 className="has-text-weight-semibold is-size-2 has-text-centered">
                                            Blog Posts
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
}

interface IndexPageProps {
    data: {
        markdownRemark: any
    }
}

const IndexPage: React.FC<IPageProps & IndexPageProps> = ({
    location,
    data,
}) => {
    const { markdownRemark: post } = data
    return (
        <Layout location={location}>
            <IndexPageTemplate
                title={post.frontmatter.title}
                heading={post.frontmatter.heading}
                resume={post.frontmatter.resume}
                connections={post.frontmatter.connections}
                contentComponent={HTMLContent}
                content={post.html}
            />
        </Layout>
    )
}

export default IndexPage

export const pageQuery = graphql`
    query IndexPageTemplate {
        markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
            html
            frontmatter {
                title
                heading
                connections {
                    name
                    logo {
                        extension
                        publicURL
                    }
                    link
                }
                resume {
                    publicURL
                }
            }
        }
    }
`
