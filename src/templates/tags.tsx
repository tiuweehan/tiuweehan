import { IPageProps } from "../../types/location-types"
import { Link, graphql } from "gatsby"
import Helmet from "react-helmet"
import Layout from "../components/Layout"
import React from "react"

interface TagRouteProps {
    data: {
        site: {
            siteMetadata: {
                title: string
            }
        }
        allMarkdownRemark: {
            totalCount: number
            edges: Array<{
                node: {
                    fields: {
                        slug: string
                    }
                    frontmatter: {
                        title: string
                    }
                }
            }>
        }
    }
    pageContext: {
        tag: string
    }
}

const TagRoute: React.FC<IPageProps & TagRouteProps> = (props) => {
    const posts = props.data.allMarkdownRemark.edges
    const postLinks = posts.map((post) => (
        <li
            key={post.node.fields.slug}
            style={{
                width: "50%",
                padding: "20px 10px",
                borderRadius: "10px",
                background: "rgba(242, 242, 242, 1)",
                color: "rgba(117, 117, 117, 1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Link to={post.node.fields.slug}>
                <h2
                    className="is-size-2"
                    style={{
                        margin: 0,
                    }}
                >
                    {post.node.frontmatter.title}
                </h2>
            </Link>
        </li>
    ))
    const tag = props.pageContext.tag
    const title = props.data.site.siteMetadata.title
    const totalCount = props.data.allMarkdownRemark.totalCount
    const tagHeader = `${totalCount} post${
        totalCount === 1 ? "" : "s"
    } tagged with “${tag}”`

    return (
        <Layout location={props.location}>
            <section className="section" style={{ minHeight: "63vh" }}>
                <Helmet title={`${tag} | ${title}`} />
                <div className="container content">
                    <div className="columns">
                        <div
                            className="column is-10 is-offset-1"
                            style={{ marginBottom: "6rem" }}
                        >
                            <h2
                                style={{
                                    margin: "10px 0px 0px 0px",
                                    fontFamily:
                                        'medium-content-sans-serif-font, "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Arial, sans-serif',
                                    fontWeight: 300,
                                    fontSize: "24px",
                                    letterSpacing: 0,
                                    color: "rgba(117, 117, 117, 1)",
                                }}
                            >
                                {tagHeader}
                            </h2>
                            <ul className="taglist">{postLinks}</ul>
                            <p>
                                <Link to="/tags/">Browse all tags</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default TagRoute

export const tagPageQuery = graphql`
    query TagPage($tag: String) {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            limit: 1000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: [$tag] } } }
        ) {
            totalCount
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    }
`
