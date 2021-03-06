import "./all.sass"
import { Helmet } from "react-helmet"
import { IPageProps } from "../../types/location-types"
import { withPrefix } from "gatsby"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Provider from "./providers/Provider"
import React from "react"
import useSiteMetadata from "./SiteMetadata"

// import { library } from "@fortawesome/fontawesome-svg-core"
// import { fab } from "@fortawesome/free-brands-svg-icons"
// library.add(fab)

const TemplateWrapper: React.FC<IPageProps> = ({ location, children }) => {
    const { title, description } = useSiteMetadata()
    return (
        <Provider location={location}>
            <div>
                <Helmet>
                    <html lang="en" />
                    <title>{title}</title>
                    <meta name="description" content={description} />

                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href={`${withPrefix("/")}img/apple-touch-icon-twh.png`}
                    />
                    <link
                        rel="icon"
                        type="image/svg+xml"
                        href={`${withPrefix("/")}img/twh.svg`}
                        sizes="32x32"
                    />
                    <link
                        rel="mask-icon"
                        href={`${withPrefix("/")}img/twh.svg`}
                        color="#ff4400"
                    />
                    <meta name="theme-color" content="#fff" />

                    <meta property="og:type" content="business.business" />
                    <meta property="og:title" content={title} />
                    <meta property="og:url" content="/" />
                    <meta
                        property="og:image"
                        content={`${withPrefix("/")}img/twh.png`}
                    />
                </Helmet>
                <Navbar />
                <div>{children}</div>
                <Footer />
            </div>
        </Provider>
    )
}

export default TemplateWrapper
