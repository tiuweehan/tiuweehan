import ExperienceCard, { ExperienceCardInfo } from "./ExperienceCard"
import React, { useEffect, useState } from "react"
import _ from "lodash"

interface PropType {
    data?: Array<ExperienceCardInfo>
}

interface WindowSize {
    width: number
    height: number
}

const ExperienceCards: React.FC<PropType> = ({ data }) => {
    const width = useWindowSize().width

    if (!data) {
        return null
    }

    if (width > 1200) {
        return renderCards(data, 3)
    }

    if (width > 800) {
        return renderCards(data, 2)
    }

    return renderCards(data, 1)
}

const renderCards = (data: Array<ExperienceCardInfo>, chunks: number) => {
    return (
        <>
            {_.chunk(data, chunks).map((columns, columnsIndex) => (
                <div className="columns" key={`columns${columnsIndex}`}>
                    {_.assign(
                        _.fill(
                            new Array(
                                chunks
                            ) as Array<ExperienceCardInfo | null>,
                            null
                        ),
                        columns
                    ).map((column: ExperienceCardInfo | null, columnIndex) => (
                        <div
                            key={`column${columnIndex}`}
                            className="column"
                            style={{
                                minWidth: "280px",
                                minHeight: "530px",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            {column && <ExperienceCard {...column} />}
                        </div>
                    ))}
                </div>
            ))}
        </>
    )
}

const useWindowSize: () => WindowSize = () => {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: 0,
        height: 0,
    })

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        // Add event listener
        window.addEventListener("resize", handleResize)

        // Call handler right away so state gets updated with initial window size
        handleResize()

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize)
    }, []) // Empty array ensures that effect is only run on mount

    return windowSize
}

export default ExperienceCards
