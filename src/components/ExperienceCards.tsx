import { useWindowSize } from "../utils/WindowUtils"
import ExperienceCard, { ExperienceCardInfo } from "./ExperienceCard"
import React, { useEffect, useState } from "react"
import _ from "lodash"

interface PropType {
    data?: Array<ExperienceCardInfo>
}

const ExperienceCards: React.FC<PropType> = ({ data }) => {
    const [isVertical, setIsVertical] = useState<boolean>(true)
    const windowSize = useWindowSize()

    useEffect(() => {
        const onResize = () => {
            // Vertical or Horizontal – See ExperienceCard.css
            const checkVertical =
                window.innerHeight >= 530 ||
                window.innerWidth <= 540 ||
                window.innerWidth >= 850
            setIsVertical(checkVertical)
        }
        onResize()
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, [])

    if (!data) {
        return null
    }

    if (windowSize.width > 1200) {
        return renderCards({ isVertical, data, chunks: 3 })
    }

    if (windowSize.width > 850) {
        return renderCards({ isVertical, data, chunks: 2 })
    }

    return renderCards({ isVertical, data, chunks: 1 })
}

interface renderCardsInput {
    isVertical: boolean
    data: Array<ExperienceCardInfo>
    chunks: number
}

const renderCards = ({ isVertical, data, chunks }: renderCardsInput) => {
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
                                minWidth: isVertical ? "280px" : "530px",
                                minHeight: isVertical ? "530px" : "280px",
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

export default ExperienceCards
