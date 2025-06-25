
export interface ImageData {
  title: string;
  url: string;
}

export interface FlipAnimationKeyframes {
  transform: string;
}

export interface FlipGalleryState {
  currentIndex: number;
  images: ImageData[];
}
