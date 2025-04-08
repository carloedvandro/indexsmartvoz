
import React, { useState } from 'react';
import { MonthCard } from './MonthCard';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from '@/hooks/use-mobile';

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
  const totalUpValue = months.reduce((sum, month) => sum + month.upValue, 0);
  const totalDownValue = months.reduce((sum, month) => sum + month.downValue, 0);
  const isMobile = useIsMobile();
  
  const [isTotalActive, setIsTotalActive] = useState(false);

  const handleTotalClick = () => {
    setIsTotalActive(true);
    setActiveMonth('');
  }

  const handleMonthClick = (month: string) => {
    setIsTotalActive(false);
    setActiveMonth(month);
  }

  return (
    <div className="px-10 mb-6 relative">
      <Carousel className="w-full" opts={{ align: "start" }}>
        <CarouselPrevious className="absolute -left-10 top-1/2 -translate-y-1/2 z-10 hover:bg-transparent focus:bg-transparent focus:outline-none" />
        <CarouselContent className="py-2">
          {months.map((monthData, index) => (
            <CarouselItem key={index} className="basis-auto md:basis-1/3 lg:basis-1/5">
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
          
          <CarouselItem className="basis-auto md:basis-1/3 lg:basis-1/5">
            <div 
              className={`min-w-[160px] sm:min-w-[170px] p-4 rounded-xl text-center cursor-pointer transition-colors ${
                isTotalActive ? 'bg-[#0E1C36] text-white' : 'bg-white text-gray-700 shadow border border-gray-200'
              }`}
              onClick={handleTotalClick}
            >
              <div className="font-semibold text-base text-gray-500">Total</div>
              <div className="flex justify-center mt-2.5 text-sm space-x-6">
                <span className="flex items-center">
                  <ArrowUpIcon className="w-5 h-5 mr-1.5 stroke-[#22c55e] stroke-[2.5px]" />
                  <span className="text-gray-500 font-medium">{totalUpValue}</span>
                </span>
                <span className="flex items-center">
                  <ArrowDownIcon className="w-5 h-5 mr-1.5 stroke-[#ef4444] stroke-[2.5px]" />
                  <span className="text-gray-500 font-medium">{totalDownValue}</span>
                </span>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselNext className="absolute -right-10 top-1/2 -translate-y-1/2 z-10 hover:bg-transparent focus:bg-transparent focus:outline-none" />
      </Carousel>
    </div>
  );
}
