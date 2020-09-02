import "./ExperienceCard.css"
import { AppEnv, useAppConfig } from "./AppConfig"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { renderImage } from "../utils/ImageUtils"
import React, { useLayoutEffect, useRef, useState } from "react"
import SwiperCard from "./SwiperCard"

export interface ExperienceCardInfo {
    name: string
    link: string
    image: any | string
    heading: string
    subheading: string
    contents: Array<{
        content: string
    }>
    socials: Array<{
        name: string
        logo: any | string
        link: string
    }>
}

const topPos = (element: any) => element.getBoundingClientRect().top

const ExperienceCard: React.FC<ExperienceCardInfo> = ({
    name,
    link,
    image,
    heading,
    subheading,
    contents,
    socials,
}) => {
    const [show, setShow] = useState<boolean>(false)
    const divRef = useRef(null)

    // Check if using Netlify CMS
    const config = useAppConfig()
    if (!show && config.env === AppEnv.NETLIFY_CMS) {
        setShow(true)
    }

    useLayoutEffect(() => {
        const onScroll = () => {
            const divTopPos = topPos(divRef.current)

            if (divTopPos < window.innerHeight) {
                setShow(true)
            }
        }
        onScroll()
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <aside ref={divRef} className={show ? "profile-card" : ""}>
            {show && (
                <>
                    <header>
                        <a target="_blank" rel="noreferrer" href={link}>
                            {image && (
                                <img
                                    src={renderImage(image)}
                                    alt={name}
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

                    <div
                        className="profile-social-links"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {socials?.map((social) => (
                            <div
                                key={`${subheading}-${social.name}`}
                                style={{
                                    padding: "0px 10px",
                                }}
                            >
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href={social.link}
                                >
                                    <FontAwesomeIcon
                                        icon={["fab", social.logo]}
                                        style={{
                                            transform: "scale(1.5)",
                                            color: "#000",
                                        }}
                                    />
                                </a>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </aside>
    )
}

export default ExperienceCard
