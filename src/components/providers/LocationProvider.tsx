import { IPageProps } from "../../../types/location-types"
import { WindowLocation } from "@reach/router"
import React, { createContext, useContext } from "react"

const LocationContext = createContext<WindowLocation | null>(null)

export const useLocation = () => useContext(LocationContext)

export const LocationProvider: React.FC<IPageProps> = ({
    children,
    location,
}) => (
    <LocationContext.Provider value={location}>
        {children}
    </LocationContext.Provider>
)
