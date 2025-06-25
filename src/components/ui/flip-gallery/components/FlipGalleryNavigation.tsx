
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FlipGalleryNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
}

export const FlipGalleryNavigation: React.FC<FlipGalleryNavigationProps> = ({ onPrevious, onNext }) => {
  return (
    <div className='absolute top-full right-0 mt-2 flex gap-2'>
      <button
        type='button'
        onClick={onPrevious}
        title='Previous'
        className='text-white opacity-75 hover:opacity-100 hover:scale-125 transition'
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type='button'
        onClick={onNext}
        title='Next'
        className='text-white opacity-75 hover:opacity-100 hover:scale-125 transition'
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
