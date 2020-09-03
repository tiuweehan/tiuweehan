import { IPageProps } from "../../types/location-types"
import Layout from "../components/Layout"
import React from "react"

const NotFoundPage: React.FC<IPageProps> = ({ location }) => (
    <Layout location={location}>
        <div>
            <h1>NOT FOUND</h1>
            <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </div>
    </Layout>
)

export default NotFoundPage
