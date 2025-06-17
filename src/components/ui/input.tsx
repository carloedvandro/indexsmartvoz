
import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md bg-white px-3 py-1 text-base font-medium text-black file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:bg-white disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 border-2 border-[#660099]",
          className
        )}
        style={{
          backgroundColor: 'white !important',
          WebkitBoxShadow: 'none !important',
          WebkitTextFillColor: 'black !important',
          boxShadow: 'none !important'
        }}
        autoComplete="off"
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
