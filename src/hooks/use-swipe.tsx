
import { useRef } from "react"

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
}

export function useSwipe({ onSwipeLeft, onSwipeRight }: SwipeHandlers) {
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  // Minimum swipe distance in pixels to trigger action
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent | TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }
  
  const onTouchMove = (e: React.TouchEvent | TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }
  
  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft()
    }
    
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight()
    }
    
    // Reset values
    touchStartX.current = null
    touchEndX.current = null
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}
