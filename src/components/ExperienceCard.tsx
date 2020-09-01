import "./ExperienceCard.css"
import { AppEnv, useAppConfig } from "./AppConfig"
import { renderImage } from "../utils/ImageUtils"
import React, { useLayoutEffect, useRef, useState } from "react"
import SwiperCard from "./SwiperCard"

export interface ExperienceCardInfo {
    image: any | string
    heading: string
    subheading: string
    contents: Array<{
        content: string
    }>
}

const topPos = (element: any) => element.getBoundingClientRect().top

const ExperienceCard: React.FC<ExperienceCardInfo> = ({
    image,
    heading,
    subheading,
    contents,
}) => {
    const [show, setShow] = useState<boolean>(false)
    const ourRef = useRef(null)

    // Check if using Netlify CMS
    const config = useAppConfig()
    if (!show && config.env === AppEnv.NETLIFY_CMS) {
        setShow(true)
    }

    useLayoutEffect(() => {
        const onScroll = () => {
            const divTopPos = topPos(ourRef.current)

            if (divTopPos < window.innerHeight) {
                setShow(true)
            }
        }
        onScroll()
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <div ref={ourRef} className={show ? "profile-card" : ""}>
            {show && (
                <>
                    <header>
                        <a target="_blank" rel="noreferrer" href="#">
                            {image && (
                                <img
                                    src={renderImage(image)}
                                    className="hoverZoomLink"
                                />
                            )}
                        </a>

                        <h1>{heading}</h1>

                        <h2>{subheading}</h2>
                    </header>

                    <div className="profile-bio">
                        <SwiperCard contents={contents} />
                    </div>

                    <ul className="profile-social-links">
                        <li>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.facebook.com/creativedonut"
                            >
                                <i className="fa fa-facebook" />
                            </a>
                        </li>
                        <li>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://twitter.com/dropyourbass"
                            >
                                <i className="fa fa-twitter" />
                            </a>
                        </li>
                        <li>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://github.com/vipulsaxena"
                            >
                                <i className="fa fa-github" />
                            </a>
                        </li>
                        <li>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.behance.net/vipulsaxena"
                            >
                                <i className="fa fa-behance" />
                            </a>
                        </li>
                    </ul>
                </>
            )}
        </div>
    )
}

export default ExperienceCard
