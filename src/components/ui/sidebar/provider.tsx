
import * as React from "react"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { useSidebarPreferences } from "@/hooks/useSidebarPreferences"
import { SidebarContext } from "./context"
import { 
  SIDEBAR_KEYBOARD_SHORTCUT,
  type SidebarProviderProps,
  type SidebarState
} from "./types"

export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
}: SidebarProviderProps) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)
  
  // Use the custom hook for localStorage persistence instead of cookies
  const { open: storedOpen, setOpen: setStoredOpen } = useSidebarPreferences(defaultOpen)
  
  // Use controlled or uncontrolled state
  const _open = openProp ?? storedOpen
  
  // Optimize setOpen to use useCallback with dependencies
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(_open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        setStoredOpen(openState)
      }
    },
    [setOpenProp, _open, setStoredOpen]
  )

  // Optimize toggleSidebar to use useCallback with correct dependencies
  const toggleSidebar = React.useCallback(() => {
    return isMobile
      ? setOpenMobile((open) => !open)
      : setOpen((open) => !open)
  }, [isMobile, setOpen])

  // Optimize the keyboard shortcut listener
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  const state: SidebarState = _open ? "expanded" : "collapsed"

  // Optimize context value creation with useMemo and proper dependencies
  const contextValue = React.useMemo(
    () => ({
      state,
      open: _open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, _open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          style={
            {
              "--sidebar-width": "calc(14rem - 10px)",
              "--sidebar-width-icon": "3rem",
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
            className
          )}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}
