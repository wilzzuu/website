import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => {
    return useContext(SidebarContext);
};

export const SidebarProvider = ({ children }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

    // Toggle the sidebar's collapsed state
    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <SidebarContext.Provider
            value={{
                isSidebarCollapsed,
                setIsSidebarCollapsed,
                toggleSidebar,
            }}
        >
            {children}
        </SidebarContext.Provider>
    )
}