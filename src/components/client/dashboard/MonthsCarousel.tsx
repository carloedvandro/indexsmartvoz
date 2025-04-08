
import React from 'react';
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
  return (
    <div className="px-6 mb-6 relative">
      <Carousel className="w-full" opts={{ align: "start" }}>
        <CarouselPrevious className="left-2 lg:left-0 z-10 shadow-md hover:bg-gray-100 bg-white text-gray-800" />
        <CarouselContent className="py-2">
          {months.map((monthData, index) => (
            <CarouselItem key={index} className="basis-auto md:basis-1/3 lg:basis-1/5 pl-2 pr-2 first:pl-2 last:pr-2">
              <MonthCard 
                month={monthData.month} 
                day={monthData.day} 
                active={monthData.month === activeMonth} 
                onClick={() => setActiveMonth(monthData.month)}
                upValue={monthData.upValue}
                downValue={monthData.downValue}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="right-2 lg:right-0 z-10 shadow-md hover:bg-gray-100 bg-white text-gray-800" />
      </Carousel>
    </div>
  );
}
