import { AppConfig, AppConfigProvider, AppEnv } from "./AppConfigProvider"
import { LocationProvider } from "./LocationProvider"
import { WindowLocation } from "@reach/router"
import React from "react"

interface ProviderProps {
    location: WindowLocation
    config?: AppConfig
}

const Provider: React.FC<ProviderProps> = ({ location, config, children }) => {
    return (
        <LocationProvider location={location}>
            <AppConfigProvider config={config || { env: AppEnv.PRODUCTION }}>
                {children}
            </AppConfigProvider>
        </LocationProvider>
    )
}

export default Provider
