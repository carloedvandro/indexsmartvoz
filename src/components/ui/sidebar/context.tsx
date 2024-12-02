import * as React from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { SIDEBAR_COOKIE_NAME, SIDEBAR_COOKIE_MAX_AGE, SIDEBAR_KEYBOARD_SHORTCUT, type SidebarContext } from "./types"

const SidebarContext = React.createContext<SidebarContext | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export { SidebarContext }