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
        <section className="section">
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
                                        {tag.fieldValue} ({tag.totalCount})
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
