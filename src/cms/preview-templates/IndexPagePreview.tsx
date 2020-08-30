import { IndexPageTemplate } from "../../templates/index-page"
import PropTypes from "prop-types"
import React from "react"

const IndexPagePreview: React.FC<any> = ({ entry, widgetFor }) => {
    const data = entry.getIn(["data"]).toJS()

    if (data) {
        return (
            <IndexPageTemplate
                title={data.title}
                connections={data.connections || {}}
                heading={data.heading}
                content={widgetFor("body")}
            />
        )
    } else {
        return <div>Loading...</div>
    }
}

IndexPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    widgetFor: PropTypes.func,
}

export default IndexPagePreview
