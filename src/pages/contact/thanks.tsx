import { IPageProps } from "../../../types/location-types"
import Layout from "../../components/Layout"
import React from "react"

const Thanks: React.FC<IPageProps> = ({ location }) => (
    <Layout location={location}>
        <section className="section">
            <div className="container">
                <div className="content">
                    <h1>Thank you!</h1>
                    <p>This is a custom thank you page for form submissions</p>
                </div>
            </div>
        </section>
    </Layout>
)

export default Thanks
