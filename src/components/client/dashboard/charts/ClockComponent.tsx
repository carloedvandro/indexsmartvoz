import { useEffect, useState } from 'react';
import { Clock } from "lucide-react";

export const ClockComponent = () => {
  const [time, setTime] = useState(new Date());
  const [audio] = useState(new Audio('/clock-tick.mp3'));

  useEffect(() => {
    const playTickSound = () => {
      audio.currentTime = 0;
      audio.play().catch(err => console.log('Audio play failed:', err));
    };

    const timer = setInterval(() => {
      setTime(new Date());
      playTickSound();
    }, 1000);

    return () => {
      clearInterval(timer);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  return (
    <div className="flex flex-col items-center justify-center p-4 relative">
      {/* Tempo digital */}
      <div className="text-lg font-semibold text-primary">
        {time.toLocaleTimeString()}
      </div>
    </div>
  );
};