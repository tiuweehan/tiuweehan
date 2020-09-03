import "./experience-page.scss"
import { IPageProps } from "../../types/location-types"
import { graphql } from "gatsby"
import ExperienceSection, {
    ExperienceSectionInfo,
} from "../components/ExperienceSection"
import Layout from "../components/Layout"
import React from "react"
import _ from "lodash"

type ExperiencePageTemplateProps = Partial<{
    image: any | string
    title: string
    experiences: Array<ExperienceSectionInfo>
}>

export const ExperiencePageTemplate: React.FC<ExperiencePageTemplateProps> = ({
    image,
    title,
    experiences,
}) => (
    <div className="content">
        <div className="full-width-image-container margin-top-0">
            <div className="shooting-star-container">
                <div className="night">
                    {_.times(15, _.constant(null)).map((__, j) => (
                        <div
                            key={`shooting-star-1-${j}`}
                            className="shooting_star_1"
                        />
                    ))}
                </div>
                <div className="night">
                    {_.times(15, _.constant(null)).map((__, j) => (
                        <div
                            key={`shooting-star-2-${j}`}
                            className="shooting_star_2"
                        />
                    ))}
                </div>
            </div>
            <h2
                className="has-text-weight-bold is-size-1"
                style={{
                    backgroundColor: "transparent",
                    color: "white",
                    lineHeight: "1",
                    margin: 0,
                    padding: "1rem",
                    zIndex: 999,
                }}
            >
                <span
                    style={{
                        background: "-webkit-linear-gradient(white, #38495a)",
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
            </h2>
        </div>
        {experiences?.map((experience) => (
            <ExperienceSection key={experience.type} experience={experience} />
        ))}
    </div>
)

interface ProductPageProps {
    data: {
        markdownRemark: {
            frontmatter: ExperiencePageTemplateProps
        }
    }
}

const ExperiencePage: React.FC<IPageProps & IMarkdownPageQuery> = ({
    location,
    data: {
        markdownRemark: { frontmatter },
    },
}) => {
    return (
        <Layout location={location}>
            <ExperiencePageTemplate
                image={frontmatter.image}
                title={frontmatter.title}
                experiences={frontmatter.experiences}
            />
        </Layout>
    )
}

export default ExperiencePage

export const experiencePageQuery = graphql`
    query ExperiencePage($id: String!) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                title
                image {
                    childImageSharp {
                        fluid(maxWidth: 2048, quality: 100) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                    extension
                    publicURL
                }
                experiences {
                    type
                    heading
                    description
                    cards {
                        name
                        link
                        image {
                            childImageSharp {
                                fluid(maxWidth: 1000, quality: 100) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                            extension
                            publicURL
                        }
                        heading
                        subheading
                        contents {
                            content
                        }
                        socials {
                            name
                            logo
                            link
                        }
                    }
                }
            }
        }
    }
`
