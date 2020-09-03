interface IAllMarkdownPageQuery {
    data: {
        allMarkdownRemark: {
            site: {
                siteMetadata: {
                    title: string
                }
            }
            edges: IEdge
            totalCount: number
        }
    }
}

interface IMarkdownPageQuery {
    data: {
        markdownRemark: INode
    }
}

interface IEdge {
    node: INode
}

type INode = Partial<{
    html: string
    excerpt: string
    fields: Partial<{
        slug: string
    }>
    frontmatter: any
}>
