import { AppEnv } from "../../components/providers/AppConfigProvider"
import { BlogPostTemplate } from "../../templates/blog-post"
import PropTypes from "prop-types"
import Provider from "../../components/providers/Provider"
import React from "react"

const BlogPostPreview: React.FC<any> = ({ entry, widgetFor, location }) => (
    <Provider location={location} config={{ env: AppEnv.NETLIFY_CMS }}>
        <BlogPostTemplate
            content={widgetFor("body")}
            description={entry.getIn(["data", "description"])}
            tags={entry.getIn(["data", "tags"])}
            title={entry.getIn(["data", "title"])}
        />
    </Provider>
)

BlogPostPreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    widgetFor: PropTypes.func,
}

export default BlogPostPreview
