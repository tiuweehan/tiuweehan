import * as d3 from "d3"
import { graphql, useStaticQuery } from "gatsby"
import React, { useEffect, useRef } from "react"

interface ProfileType {
    id: string
    parentId: string
    name: string
    simplifiedChineseName: string
}

interface NodeType {
    id: string
    fields: {
        slug: string
    }
    frontmatter: ProfileType
}

interface DataType {
    allMarkdownRemark: {
        edges: Array<{
            node: NodeType
        }>
    }
}

const query = graphql`
    query BiographyPagesQuery {
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "biography-page" } } }
        ) {
            edges {
                node {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        id
                        parentId
                        name
                        simplifiedChineseName
                    }
                }
            }
        }
    }
`

const FamilyTree: React.FC = () => {
    const data = useStaticQuery<DataType>(query)

    const { edges: profiles } = data.allMarkdownRemark

    const ref = useRef<SVGSVGElement | null>(null)

    useEffect(() => {
        d3.select(ref.current)
            .append("circle")
            .attr("cx", 150)
            .attr("cy", 70)
            .attr("r", 50)
    }, [])

    return (
        <div>
            <svg ref={ref} />
            {profiles.map(({ node: profile }) => (
                <div key={profile.id}>
                    {profile.frontmatter.simplifiedChineseName}
                </div>
            ))}
        </div>
    )
}

export default FamilyTree
