"use client";

import { useMemo } from 'react';
import { collection, query } from 'firebase/firestore';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import type { Image } from '@/types/image';

export function useImages() {
  const firestore = useFirestore();

  const imagesCollectionQuery = useMemoFirebase(
    () => query(collection(firestore, 'images')),
    [firestore]
  );

  const { data: images, isLoading, error } = useCollection<Image>(imagesCollectionQuery);

  return { images, isLoading, error };
}
