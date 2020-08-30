import "./index-page.css"
import { Link, graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { IndexPageTemplateQuery } from "types/graphql-types"
import BlogRoll from "../components/BlogRoll"
import Features from "../components/Features"
import Layout from "../components/Layout"

type IndexPageTemplateProps = RecursiveNonNullable<
    IndexPageTemplateQuery
>["markdownRemark"]["frontmatter"]

export const IndexPageTemplate = ({
    image,
    title,
    heading,
    subheading,
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
                background: `radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)`,
                backgroundPosition: `top left`,
                backgroundAttachment: `fixed`,
                height: "98vh",
            }}
        >
            <div
                style={{
                    display: "flex",
                    height: "150px",
                    lineHeight: "1",
                    justifyContent: "space-around",
                    alignItems: "left",
                    flexDirection: "column",
                }}
            >
                <h1
                    className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
                    style={{
                        boxShadow:
                            "rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px",
                        backgroundColor: "rgb(255, 68, 0)",
                        color: "white",
                        lineHeight: "1",
                        padding: "0.25em",
                    }}
                >
                    {title}
                </h1>
                <h3
                    className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
                    style={{
                        boxShadow:
                            "rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px",
                        backgroundColor: "rgb(255, 68, 0)",
                        color: "white",
                        lineHeight: "1",
                        padding: "0.25em",
                    }}
                >
                    {subheading}
                </h3>
            </div>
        </div>
        <section className="section section--gradient">
            <div className="container">
                <div className="section">
                    <div className="columns">
                        <div className="column is-10 is-offset-1">
                            <div className="content">
                                <div className="content">
                                    <div className="tile">
                                        <h1 className="title">
                                            {mainpitch.title}
                                        </h1>
                                    </div>
                                    <div className="tile">
                                        <h3 className="subtitle">
                                            {mainpitch.description}
                                        </h3>
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="column is-12">
                                        <h3 className="has-text-weight-semibold is-size-2">
                                            {heading}
                                        </h3>
                                        <p>{description}</p>
                                    </div>
                                </div>
                                <Features gridItems={intro.blurbs} />
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

IndexPageTemplate.propTypes = {
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    title: PropTypes.string,
    heading: PropTypes.string,
    subheading: PropTypes.string,
    mainpitch: PropTypes.object,
    description: PropTypes.string,
    intro: PropTypes.shape({
        blurbs: PropTypes.array,
    }),
}

const IndexPage = ({
    data,
}: {
    data: RecursiveNonNullable<IndexPageTemplateQuery>
}) => {
    const { markdownRemark: post } = data
    return (
        <Layout>
            <IndexPageTemplate
                image={post?.frontmatter?.image}
                title={post?.frontmatter?.title}
                heading={post?.frontmatter?.heading}
                subheading={post?.frontmatter?.subheading}
                mainpitch={post?.frontmatter?.mainpitch}
                description={post?.frontmatter?.description}
                intro={post?.frontmatter?.intro}
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
