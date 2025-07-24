import { cn } from "@/lib/utils"
import { StarBorder } from "@/components/ui/star-border"

export function StarBorderDemo() {
  return (
    <div className="space-y-8">
      <StarBorder>
        Theme-aware Border
      </StarBorder>
      
      <StarBorder 
        color="hsl(var(--primary))"
        speed="4s"
        className="hover:scale-105 transition-transform"
      >
        Custom Primary Color
      </StarBorder>
      
      <StarBorder 
        as="div"
        color="#ff6b9d"
        speed="3s"
      >
        Pink Animated Border
      </StarBorder>
    </div>
  )
}