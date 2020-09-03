import { AppEnv } from "../../components/providers/AppConfigProvider"
import { IndexPageTemplate } from "../../templates/index-page"
import PropTypes from "prop-types"
import Provider from "../../components/providers/Provider"
import React from "react"

const IndexPagePreview: React.FC<any> = ({ entry, widgetFor, location }) => {
    const data = entry.getIn(["data"]).toJS()

    if (data) {
        return (
            <Provider location={location} config={{ env: AppEnv.NETLIFY_CMS }}>
                <IndexPageTemplate
                    title={data.title}
                    heading={data.heading}
                    connections={data.connections || {}}
                    resume={data.resume}
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
