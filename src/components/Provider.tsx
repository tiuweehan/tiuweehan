import { AppConfig, AppConfigProvider, AppEnv } from "./AppConfig"
import React from "react"

interface ProviderProps {
    config?: AppConfig
}

const Provider: React.FC<ProviderProps> = ({ children, config }) => {
    return (
        <AppConfigProvider config={config || { env: AppEnv.PRODUCTION }}>
            {children}
        </AppConfigProvider>
    )
}

export default Provider
