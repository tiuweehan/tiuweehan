import { graphql } from "gatsby"
import ExperienceSection, {
    ExperienceSectionInfo,
} from "../components/ExperienceSection"
import Layout from "../components/Layout"
import React from "react"

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
        <div
            className="full-width-image-container margin-top-0"
            style={{
                backgroundImage: `url(${
                    image.childImageSharp
                        ? image.childImageSharp.fluid.src
                        : image
                })`,
            }}
        >
            <h2
                className="has-text-weight-bold is-size-1"
                style={{
                    boxShadow: "0.5rem 0 0 #f40, -0.5rem 0 0 #f40",
                    backgroundColor: "#f40",
                    color: "white",
                    padding: "1rem",
                }}
            >
                {title}
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

const ExperiencePage: React.FC<ProductPageProps> = ({ data }) => {
    const { frontmatter } = data.markdownRemark

    return (
        <Layout>
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
