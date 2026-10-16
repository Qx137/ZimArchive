import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  GalleryHorizontal,
  Landmark,
  Presentation,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardTitle } from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal } from "@/components/ui/reveal";
import heroMainImage from "@/img/hero-main.jpg";

const sections: { title: string; description: string; href: string; icon: LucideIcon }[] = [
  {
    title: "Presidential Timeline",
    description: "Follow the President's journey, from early life to key career milestones.",
    href: "/timeline",
    icon: Presentation,
  },
  {
    title: "Key Achievements",
    description:
      "Explore the transformative initiatives and progress across various sectors, including the Mbudzi interchange.",
    href: "/achievements",
    icon: Landmark,
  },
  {
    title: "Image Gallery",
    description: "A visual journey through significant moments and events.",
    href: "/gallery",
    icon: GalleryHorizontal,
  },
  {
    title: "National Heroes",
    description:
      "Profiles of the heroes who shaped the nation through service, sacrifice, and leadership.",
    href: "/national-heroes",
    icon: ShieldCheck,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative h-[70vh] w-full text-white md:h-[60vh]">
        <Image
          src={heroMainImage}
          alt="A majestic view of the Zimbabwe landscape at sunrise."
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative flex h-full flex-col items-center justify-center p-4 text-center">
          <Reveal>
            <h1 className="mb-4 font-headline text-4xl font-semibold tracking-wider text-accent md:text-7xl">
              A Legacy of Progress
            </h1>
            <p className="mx-auto max-w-3xl text-balance text-md text-background/90 md:text-xl">
              Discover the enduring legacy of Zimbabwe&apos;s leadership. Explore the history,
              achievements, and timeline of the President and his party.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-accent text-lg font-bold text-accent-foreground hover:bg-accent/90"
            >
              <Link href="#explore">
                Explore the Archive <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section id="explore" className="scroll-mt-24 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Reveal className="mb-12 text-center">
            <h2 className="mb-2 font-headline text-4xl font-semibold text-primary md:text-5xl">
              The ZimArchive
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              A comprehensive collection of historical records, achievements, and visual media
              documenting Zimbabwe&apos;s political journey.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {sections.map(({ title, description, href, icon: Icon }, index) => (
              <Reveal key={href} delay={index * 80}>
                <Link href={href} className="group block h-full">
                  <SpotlightCard className="h-full">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center">
                        <div className="mr-4 rounded-full bg-primary/10 p-3">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-2xl text-primary">{title}</CardTitle>
                      </div>
                      <p className="text-muted-foreground">{description}</p>
                      <span className="mt-4 inline-flex items-center gap-1 font-ui text-sm font-semibold text-primary">
                        Open
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </CardContent>
                  </SpotlightCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
