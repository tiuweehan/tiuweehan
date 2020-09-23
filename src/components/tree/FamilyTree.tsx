import "./FamilyTree.css"
import * as d3 from "d3"
import { graphql, useStaticQuery } from "gatsby"
import { useWindowSize } from "../../utils/WindowUtils"
import React, { useEffect, useRef } from "react"

interface FrontmatterType {
    id: string
    parentId?: string
    name: string
    simplifiedChineseName: string
    siblingPosition: number
    spouse?: {
        name: string
        simplifiedChineseName: string
    }
}

interface NodeType {
    id: string
    fields: {
        slug: string
    }
    frontmatter: FrontmatterType
}

interface DataType {
    allMarkdownRemark: {
        edges: Array<{
            node: NodeType
        }>
    }
}

interface ProfileType extends FrontmatterType {
    gender: string
    slug: string
}

const query = graphql`
    query BiographyPagesQuery {
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "biography-page" } } }
        ) {
            edges {
                node {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        id
                        parentId
                        name
                        simplifiedChineseName
                        siblingPosition
                        spouse {
                            name
                            simplifiedChineseName
                        }
                    }
                }
            }
        }
    }
`
const linkColors = d3
    .scaleLinear()
    .domain([1, 4, 8])
    // @ts-ignore
    .range(["#00441b", "#29851F", "#7EA31E"])

function elbow(s: { x: number; y: number }, d: { x: number; y: number }) {
    const hy = (s.y - d.y) / 2
    return `M${d.x},${d.y} V${d.y + hy} H${s.x} V${s.y}`
}

