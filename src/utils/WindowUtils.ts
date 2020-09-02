import { useEffect, useState } from "react"

interface WindowSize {
    width: number
    height: number
}

export const useWindowSize: () => WindowSize = () => {
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

const useBreakpoint = <T>(queries: T) => {
    const initValue = Object.keys(queries).reduce((acc, media) => {
        acc[media] = false
        return acc
    }, {} as Record<keyof T, boolean>) // All keys of T map to false

    const [queryMatch, setQueryMatch] = useState<Record<keyof T, boolean>>(
        initValue
    )

    useEffect(() => {
        const mediaQueryLists = {}
        const keys = Object.keys(queries)

        // To check whether event listener is attached or not
        let isAttached = false

        const handleQueryListener = () => {
            const updatedMatches = keys.reduce((acc, media) => {
                acc[media] = !!(
                    mediaQueryLists[media] && mediaQueryLists[media].matches
                )
                return acc
            }, {} as Record<keyof T, boolean>)
            //Setting state to the updated matches
            // when document either starts or stops matching a query
            setQueryMatch(updatedMatches)
        }

        if (window && window.matchMedia) {
            const matches = {}
            keys.forEach((media) => {
                if (typeof queries[media] === "string") {
                    mediaQueryLists[media] = window.matchMedia(queries[media])
                    matches[media] = mediaQueryLists[media].matches
                } else {
                    matches[media] = false
                }
            })
            //Setting state to initial matching queries
            setQueryMatch(matches as Record<keyof T, boolean>)
            isAttached = true
            keys.forEach((media) => {
                if (typeof queries[media] === "string") {
                    mediaQueryLists[media].addListener(handleQueryListener)
                }
            })
        }

        return () => {
            //If event listener is attached then remove it when deps change
            if (isAttached) {
                keys.forEach((media) => {
                    if (typeof queries[media] === "string") {
                        mediaQueryLists[media].removeListener(
                            handleQueryListener
                        )
                    }
                })
            }
        }
    }, [queries])

    return queryMatch
}

export default useBreakpoint
