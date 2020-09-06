import "./BlogPostContent.sass"
import React from "react"

interface ContentPropType {
    content: any
    className?: string
}

export const BlogPostContent = ({ content, className }: ContentPropType) => (
    <div
        className={`blog-post-content ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
    />
)
