
import * as React from "react"
import type { SidebarContext as SidebarContextType } from "./types"

export const SidebarContext = React.createContext<SidebarContextType | null>(null)

// Optimize the useSidebar hook to be more performant
export function useSidebar() {
  const context = React.useContext(SidebarContext)
  
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  
  return context
}

// Create specialized hooks for specific sidebar state to reduce re-renders
export function useSidebarState() {
  const context = React.useContext(SidebarContext)
  
  if (!context) {
    throw new Error("useSidebarState must be used within a SidebarProvider")
  }
  
  return {
    state: context.state,
    open: context.open,
    isMobile: context.isMobile
  }
}

// Hook for just checking if sidebar is open (mobile or desktop)
export function useSidebarIsOpen() {
  const context = React.useContext(SidebarContext)
  
  if (!context) {
    throw new Error("useSidebarIsOpen must be used within a SidebarProvider")
  }
  
  return context.isMobile ? context.openMobile : context.open
}
