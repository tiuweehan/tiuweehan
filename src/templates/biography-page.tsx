import { BlogPostContent } from "../components/BlogPostContent"
import { IPageProps } from "../../types/location-types"
import { graphql } from "gatsby"
import Content from "../components/Content"
import Helmet from "react-helmet"
import Layout from "../components/Layout"
import React from "react"

interface BiographyPageTemplateProps {
    id?: string
    parentId?: string | null
    name?: string
    simplifiedChineseName?: string
    content?: string | null
    contentComponent?: React.FC<any>
    helmet?: React.ReactNode | null
}

export const BlogPostTemplate: React.FC<BiographyPageTemplateProps> = ({
    id,
    parentId,
    name,
    simplifiedChineseName,
    content,
    contentComponent,
    helmet,
}) => {
    const PostContent = contentComponent || Content

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
                                {name}
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
                                {simplifiedChineseName}
                            </h2>
                        </div>
                        <PostContent content={content} />
                    </div>
                </div>
            </div>
        </section>
    )
}

const BiographyPage: React.FC<IPageProps & IMarkdownPageQuery> = ({
    location,
    data: {
        markdownRemark: { frontmatter, html },
    },
}) => {
    return (
        <Layout location={location}>
            <BlogPostTemplate
                id={frontmatter.id}
                parentId={frontmatter.parentId}
                name={frontmatter.name}
                simplifiedChineseName={frontmatter.simplifiedChineseName}
                content={html}
                contentComponent={BlogPostContent}
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

export default BiographyPage

export const pageQuery = graphql`
    query BiographyPageByID($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            html
            frontmatter {
                id
                parentId
                name
                simplifiedChineseName
            }
        }
    }
`
