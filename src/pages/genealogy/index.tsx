import { IPageProps } from "../../../types/location-types"
import FamilyTree from "../../components/tree/FamilyTree"
import Layout from "../../components/Layout"
import React from "react"

const GenealogyPage: React.FC<IPageProps> = ({ location }) => {
    return (
        <Layout location={location}>
            <FamilyTree />
        </Layout>
    )
}

export default GenealogyPage
