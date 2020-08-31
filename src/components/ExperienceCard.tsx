import "./ExperienceCard.css"
import React, { useLayoutEffect, useRef, useState } from "react"

const ExperienceCard: React.FC = () => {
    const [show, setShow] = useState<boolean>(false)
    const ourRef = useRef(null)

    useLayoutEffect(() => {
        const topPos = (element: any) => element.getBoundingClientRect().top
        const div1Pos = topPos(ourRef.current)
        const onScroll = () => {
            const scrollPos = window.scrollY + window.innerHeight
            if (div1Pos < scrollPos) {
                setShow(true)
            }
        }
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <aside ref={ourRef} className={show ? "profile-card" : ""}>
            <header>
                <a target="_blank" rel="noreferrer" href="#">
                    <img
                        src="http://lorempixel.com/150/150/people/"
                        className="hoverZoomLink"
                    />
                </a>

                <h1>John Doe</h1>

                <h2>Better Visuals</h2>
            </header>

            <div className="profile-bio">
                <p>
                    It takes monumental improvement for us to change how we live
                    our lives. Design is the way we access that improvement.
                </p>
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
        </aside>
    )
}

export default ExperienceCard
