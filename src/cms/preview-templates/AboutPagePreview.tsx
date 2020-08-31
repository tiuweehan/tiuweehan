import { AboutPageTemplate } from "../../templates/about-page"
import { AppEnv } from "../../components/AppConfig"
import PropTypes from "prop-types"
import Provider from "../../components/Provider"
import React from "react"

const AboutPagePreview: React.FC<any> = ({ entry, widgetFor }) => (
    <Provider config={{ env: AppEnv.NETLIFY_CMS }}>
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
