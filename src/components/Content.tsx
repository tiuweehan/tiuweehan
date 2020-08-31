import React from "react"
import html from "rehype-stringify"
import markdown from "remark-parse"
import remark2rehype from "remark-rehype"
import unified from "unified"

interface ContentPropType {
    content: any
    className?: string
}

export const HTMLContent = ({ content, className }: ContentPropType) => (
    <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
)

export const MarkdownContent = ({ content, className }: ContentPropType) => {
    const processor = unified().use(markdown).use(remark2rehype).use(html)

    const htmlContent = processor.processSync(content).toString()

    return HTMLContent({
        content: htmlContent,
        className: className,
    })
}

const Content = ({ content, className }: ContentPropType) => (
    <div className={className}>{content}</div>
)

export default Content
