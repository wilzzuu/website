import React, { createContext, useContext, useState, useEffect } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => {
    return useContext(SidebarContext);
};

export const SidebarProvider = ({ children }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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