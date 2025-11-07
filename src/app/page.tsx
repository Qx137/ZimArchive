"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, GalleryHorizontal, Landmark, Presentation } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ZimbabweBirdIcon } from "@/components/icons/zimbabwe-bird";
import { useImages } from "@/hooks/use-images";
import heroMainImage from "@/img/hero-main.jpg";
import trabyImage from "@/img/traby.jpeg";

const featureCardsData = [
  {
    title: "Presidential Timeline",
    description: "Follow the President's journey, from early life to key career milestones.",
    href: "/timeline",
    icon: <Presentation className="w-8 h-8 text-primary" />,
    imageId: "hero-timeline"
  },
  {
    title: "Key Achievements",
    description: "Explore the transformative initiatives and progress across various sectors, including the Mbudzi interchange.",
    href: "/achievements",
    icon: <Landmark className="w-8 h-8 text-primary" />,
    imageId: "hero-achievements"
  },
  {
    title: "Image Gallery",
    description: "A visual journey through significant moments and events.",
    href: "/gallery",
    icon: <GalleryHorizontal className="w-8 h-8 text-primary" />,
    imageId: "hero-gallery"
  },
];


export default function Home() {
  const { images, isLoading } = useImages();
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] md:h-[60vh] text-white">
        <Image
          src={heroMainImage}
          alt="A majestic view of the Zimbabwe landscape at sunrise."
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative h-full flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-7xl font-headline text-accent mb-4 tracking-wider">
            A Legacy of Progress
          </h1>
          <p className="max-w-3xl text-md md:text-xl font-body text-background/90">
            Discover the enduring legacy of Zimbabwe's leadership. Explore the history, achievements, and timeline of the President and his party.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-lg">
            <Link href="#features">
              Explore the Archive <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-headline text-primary mb-2">The ZimArchive</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive collection of historical records, achievements, and visual media documenting Zimbabwe's political journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {featureCardsData.map((feature) => {
              const featureImage = feature.imageId === 'hero-achievements' 
                ? { imageUrl: trabyImage, altText: "Modern infrastructure project.", imageHint: "modern infrastructure" }
                : images?.find(img => img.id === feature.imageId);
              
              return (
                <Link href={feature.href} key={feature.title} className="group">
                  <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 border-primary/20">
                    <CardHeader className="p-0">
                      {featureImage && (
                        <div className="relative w-full h-48">
                          <Image
                            src={featureImage.imageUrl}
                            alt={featureImage.altText}
                            fill
                            className="object-cover"
                            data-ai-hint={featureImage.imageHint}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-primary/10 rounded-full mr-4">
                          {feature.icon}
                        </div>
                        <CardTitle className="font-headline text-2xl text-primary">{feature.title}</CardTitle>
                      </div>
                      <p className="text-muted-foreground font-body">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
