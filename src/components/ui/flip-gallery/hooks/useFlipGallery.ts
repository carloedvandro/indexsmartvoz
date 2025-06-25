
import { useEffect, useRef, useState } from 'react';
import { 
  images, 
  FLIP_SPEED, 
  flipTiming, 
  flipAnimationTop, 
  flipAnimationBottom, 
  flipAnimationTopReverse, 
  flipAnimationBottomReverse 
} from '../constants';

export const useFlipGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniteRef = useRef<NodeListOf<HTMLDivElement> | []>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // initialise first image once
  useEffect(() => {
    if (!containerRef.current) return;
    uniteRef.current = containerRef.current.querySelectorAll('.unite');
    defineFirstImg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defineFirstImg = () => {
    if (Array.isArray(uniteRef.current)) return;
    uniteRef.current.forEach(setActiveImage);
    setImageTitle();
  };

  const setActiveImage = (el: HTMLDivElement) => {
    el.style.backgroundImage = `url('${images[currentIndex].url}')`;
  };

  const setImageTitle = () => {
    const gallery = containerRef.current;
    if (!gallery) return;
    gallery.setAttribute('data-title', images[currentIndex].title);
    gallery.style.setProperty('--title-y', '0');
    gallery.style.setProperty('--title-opacity', '1');
  };

  const updateGallery = (nextIndex: number, isReverse = false) => {
    const gallery = containerRef.current;
    if (!gallery) return;

    // determine direction animation arrays
    const topAnim = isReverse ? flipAnimationTopReverse : flipAnimationTop;
    const bottomAnim = isReverse
      ? flipAnimationBottomReverse
      : flipAnimationBottom;

    gallery.querySelector('.overlay-top')?.animate(topAnim, flipTiming);
    gallery.querySelector('.overlay-bottom')?.animate(bottomAnim, flipTiming);

    // hide title
    gallery.style.setProperty('--title-y', '-1rem');
    gallery.style.setProperty('--title-opacity', '0');
    gallery.setAttribute('data-title', '');

    // update images with slight delay so animation looks continuous
    if (Array.isArray(uniteRef.current)) return;
    uniteRef.current.forEach((el, idx) => {
      const delay =
        (isReverse && (idx !== 1 && idx !== 2)) ||
        (!isReverse && (idx === 1 || idx === 2))
          ? FLIP_SPEED - 200
          : 0;

      setTimeout(() => setActiveImage(el), delay);
    });

    // reveal new title roughly half‑way through animation
    setTimeout(setImageTitle, FLIP_SPEED * 0.5);
  };

  const updateIndex = (increment: number) => {
    const inc = Number(increment);
    const newIndex = (currentIndex + inc + images.length) % images.length;
    const isReverse = inc < 0;
    setCurrentIndex(newIndex);
    updateGallery(newIndex, isReverse);
  };

  return {
    containerRef,
    updateIndex
  };
};
