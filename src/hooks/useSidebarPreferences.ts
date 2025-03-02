
import { useState, useEffect, useCallback } from "react"

const SIDEBAR_LOCALSTORAGE_KEY = "sidebar:state"

/**
 * Custom hook to manage sidebar preferences with localStorage
 * for better persistence and easier access.
 * 
 * @param defaultOpen - Default open state if no value is found in localStorage
 * @returns The sidebar open state and a function to update it
 */
export function useSidebarPreferences(defaultOpen: boolean = true) {
  // Initialize state from localStorage or fall back to defaultOpen
  const [open, setOpenState] = useState<boolean>(() => {
    const savedState = localStorage.getItem(SIDEBAR_LOCALSTORAGE_KEY)
    // Only use saved state if it exists and is a valid boolean string
    return savedState !== null ? savedState === "true" : defaultOpen
  })

  // Update both state and localStorage
  const setOpen = useCallback((value: boolean | ((prev: boolean) => boolean)) => {
    setOpenState(prev => {
      const newValue = typeof value === "function" ? value(prev) : value
      // Save to localStorage
      localStorage.setItem(SIDEBAR_LOCALSTORAGE_KEY, String(newValue))
      return newValue
    })
  }, [])

  // Handle window storage events (sync across tabs)
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === SIDEBAR_LOCALSTORAGE_KEY && event.newValue !== null) {
        setOpenState(event.newValue === "true")
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  return { open, setOpen }
}
