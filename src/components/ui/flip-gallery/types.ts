
export interface ImageData {
  title: string;
  url: string;
}

export interface FlipGalleryState {
  currentIndex: number;
  images: ImageData[];
}
