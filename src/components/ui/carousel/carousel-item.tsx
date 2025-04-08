
import * as React from "react"
import { cn } from "@/lib/utils"
import { useCarousel } from "./context"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "px-2" : "pt-4", // Changed from pl-4 to px-2 for even spacing
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

export { CarouselItem }
