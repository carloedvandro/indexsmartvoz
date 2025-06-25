
import { ImageData } from './types';

export const images: ImageData[] = [
  { title: 'Joshua Hibbert', url: 'https://picsum.photos/id/870/600/1000' },
  { title: 'Joshua Earle', url: 'https://picsum.photos/id/883/600/1000' },
  { title: 'Antoine Beauvillain', url: 'https://picsum.photos/id/478/600/1000' },
  { title: 'Greg Rakozy', url: 'https://picsum.photos/id/903/600/1000' },
  { title: 'Ramiro Checchi', url: 'https://picsum.photos/id/503/600/1000' }
];

export const FLIP_SPEED = 750;
export const flipTiming = { duration: FLIP_SPEED, iterations: 1 };

// flip down
export const flipAnimationTop: Keyframe[] = [
  { transform: 'rotateX(0)' },
  { transform: 'rotateX(-90deg)' },
  { transform: 'rotateX(-90deg)' }
];

export const flipAnimationBottom: Keyframe[] = [
  { transform: 'rotateX(90deg)' },
  { transform: 'rotateX(90deg)' },
  { transform: 'rotateX(0)' }
];

// flip up
export const flipAnimationTopReverse: Keyframe[] = [
  { transform: 'rotateX(-90deg)' },
  { transform: 'rotateX(-90deg)' },
  { transform: 'rotateX(0)' }
];

export const flipAnimationBottomReverse: Keyframe[] = [
  { transform: 'rotateX(0)' },
  { transform: 'rotateX(90deg)' },
  { transform: 'rotateX(90deg)' }
];
