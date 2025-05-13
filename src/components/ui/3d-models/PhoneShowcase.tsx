
import React from 'react';
import { PhoneModel } from './PhoneModel';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const PHONE_COLORS = [
  '#FF4C4C', // Red
  '#4C6FFF', // Blue
  '#9B51E0', // Purple
  '#00C3A5', // Teal
  '#FE9A22'  // Orange
];

interface PhoneShowcaseProps {
  className?: string;
}

export const PhoneShowcase: React.FC<PhoneShowcaseProps> = ({ className }) => {
  return (
    <div className={`phone-showcase ${className}`}>
      <Carousel
        opts={{
          align: 'center',
          loop: true,
        }}
      >
        <CarouselContent>
          {PHONE_COLORS.map((color, index) => (
            <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3">
              <div className="p-1">
                <PhoneModel color={color} scale={1.2} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
