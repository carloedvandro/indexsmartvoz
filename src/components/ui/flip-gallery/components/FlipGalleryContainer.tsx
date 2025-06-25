
import React from 'react';

interface FlipGalleryContainerProps {
  containerRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

export const FlipGalleryContainer: React.FC<FlipGalleryContainerProps> = ({ containerRef, children }) => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-black font-sans'>
      <div
        className='relative bg-white/10 border border-white/25 p-2'
        style={{ '--gallery-bg-color': 'rgba(255 255 255 / 0.075)' } as React.CSSProperties}
      >
        {/* flip gallery */}
        <div
          id='flip-gallery'
          ref={containerRef}
          className='relative w-[240px] h-[400px] md:w-[300px] md:h-[500px] text-center'
          style={{ perspective: '800px' }}
        >
          <div className='top unite bg-cover bg-no-repeat'></div>
          <div className='bottom unite bg-cover bg-no-repeat'></div>
          <div className='overlay-top unite bg-cover bg-no-repeat'></div>
          <div className='overlay-bottom unite bg-cover bg-no-repeat'></div>
        </div>

        {children}
      </div>
    </div>
  );
};
