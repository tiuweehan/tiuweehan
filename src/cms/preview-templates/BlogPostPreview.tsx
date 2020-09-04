import { AppEnv } from "../../components/providers/AppConfigProvider"
import { BlogPostTemplate } from "../../templates/blog-post"
import PropTypes from "prop-types"
import Provider from "../../components/providers/Provider"
import React from "react"
import moment from "moment"

const BlogPostPreview: React.FC<any> = ({ entry, widgetFor, location }) => (
    <Provider location={location} config={{ env: AppEnv.NETLIFY_CMS }}>
        <BlogPostTemplate
            title={entry.getIn(["data", "title"])}
            description={entry.getIn(["data", "description"])}
            date={moment(entry.getIn(["data", "date"])).format("MMM DD, YYYY")}
            content={widgetFor("body")}
            tags={entry.getIn(["data", "tags"])}
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
