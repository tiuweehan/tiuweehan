import React, { createContext, useContext } from "react"

export enum AppEnv {
    PRODUCTION,
    NETLIFY_CMS,
}

export interface AppConfig {
    env: AppEnv
}

const AppConfigContext = createContext<AppConfig>({
    env: AppEnv.PRODUCTION,
})

export const useAppConfig = () => useContext(AppConfigContext)

export const AppConfigProvider: React.FC<{ config: AppConfig }> = ({
    children,
    config,
}) => (
    <AppConfigContext.Provider value={config}>
        {children}
    </AppConfigContext.Provider>
)
