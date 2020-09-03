import { AboutPageTemplate } from "../../templates/about-page"
import { AppEnv } from "../../components/providers/AppConfigProvider"
import PropTypes from "prop-types"
import Provider from "../../components/providers/Provider"
import React from "react"

const AboutPagePreview: React.FC<any> = ({ entry, widgetFor, location }) => (
    <Provider location={location} config={{ env: AppEnv.NETLIFY_CMS }}>
        <AboutPageTemplate
            title={entry.getIn(["data", "title"])}
            content={widgetFor("body")}
        />
    </Provider>
)

AboutPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    widgetFor: PropTypes.func,
}

export default AboutPagePreview
