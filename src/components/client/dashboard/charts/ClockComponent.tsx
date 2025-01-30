import { useEffect, useState } from 'react';

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
    <div className="flex items-center justify-center p-4">
      <div className="text-4xl font-bold font-mono animate-pulse">
        {time.toLocaleTimeString()}
      </div>
    </div>
  );
};