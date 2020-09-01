import "./ExperienceSection.css"
import { AppEnv, useAppConfig } from "./AppConfig"
import { ExperienceCardInfo } from "./ExperienceCard"
import ExperienceCards from "./ExperienceCards"
import React, { useLayoutEffect, useRef, useState } from "react"

export interface ExperienceSectionInfo {
    type: string
    heading: string
    description: string
    cards: Array<ExperienceCardInfo>
}

const topPos = (element: any) => element.getBoundingClientRect().top

const ExperienceSection: React.FC<{ experience: ExperienceSectionInfo }> = ({
    experience,
}) => {
    const [show, setShow] = useState<boolean>(false)
    const sectionRef = useRef(null)

    // Check if using Netlify CMS
    const config = useAppConfig()
    if (!show && config.env === AppEnv.NETLIFY_CMS) {
        setShow(true)
    }

    useLayoutEffect(() => {
        const onScroll = () => {
            const divTopPos = topPos(sectionRef.current)

            setShow(divTopPos > -50 && divTopPos < window.innerHeight)
        }
        onScroll()
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <section ref={sectionRef} className="section section--gradient">
            <div className="container has-text-centered">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <h2
                            className={`experience-header ${
                                show ? "experience-header-visible" : ""
                            } has-text-weight-normal is-size-3`}
                        >
                            {experience?.heading}
                        </h2>
                        <br />
                        <p className="is-size-5">{experience?.description}</p>
                        <ExperienceCards data={experience?.cards} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ExperienceSection
