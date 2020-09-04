import "../themes/monokai.css"
import Prism from "prismjs"
import React, { useEffect } from "react"

import "prismjs/components/prism-bash.min"
import "prismjs/components/prism-c.min"
import "prismjs/components/prism-cpp.min"
import "prismjs/components/prism-css.min"
import "prismjs/components/prism-docker.min"
import "prismjs/components/prism-git.min"
import "prismjs/components/prism-go.min"
import "prismjs/components/prism-http.min"
import "prismjs/components/prism-java.min"
import "prismjs/components/prism-java.min"
import "prismjs/components/prism-javascript.min"
import "prismjs/components/prism-json.min"
import "prismjs/components/prism-jsx.min"
import "prismjs/components/prism-latex.min"
import "prismjs/components/prism-makefile.min"
import "prismjs/components/prism-markdown.min"
import "prismjs/components/prism-markup.min"
import "prismjs/components/prism-nginx.min"
import "prismjs/components/prism-python.min"
import "prismjs/components/prism-ruby.min"
import "prismjs/components/prism-rust.min"
import "prismjs/components/prism-sass.min"
import "prismjs/components/prism-scss.min"
import "prismjs/components/prism-sql.min"
import "prismjs/components/prism-typescript.min"
import "prismjs/components/prism-vim.min"
import "prismjs/components/prism-wasm.min"
import "prismjs/components/prism-xml-doc.min"
import "prismjs/components/prism-yaml.min"

interface ContentPropType {
    content: any
    className?: string
}

export const PrismHTMLContent: React.FC<ContentPropType> = ({
    content,
    className,
}) => {
    useEffect(() => {
        Prism.highlightAll()
    }, [])

    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    )
}
