import { DiscussionEmbed } from "disqus-react"
import { IPageProps } from "../../types/location-types"
import { Link, graphql } from "gatsby"
import { kebabCase } from "lodash"
import { useLocation } from "../components/providers/LocationProvider"
import Content, { HTMLContent } from "../components/Content"
import Helmet from "react-helmet"
import Layout from "../components/Layout"
import React from "react"

interface BlogPostTemplateProps {
    uuid?: string
    content?: string | null
    contentComponent?: React.FC<any>
    description?: string | null
    tags?: (string | null)[] | null
    title?: string | null
    helmet?: React.ReactNode | null
}

export const BlogPostTemplate: React.FC<BlogPostTemplateProps> = ({
    uuid,
    content,
    contentComponent,
    description,
    tags,
    title,
    helmet,
}) => {
    const PostContent = contentComponent || Content
    const location = useLocation()

    const disqusConfig = {
        shortname: process.env.GATSBY_DISQUS_SHORTNAME || "",
        config: {
            url: location?.href,
            title: title || "",
            identifier: uuid || "",
        },
    }

    return (
        <section className="section">
            {helmet || ""}
            <div className="container content">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                            {title}
                        </h1>
                        <p>{description}</p>
                        <PostContent content={content} />
                        {tags && tags.length ? (
                            <div style={{ marginTop: `4rem` }}>
                                <h4>Tags</h4>
                                <ul className="taglist">
                                    {tags.map(
                                        (tag) =>
                                            tag && (
                                                <li key={`tag${tag}`}>
                                                    <Link
                                                        to={`/tags/${kebabCase(
                                                            tag
                                                        )}/`}
                                                    >
                                                        {tag}
                                                    </Link>
                                                </li>
                                            )
                                    )}
                                </ul>
                            </div>
                        ) : null}
                        <DiscussionEmbed {...disqusConfig} />
                    </div>
                </div>
            </div>
        </section>
    )
}

const BlogPost: React.FC<IPageProps & IMarkdownPageQuery> = ({
    location,
    data: {
        markdownRemark: { frontmatter, html },
    },
}) => {
    return (
        <Layout location={location}>
            <BlogPostTemplate
                uuid={frontmatter.uuid}
                content={html}
                contentComponent={HTMLContent}
                description={frontmatter.description}
                helmet={
                    <Helmet titleTemplate="%s | Blog">
                        <title>{`${frontmatter.title}`}</title>
                        <meta
                            name="description"
                            content={`${frontmatter.description}`}
                        />
                    </Helmet>
                }
                tags={frontmatter.tags}
                title={frontmatter.title}
            />
        </Layout>
    )
}

export default BlogPost

export const pageQuery = graphql`
    query BlogPostByID($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            html
            frontmatter {
                uuid
                date(formatString: "MMMM DD, YYYY")
                title
                description
                tags
            }
        }
    }
`
