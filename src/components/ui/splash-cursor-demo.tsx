
import { SplashCursor } from "@/components/ui/splash-cursor";

export function SplashCursorDemo() {
  return (
    <div className="relative h-screen w-full">
      <SplashCursor />
      <div className="relative z-10 h-full w-full flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white text-center drop-shadow-lg">
          Move your mouse or touch the screen
        </h1>
      </div>
    </div>
  );
}
