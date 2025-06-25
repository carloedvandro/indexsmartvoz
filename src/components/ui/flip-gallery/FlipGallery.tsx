
import React from 'react';
import { useFlipGallery } from './hooks/useFlipGallery';
import { FlipGalleryContainer } from './components/FlipGalleryContainer';
import { FlipGalleryNavigation } from './components/FlipGalleryNavigation';
import { FlipGalleryStyles } from './components/FlipGalleryStyles';

export default function FlipGallery() {
  const { containerRef, updateIndex } = useFlipGallery();

  return (
    <>
      <FlipGalleryContainer containerRef={containerRef}>
        <FlipGalleryNavigation 
          onPrevious={() => updateIndex(-1)}
          onNext={() => updateIndex(1)}
        />
      </FlipGalleryContainer>
      <FlipGalleryStyles />
    </>
  );
}
