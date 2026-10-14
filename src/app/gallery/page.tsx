"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
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

interface LightboxState {
  title: string;
  images: GalleryImage[];
  index: number;
}

function Lightbox({
  state,
  onChange,
  onClose,
}: {
  state: LightboxState | null;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const total = state?.images.length ?? 0;
  const index = state?.index ?? 0;

  const step = useCallback(
    (delta: number) => {
      if (!total) return;
      onChange((index + delta + total) % total);
    },
    [index, total, onChange]
  );

  useEffect(() => {
    if (!state) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state, step]);

  const current = state?.images[index];

  return (
    <Dialog open={Boolean(state)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl gap-0 overflow-hidden rounded-3xl border-white/20 bg-black/55 p-0 text-white backdrop-blur-2xl sm:rounded-3xl [&>button]:hidden">
        {current && state && (
          <>
            <div className="relative aspect-[16/10] w-full bg-black/40">
              <Image
                key={current.id}
                src={current.imageUrl}
                alt={current.altText}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="animate-in fade-in-0 zoom-in-95 object-contain duration-500"
                priority
              />
              <DialogClose className="glass-on-color absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/25 active:scale-95">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </DialogClose>
              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous image"
                    className="glass-on-color absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white transition hover:scale-110 hover:bg-white/25 active:scale-95"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next image"
                    className="glass-on-color absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white transition hover:scale-110 hover:bg-white/25 active:scale-95"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
            <div className="flex items-start justify-between gap-4 border-t border-white/10 bg-black/30 px-5 py-4">
              <div className="min-w-0">
                <DialogTitle className="font-headline text-lg leading-snug text-white">{state.title}</DialogTitle>
                <DialogDescription className="mt-1 text-sm text-white/70">{current.altText}</DialogDescription>
              </div>
              <span className="glass-on-color shrink-0 rounded-full px-3 py-1 text-xs tabular-nums">
                {index + 1} / {total}
              </span>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function GalleryPage() {
  const { images } = useImages();
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <PageHeader
          eyebrow={`${gallerySections.length} collections`}
          title="Image Gallery"
          description="A visual chronicle of the President's activities, party events, and significant national moments."
        />

        <div className="space-y-12 md:space-y-16">
          {gallerySections.map((section) => {
            const sectionImages = section.imageIds
              .map((id) => images?.find((img) => img.id === id))
              .filter((image): image is GalleryImage => Boolean(image));

            return (
              <Reveal key={section.id}>
                <section>
                  <Card className="overflow-hidden border-primary/20">
                    <CardHeader>
                      <CardTitle className="font-headline text-3xl text-primary">{section.title}</CardTitle>
                      <CardDescription className="pt-2 font-body text-base text-muted-foreground">
                        {section.context}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {sectionImages.length > 0 ? (
                        <Carousel opts={{ align: "start", loop: true }} className="w-full">
                          <CarouselContent>
                            {sectionImages.map((image, index) => (
                              <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                  <button
                                    type="button"
                                    onClick={() => setLightbox({ title: section.title, images: sectionImages, index })}
                                    aria-label={`Open image: ${image.altText}`}
                                    className="group relative block aspect-video w-full cursor-zoom-in overflow-hidden rounded-xl border border-white/50 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                  >
                                    <Image
                                      src={image.imageUrl}
                                      alt={image.altText}
                                      fill
                                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                      data-ai-hint={image.imageHint}
                                    />
                                    <span
                                      aria-hidden
                                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                    />
                                    <span className="glass-on-color absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                      <Maximize2 className="h-4 w-4" />
                                    </span>
                                  </button>
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="glass ml-12 border-white/60 hover:scale-110" />
                          <CarouselNext className="glass mr-12 border-white/60 hover:scale-110" />
                        </Carousel>
                      ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3" aria-label="Loading images">
                          {[0, 1, 2].map((i) => (
                            <div key={i} className="aspect-video animate-pulse rounded-xl bg-muted/60" />
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </section>
              </Reveal>
            );
          })}
        </div>
      </div>

      <Lightbox
        state={lightbox}
        onChange={(index) => setLightbox((prev) => (prev ? { ...prev, index } : prev))}
        onClose={() => setLightbox(null)}
      />
    </div>
  );
}
