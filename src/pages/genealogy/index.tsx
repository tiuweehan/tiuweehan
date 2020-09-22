import * as d3 from "d3"
import { IPageProps } from "../../../types/location-types"
import Layout from "../../components/Layout"
import React, { useEffect, useRef } from "react"

const GenealogyPage: React.FC<IPageProps> = ({ location }) => {
    const ref = useRef<SVGSVGElement | null>(null)

    useEffect(() => {
        d3.select(ref.current)
            .append("circle")
            .attr("cx", 150)
            .attr("cy", 70)
            .attr("r", 50)
    }, [])

    return (
        <Layout location={location}>
            <svg ref={ref} />
        </Layout>
    )
}

export default GenealogyPage
