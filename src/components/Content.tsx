import React from "react"

interface ContentPropType {
    content: any
    className?: string
}

export const HTMLContent = ({ content, className }: ContentPropType) => (
    // @ts-ignore
    <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
)

const Content = ({ content, className }: ContentPropType) => (
    <div className={className}>{content}</div>
)

export default Content
