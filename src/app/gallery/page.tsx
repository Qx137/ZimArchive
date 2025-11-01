"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useImages } from "@/hooks/use-images";
import Image from "next/image";

export default function GalleryPage() {
  const { images, isLoading } = useImages();

  const galleryImages = images?.filter(img => img.id.startsWith("gallery-"));

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-headline text-primary mb-4">Image Gallery</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A visual chronicle of the President's activities, party events, and significant national moments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages?.map((image) => (
            <Card key={image.id} className="overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300 border-primary/20">
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <Image
                    src={image.imageUrl}
                    alt={image.altText}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    data-ai-hint={image.imageHint}
                  />
                </div>
                 <div className="p-4">
                    <p className="font-body text-sm text-muted-foreground">{image.altText}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
