
import * as React from "react"
import { cn } from "@/lib/utils"
import { MovingBorder } from "./moving-border"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md bg-transparent px-3 py-1 text-base transition-all border-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="pointer-events-none absolute inset-0 -z-10">
          <MovingBorder rx="10%" ry="10%" duration={2000}>
            <div className="h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)]" />
          </MovingBorder>
        </div>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
