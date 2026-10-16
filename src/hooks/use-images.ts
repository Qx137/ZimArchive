import { archiveImages } from '@/data/archive-images';

export function useImages() {
  return { images: archiveImages, isLoading: false, error: null };
}
