import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Pricing from "../components/Pricing"
import React from "react"

type ExperiencePageTemplateProps = Partial<{
    image: any | string
    title: string
    work: {
        heading: string
        description: string
        experiences: Array<{
            image: any | string
            heading: string
            subheading: string
            contents: string[]
        }>
    }
}>

export const ExperiencePageTemplate: React.FC<ExperiencePageTemplateProps> = ({
    image,
    title,
    work,
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
        <section className="section section--gradient">
            <div className="container">
                <div className="section">
                    <div className="columns">
                        <div className="column is-10 is-offset-1">
                            <h2 className="has-text-weight-semibold is-size-2">
                                {work?.heading}
                            </h2>
                            <p className="is-size-5">{work?.description}</p>
                            <Pricing data={work?.experiences} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
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
                work={frontmatter.work}
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
                }
                work {
                    heading
                    description
                    experiences {
                        image {
                            childImageSharp {
                                fluid(maxWidth: 1000, quality: 100) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        heading
                        subheading
                        contents
                    }
                }
            }
        }
    }
`
