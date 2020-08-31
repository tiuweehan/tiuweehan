import { ExperiencePageTemplate } from "../../templates/experience-page"
import PropTypes from "prop-types"
import React from "react"

const ExperiencePagePreview: React.FC<any> = ({ entry, getAsset }) => {
    const entryWorkExperiences = entry.getIn(["data", "work", "experiences"])
    const workExperiences = entryWorkExperiences
        ? entryWorkExperiences.toJS()
        : []

    return (
        <ExperiencePageTemplate
            image={entry.getIn(["data", "image"])}
            title={entry.getIn(["data", "title"])}
            work={{
                heading: entry.getIn(["data", "work", "heading"]),
                description: entry.getIn(["data", "work", "description"]),
                experiences: workExperiences,
            }}
        />
    )
}

ExperiencePagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    getAsset: PropTypes.func,
}

export default ExperiencePagePreview
