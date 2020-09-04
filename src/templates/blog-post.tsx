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
    title?: string | null
    description?: string | null
    date?: string
    tags?: (string | null)[] | null
    content?: string | null
    contentComponent?: React.FC<any>
    helmet?: React.ReactNode | null
}

export const BlogPostTemplate: React.FC<BlogPostTemplateProps> = ({
    uuid,
    title,
    description,
    date,
    tags,
    content,
    contentComponent,
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
                        <div className="has-text-centered">
                            <h1
                                className="title"
                                style={{
                                    margin: 0,
                                    fontFamily:
                                        'medium-content-title-font, Georgia, Cambria, "Times New Roman", Times, serif',
                                    fontWeight: 400,
                                    fontSize: "40px",
                                }}
                            >
                                {title}
                            </h1>
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
                                {description}
                            </h2>
                            <p
                                style={{
                                    margin: "10px 0px 30px 0px",
                                    fontFamily:
                                        'medium-content-sans-serif-font, "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Arial, sans-serif',
                                    fontWeight: 300,
                                    fontSize: "13px",
                                    color: "rgba(117, 117, 117, 1)",
                                }}
                            >
                                {date}
                            </p>
                        </div>
                        <PostContent content={content} />
                        {tags && tags.length ? (
                            <div
                                className="has-text-centered"
                                style={{ marginTop: `4rem` }}
                            >
                                <h4>Tags</h4>
                                <ul
                                    style={{
                                        margin: 0,
                                        textAlign: "center",
                                        listStyleType: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {tags.map(
                                        (tag) =>
                                            tag && (
                                                <li
                                                    key={`tag${tag}`}
                                                    style={{ margin: 0 }}
                                                >
                                                    <Link
                                                        to={`/tags/${kebabCase(
                                                            tag
                                                        )}/`}
                                                        style={{
                                                            margin: "5px",
                                                            padding: "5px 10px",
                                                            borderRadius: "3px",
                                                            fontSize: "15px",
                                                            background:
                                                                "rgba(242, 242, 242, 1)",
                                                            color:
                                                                "rgba(117, 117, 117, 1)",
                                                        }}
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
                title={frontmatter.title}
                description={frontmatter.description}
                date={frontmatter.date}
                tags={frontmatter.tags}
                content={html}
                contentComponent={HTMLContent}
                helmet={
                    <Helmet titleTemplate="%s | Blog">
                        <title>{`${frontmatter.title}`}</title>
                        <meta
                            name="description"
                            content={`${frontmatter.description}`}
                        />
                    </Helmet>
                }
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
                title
                description
                date(formatString: "MMM DD, YYYY")
                tags
            }
        }
    }
`
