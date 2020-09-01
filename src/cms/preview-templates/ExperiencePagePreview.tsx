import { AppEnv } from "../../components/AppConfig"
import { ExperiencePageTemplate } from "../../templates/experience-page"
import PropTypes from "prop-types"
import Provider from "../../components/Provider"
import React from "react"

const ExperiencePagePreview: React.FC<any> = ({ entry, getAsset }) => {
    return (
        <Provider config={{ env: AppEnv.NETLIFY_CMS }}>
            <ExperiencePageTemplate
                image={entry.getIn(["data", "image"])}
                title={entry.getIn(["data", "title"])}
                experiences={entry.getIn(["data", "experiences"]).toJS()}
            />
        </Provider>
    )
}

ExperiencePagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    getAsset: PropTypes.func,
}

export default ExperiencePagePreview
