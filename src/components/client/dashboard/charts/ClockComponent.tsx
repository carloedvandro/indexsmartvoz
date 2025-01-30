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
      {/* Círculo externo */}
      <div className="w-32 h-32 rounded-full border-4 border-primary flex items-center justify-center relative">
        {/* Marcadores de hora */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-3 bg-primary"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-48px)`,
              transformOrigin: '50% 50%'
            }}
          />
        ))}
        
        {/* Ponteiros do relógio */}
        <div className="absolute w-1 h-12 bg-primary origin-bottom transform -translate-y-1/2"
             style={{ 
               transform: `rotate(${(time.getHours() % 12) * 30 + time.getMinutes() * 0.5}deg)`,
               transformOrigin: 'bottom center'
             }} 
        />
        <div className="absolute w-0.5 h-16 bg-accent origin-bottom transform -translate-y-1/2"
             style={{ 
               transform: `rotate(${time.getMinutes() * 6}deg)`,
               transformOrigin: 'bottom center'
             }} 
        />
        <div className="absolute w-0.5 h-16 bg-secondary origin-bottom transform -translate-y-1/2"
             style={{ 
               transform: `rotate(${time.getSeconds() * 6}deg)`,
               transformOrigin: 'bottom center'
             }} 
        />
        
        {/* Ponto central */}
        <div className="absolute w-3 h-3 bg-primary rounded-full" />
      </div>
      
      {/* Tempo digital abaixo do relógio */}
      <div className="mt-4 text-lg font-semibold text-primary">
        {time.toLocaleTimeString()}
      </div>
    </div>
  );
};