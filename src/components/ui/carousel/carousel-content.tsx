
import * as React from "react"
import { cn } from "@/lib/utils"
import { useCarousel } from "./context"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-mx-1.5" : "-mt-4 flex-col", // Changed from -mx-2 to -mx-1.5 to reduce spacing
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

export { CarouselContent }
