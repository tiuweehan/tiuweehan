import { AppEnv } from "../../components/AppConfig"
import { IndexPageTemplate } from "../../templates/index-page"
import PropTypes from "prop-types"
import Provider from "../../components/Provider"
import React from "react"

const IndexPagePreview: React.FC<any> = ({ entry, widgetFor }) => {
    const data = entry.getIn(["data"]).toJS()

    if (data) {
        return (
            <Provider config={{ env: AppEnv.NETLIFY_CMS }}>
                <IndexPageTemplate
                    title={data.title}
                    connections={data.connections || {}}
                    heading={data.heading}
                    content={widgetFor("body")}
                />
            </Provider>
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
