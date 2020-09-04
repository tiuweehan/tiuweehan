import { IPageProps } from "../../../types/location-types"
import { Link, graphql } from "gatsby"
import { kebabCase } from "lodash"
import Helmet from "react-helmet"
import Layout from "../../components/Layout"
import React from "react"

interface PropType {
    data: {
        allMarkdownRemark: { group: any[] }
        site: {
            siteMetadata: { title: string }
        }
    }
}

const TagsPage: React.FC<IPageProps & PropType> = ({
    location,
    data: {
        allMarkdownRemark: { group },
        site: {
            siteMetadata: { title },
        },
    },
}) => (
    <Layout location={location}>
        <section className="section" style={{ minHeight: "63vh" }}>
            <Helmet title={`Tags | ${title}`} />
            <div className="container content">
                <div className="columns">
                    <div
                        className="column is-10 is-offset-1"
                        style={{ marginBottom: "6rem" }}
                    >
                        <h1 className="title is-size-2 is-bold-light">Tags</h1>
                        <ul className="taglist">
                            {group.map((tag) => (
                                <li key={tag.fieldValue}>
                                    <Link
                                        to={`/tags/${kebabCase(
                                            tag.fieldValue
                                        )}/`}
                                    >
                                        <div
                                            style={{
                                                margin: "5px",
                                                padding: "5px 10px",
                                                borderRadius: "3px",
                                                fontSize: "15px",
                                                background:
                                                    "rgba(242, 242, 242, 1)",
                                                color: "rgba(117, 117, 117, 1)",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div>{tag.fieldValue}</div>
                                            <div
                                                style={{
                                                    backgroundColor: "#f05f70",
                                                    height: "15px",
                                                    width: "15px",
                                                    borderRadius: "7px",
                                                    color: "white",
                                                    textAlign: "center",
                                                    lineHeight: 1.5,
                                                    fontSize: "10px",
                                                    fontWeight: 600,
                                                    marginLeft: "5px",
                                                }}
                                            >
                                                {tag.totalCount}
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
)

export default TagsPage

export const tagPageQuery = graphql`
    query TagsQuery {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(limit: 1000) {
            group(field: frontmatter___tags) {
                fieldValue
                totalCount
            }
        }
    }
`
