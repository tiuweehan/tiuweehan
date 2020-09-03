import "./404.css"
import { IPageProps } from "../../types/location-types"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import React from "react"

const NotFoundPage: React.FC<IPageProps> = ({ location }) => (
    <Layout location={location}>
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>404</h1>
                </div>
                <h2>Oops! Nothing was found</h2>
                <p>
                    The page you are looking for might have been removed, had
                    its name changed or is temporarily unavailable.
                    <Link to={"/"}>Return to homepage</Link>
                </p>
            </div>
        </div>
    </Layout>
)

export default NotFoundPage
