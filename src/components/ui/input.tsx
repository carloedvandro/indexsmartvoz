
import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md bg-white px-3 py-1 text-base font-medium text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9c40ff] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 border border-input md:text-sm [&:not(:placeholder-shown)]:bg-white [&:focus]:bg-white [&:hover]:bg-white [&:active]:bg-white",
          className
        )}
        style={{
          backgroundColor: 'white !important',
          WebkitBoxShadow: '0 0 0 1000px white inset !important',
          WebkitTextFillColor: 'black !important',
          boxShadow: '0 0 0 1000px white inset !important'
        }}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
