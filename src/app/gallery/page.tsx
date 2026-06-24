"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useImages } from "@/hooks/use-images";
import type { Image as GalleryImage } from "@/types/image";
import Image from "next/image";

const gallerySections = [
  {
    id: "speech",
    title: "President Addressing the Nation",
    context: "This captures the ceremonial and public-face role of the presidency — the leader addressing the nation, often under the national flag, signalling authority, continuity and message delivery.",
    imageIds: ["gallery-speech-1", "gallery-speech-2", "gallery-speech-3", "gallery-speech-4", "gallery-speech-5", "gallery-speech-6"],
  },
  {
    id: "investment",
    title: "Meeting with International Investors",
    context: "A key example of the “engagement & re-engagement” agenda promoted under his tenure — seeking foreign investment, particularly in mining and other extractive sectors, to drive growth.",
    imageIds: ["gallery-investors-1", "gallery-investors-2", "gallery-investors-3", "gallery-investors-4", "gallery-investors-5", "gallery-investors-6"],
  },
  {
    id: "agriculture",
    title: "Inspecting Pfumvudza/Intwasa Programme",
    context: "Agriculture remains central to Zimbabwe’s economy and identity. The Pfumvudza/Intwasa scheme is part of efforts to revitalise farming, so a presidential inspection highlights prioritisation of rural development and food security.",
    imageIds: ["gallery-agri-1", "gallery-agri-2", "gallery-agri-3", "gallery-agri-4", "gallery-agri-5", "gallery-agri-6"],
  },
  {
    id: "airport",
    title: "New R.G. Mugabe International Airport Terminal",
    context: "Infrastructure of national significance — modern airport terminals signal connectivity, investment readiness, and national image. It's also a symbol of progress and ambition in global terms.",
    imageIds: ["gallery-airport-1", "gallery-airport-2", "gallery-airport-3", "gallery-airport-4", "gallery-airport-5", "gallery-airport-6"],
  },
  {
    id: "nds1",
    title: "Launch of National Development Strategy 1 (NDS1)",
    context: "Strategic policy launches frame the government’s long-term roadmap. NDS1 is the blueprint toward an upper-middle-income economy by 2030, so the launch event is a key moment in the narrative.",
    imageIds: ["gallery-nds1-1", "gallery-nds1-2", "gallery-nds1-3", "gallery-nds1-4", "gallery-nds1-5", "gallery-nds1-6"],
  }
];


export default function GalleryPage() {
  const { images } = useImages();

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-headline text-primary mb-4">Image Gallery</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A visual chronicle of the President's activities, party events, and significant national moments.
          </p>
        </div>

        <div className="space-y-16">
          {gallerySections.map((section) => {
            const sectionImages = section.imageIds
              .map(id => images?.find(img => img.id === id))
              .filter((image): image is GalleryImage => Boolean(image));

            return (
              <section key={section.id}>
                <Card className="shadow-xl border-primary/20 overflow-hidden">
                  <CardHeader>
                    <CardTitle className="font-headline text-3xl text-primary">{section.title}</CardTitle>
                    <CardDescription className="font-body text-base text-muted-foreground pt-2">{section.context}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {sectionImages.length > 0 ? (
                      <Carousel
                        opts={{
                          align: "start",
                          loop: true,
                        }}
                        className="w-full"
                      >
                        <CarouselContent>
                          {sectionImages.map((image) => (
                            <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                               <div className="p-1">
                                <Card className="overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300 border-primary/10">
                                    <CardContent className="p-0">
                                        <div className="relative aspect-video">
                                        <Image
                                            src={image.imageUrl}
                                            alt={image.altText}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            data-ai-hint={image.imageHint}
                                        />
                                        </div>
                                    </CardContent>
                                </Card>
                               </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="ml-12" />
                        <CarouselNext className="mr-12" />
                      </Carousel>
                    ) : (
                      <p className="text-muted-foreground">Loading images...</p>
                    )}
                  </CardContent>
                </Card>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
