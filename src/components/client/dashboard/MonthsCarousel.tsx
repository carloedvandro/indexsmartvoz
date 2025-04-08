
import React, { useState } from 'react';
import { MonthCard } from './MonthCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface MonthData {
  month: string;
  day: string;
  active: boolean;
  upValue: number;
  downValue: number;
}

interface MonthsCarouselProps {
  months: MonthData[];
  activeMonth: string;
  setActiveMonth: (month: string) => void;
}

export function MonthsCarousel({ months, activeMonth, setActiveMonth }: MonthsCarouselProps) {
  // Calculate total up and down values
  const totalUpValue = months.reduce((sum, month) => sum + month.upValue, 0);
  const totalDownValue = months.reduce((sum, month) => sum + month.downValue, 0);
  
  // State to track if total card is active
  const [isTotalActive, setIsTotalActive] = useState(false);

  // Function to handle total card click
  const handleTotalClick = () => {
    setIsTotalActive(true);
    setActiveMonth('');  // Deactivate all month cards
  }

  // Function to handle month card click
  const handleMonthClick = (month: string) => {
    setIsTotalActive(false);  // Deactivate total card
    setActiveMonth(month);    // Activate selected month
  }

  return (
    <div className="px-6 mb-6 relative">
      <Carousel className="w-full" opts={{ align: "start" }}>
        <CarouselPrevious className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-gray-400/30 hover:bg-gray-400/50 text-white h-8 w-8 rounded-full" />
        <CarouselContent className="py-2">
          {months.map((monthData, index) => (
            <CarouselItem key={index} className="basis-auto md:basis-1/3 lg:basis-1/5 pl-2 pr-2 first:pl-2 last:pr-2">
              <MonthCard 
                month={monthData.month} 
                day={monthData.day} 
                active={monthData.month === activeMonth && !isTotalActive} 
                onClick={() => handleMonthClick(monthData.month)}
                upValue={monthData.upValue}
                downValue={monthData.downValue}
              />
            </CarouselItem>
          ))}
          
          {/* Total Card - can be toggled to active state */}
          <CarouselItem className="basis-auto md:basis-1/3 lg:basis-1/5 pl-2 pr-2 last:pr-2">
            <div 
              className={`min-w-full p-4 rounded-xl text-center cursor-pointer transition-colors ${
                isTotalActive ? 'bg-[#0E1C36] text-white' : 'bg-white text-gray-700 shadow border border-gray-200'
              }`}
              onClick={handleTotalClick}
            >
              <div className="font-semibold text-base text-gray-500">Total</div>
              <div className="flex justify-center mt-2 text-sm space-x-4">
                <span className="flex items-center">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill={isTotalActive ? "#4ade80" : "#22c55e"}>
                    <path d="M7 14l5-5 5 5H7z" />
                  </svg>
                  <span className="text-gray-500">{totalUpValue}</span>
                </span>
                <span className="flex items-center">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill={isTotalActive ? "#f87171" : "#ef4444"}>
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                  <span className="text-gray-500">{totalDownValue}</span>
                </span>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselNext className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-gray-400/30 hover:bg-gray-400/50 text-white h-8 w-8 rounded-full" />
      </Carousel>
    </div>
  );
}