const FamilyTree: React.FC = () => {
    const { width } = useWindowSize()

    // Retrieve static data
    const data = useStaticQuery<DataType>(query)

    // Retrieve profiles data
    const profiles: ProfileType[] = data.allMarkdownRemark.edges.map(
        ({ node }) => ({
            slug: node.fields.slug,
            gender: "male",
            ...node.frontmatter,
        })
    )

    const duration = 750
    const boxW = 80
    const boxH = 80
    const spouseSpace = 120
    const depthSize = 150

    const stratify = d3
        .stratify()
        .id((d: any) => d.id)
        .parentId((d: any) => d.parentId)

    const root = stratify(profiles).sort((a: any, b: any) => {
        return a.data.siblingPosition - b.data.siblingPosition
    })

    console.log(root)

    const height = (root.height + 2) * depthSize

    root["x0"] = 0
    root["y0"] = width / 2

    const treemap = d3
        .tree()
        .size([height, width])
        .nodeSize([boxW, boxH])
        .separation(function (a: any, b: any) {
            // leave some space for the spouse block
            if (b.data.spouse) {
                if (a.data.spouse) {
                    // both a & b has spouse blocks
                    return 3.5
                }
                // only b has spouse block
                return 2.5
            } else if (a.data.spouse) {
                // only a has spouse block
                return 2.5
            } else if (a.parent === b.parent) {
                // single siblings are close to save space
                return 1.2
            }

            //else (single cousins)
            return 2
        })

    const ref = useRef<SVGGElement | null>(null)

    const update = (source: any) => {
        const svg = d3.select(ref.current)

        const treeData = treemap(root)
        const nodes = treeData.descendants()
        const links = treeData.descendants().slice(1)

        nodes.forEach((d) => {
            d.y = d.depth * depthSize
        })

        const node = svg.selectAll("g.node").data(nodes, (d: any) => d.id)

        const nodeEnter = node
            .enter()
            .insert("g", ":first-child") // children should be below parents so that the transition looks nicer
            .attr("class", (d: any) =>
                d._children ? "node node--has-children" : "node"
            )
            .attr(
                "transform",
                () => `translate(${source["x0"]}, ${source["y0"]})`
            )
            .on("click", click)

        // Add person block
        const personBlock = nodeEnter
            .append("g")
            .attr("transform", (d: any) => {
                return d.data.spouse
                    ? `translate(${-spouseSpace / 2}, 0)`
                    : "translate(0, 0)"
            })

        // Add Rectangle as text box for the nodes
        personBlock
            .append("rect")
            .attr("x", (d: any) => (d.data.boxW ? -d.data.boxW / 2 : -boxW / 2))
            .attr("y", -boxH * 0.5)
            .attr("width", (d: any) => d.data.boxW || boxW)
            .attr("height", boxH)
            .attr("rx", 0) // corner radius x
            .attr("ry", 0) // corner radius y
            .attr("class", (d: any) => {
                const gender = String(d.data.gender).toLowerCase()
                if (gender === "female") {
                    return "box box--female"
                } else if (gender === "male") {
                    return "box box--male"
                }
                return "box"
            })
            .on("mouseover", (d) => {
                // const bio = d3.select('#bio');
                // if (d.data.bio) {
                //     bio.html(`Bio: ${d.data.bio}`);
                // } else {
                //     bio.html('');
                // }
            })

        // Add labels for the nodes
        personBlock
            .append("text")
            .classed("node-name", true)
            .attr("dy", ".35em") // shift it to vertically middle
            .attr("text-anchor", "middle")
            .text((d: any) => d.data.simplifiedChineseName)

        const nodeHasSpouse = nodeEnter.filter((d: any) => !!d.data.spouse)

        // spouse link
        nodeHasSpouse
            .insert("line", ":first-child")
            .attr("class", "link")
            .attr("stroke", (d: any) => {
                return linkColors(d.depth)
            })
            .attr("y1", 0)
            .attr("x1", -spouseSpace / 2)
            .attr("y2", 0)
            .attr("x2", spouseSpace / 2)

        // Add spouse block
        const spouseBlock = nodeHasSpouse
            .append("g")
            .attr("transform", `translate(${spouseSpace / 2}, 0)`)

        // spouse block
        spouseBlock
            .append("rect")
            .attr(
                "x",
                (d: any) => `${d.data.boxW ? -d.data.boxW / 2 : -boxW / 2}`
            )
            .attr("y", -boxH * 0.5)
            .attr("width", (d: any) => d.data.boxW || boxW)
            .attr("height", boxH)
            .attr("class", (d: any) => {
                const gender = String(d.data.gender).toLowerCase()
                // spouse gender is assumedly reversed from main node
                // TODO: pickup gender declared in spouse also
                if (gender === "female") {
                    return "box box--male"
                } else if (gender === "male") {
                    return "box box--female"
                }
                return "box"
            })
            .on("mouseover", (d: any) => {
                // const spouse = d.data.spouse;
                // const bio = d3.select('#bio');
                // if (spouse.bio) {
                //     bio.html(`Bio: ${spouse.bio}`);
                // } else {
                //     bio.html('');
                // }
            })

        // spouse text
        spouseBlock
            .append("text")
            .classed("spouse-name", true)
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            // @ts-ignore
            .attr("style", (d: any) => {
                const name = d.data.spouse.name || d.data.spouse
                // auto reduce font size so the long spouse names can fit
                if (name.includes("&")) {
                    return "font-size: 10px"
                }
            })
            .text((d: any) => `${d.data.spouse.simplifiedChineseName}`)

        // Add expand indicator
        nodeEnter
            .filter((d: any) => !!d._children)
            .append("text")
            .classed("expand-icon", true)
            .attr("text-anchor", "middle")
            .attr("x", boxW / 2 + 10)
            .attr("y", 5) // shift middle
            .attr("visibility", (d: any) => (d.children ? "hidden" : "visible"))
            .text("⊕")

        // UPDATE
        // @ts-ignore
        const nodeUpdate = nodeEnter.merge(node)

        // Transition to the proper position for the node
        nodeUpdate
            .transition()
            .duration(duration)
            .attr("transform", (d: any) => `translate(${d.x}, ${d.y})`)

        // Update the expand / close indicator
        nodeUpdate
            .selectAll("text.expand-icon")
            .attr("visibility", (d: any) => (d.children ? "hidden" : "visible"))

        // Remove any exiting nodes
        const nodeExit = node
            .exit()
            .transition()
            .duration(duration)
            .attr("transform", () => `translate(${source.x}, ${source.y})`)
            .remove()

        // On exit reduce the opacity of text labels
        nodeExit.selectAll("text").style("fill-opacity", 0)

        // ****************** links section ***************************
        const connector = elbow

        // Update the links...
        const link = svg.selectAll("path.link").data(links, (d: any) => d.id)

        // Enter any new links at the parent's previous position.
        const linkEnter = link
            .enter()
            .insert("path", "g")
            .attr("class", "link")
            .attr("stroke", (d) => {
                return linkColors(d.depth)
            })
            .attr("d", () => {
                const o = { x: source.x0, y: source.y0 }
                return connector(o, o)
            })

        // UPDATE
        // @ts-ignore
        const linkUpdate = linkEnter.merge(link)

        // Transition back to the parent element position
        linkUpdate
            .transition()
            .duration(duration)
            .attr("d", (d: any) => {
                if (d.data.spouse) {
                    // move link start (at child) a bit up since it is at new position
                    // because of spouse
                    return connector(
                        { y: d.y - spouseSpace / 2, x: d.x },
                        d.parent
                    )
                }
                return connector(d, d.parent)
            })

        // Remove any exiting links
        link.exit()
            .transition()
            .duration(duration)
            .attr("d", () => /*d*/ {
                const o = { x: source.x, y: source.y }
                return connector(o, o)
            })
            .remove()

        // Store the old positions for transition.
        nodes.forEach((d) => {
            d["x0"] = d.x
            d["y0"] = d.y
        })
    }

    const click = (d: any) => {
        if (d.children) {
            d._children = d.children
            d.children = null
        } else {
            d.children = d._children
            d._children = null
        }
        update(d)
    }

    useEffect(() => {
        update(root)
    }, [])

    return (
        <main className="chart-container">
            <svg height={`${height}px`} width={"100vw"}>
                {/*<rect className={'chart-bg'} height={`${height}px`} width={"100vw"}></rect>*/}
                <g
                    ref={ref}
                    className="tree-container"
                    transform={`translate(${width / 2}, 90) scale(1)`}
                />
            </svg>
        </main>
    )
}

export default FamilyTree
