"use client";

import { useEffect, useRef } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { useImages } from "@/hooks/use-images";
import { useInView } from "@/hooks/use-in-view";
import Image from "next/image";

const timelineData = [
  {
    year: "1942-1950s",
    title: "Birth and Early Life",
    description: "Born in Zvishavane on September 15, 1942. His family later relocated to Zambia in the 1950s under pressure from colonial rule.",
    imageId: "timeline-1",
    imagePosition: "50% 10%",
  },
  {
    year: "1960s",
    title: "Political Activism & Liberation Struggle",
    description: "Joined the nationalist movement, received military training abroad, and was arrested for sabotage. His death sentence was commuted, and he served 10 years in prison.",
    imageId: "timeline-2",
  },
  {
    year: "1977",
    title: "Rise in ZANU",
    description: "Appointed by Robert Mugabe as Head of Civil and Military Affairs for ZANU, becoming a key strategist in the liberation war.",
    imageId: "timeline-3",
    imagePosition: "50% 0%",
  },
  {
    year: "1980-2013",
    title: "Senior Government Minister",
    description: "After Zimbabwe's independence in 1980, he held several senior cabinet posts, including Minister of State Security, Minister of Justice, and Minister of Defence.",
    imageId: "timeline-4",
  },
  {
    year: "2014",
    title: "First Vice President",
    description: "Appointed as First Vice President of Zimbabwe, positioning him as a potential successor to President Mugabe.",
    imageId: "timeline-5",
    imagePosition: "50% 25%",
  },
  {
    year: "2017",
    title: "Inauguration as President",
    description: "After a brief period of exile, he returned to Zimbabwe and was sworn in as the second Executive President on November 24, 2017, following the resignation of Robert Mugabe.",
    imageId: "timeline-6",
    imagePosition: "50% 20%",
  },
  {
    year: "2018",
    title: "First Election Victory",
    description: "Won the 2018 presidential election and launched the 'Second Republic,' focusing on economic reform. He also survived a grenade attack during a rally in Bulawayo.",
    imageId: "timeline-7",
  },
  {
    year: "2023-Present",
    title: "Re-Election and Second Term",
    description: "Re-elected in August 2023, he continues to lead with Vision 2030. His presidency focuses on economic development but faces criticism over human rights and governance.",
    imageId: "timeline-8",
  },
];

function TimelineNode({ index }: { index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.6, rootMargin: "0px 0px -20% 0px" });

  return (
    <div ref={ref} className="relative flex h-10 w-10 items-center justify-center md:h-12 md:w-12">
      {inView && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-accent/60 motion-safe:animate-[ring-out_1.3s_ease-out_1]"
        />
      )}
      <span
        className={cn(
          "relative z-10 flex h-full w-full items-center justify-center rounded-full border font-ui text-sm font-bold tabular-nums transition-all duration-700 md:text-lg",
          inView
            ? "scale-100 border-white/60 bg-accent text-accent-foreground shadow-xl shadow-accent/40"
            : "glass-strong scale-90 text-muted-foreground"
        )}
      >
        {index + 1}
      </span>
    </div>
  );
}

export default function TimelinePage() {
  const { images } = useImages();
  const railRef = useRef<HTMLDivElement>(null);

  // Fill the centre line as the reader scrolls through the timeline.
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const reached = window.innerHeight * 0.6 - rect.top;
      const pct = Math.min(Math.max(reached / rect.height, 0), 1) * 100;
      el.style.setProperty("--tl-progress", `${pct}%`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <PageHeader
          eyebrow="1942 – Present"
          title="Presidential Timeline"
          description="A chronological journey through the life, career, and key moments of the President of Zimbabwe."
        />

        <div ref={railRef} className="relative mx-auto max-w-6xl py-4 md:py-10" style={{ ["--tl-progress" as string]: "0%" }}>
          {/* Rail: faint track + a gradient fill that grows with scroll */}
          <div aria-hidden className="absolute bottom-0 left-5 top-0 w-0.5 -translate-x-1/2 rounded-full bg-primary/15 md:left-1/2">
            <div
              className="w-full rounded-full bg-gradient-to-b from-primary via-accent to-destructive"
              style={{ height: "var(--tl-progress)" }}
            />
          </div>

          <ol className="space-y-10 md:space-y-14">
            {timelineData.map((item, index) => {
              const timelineImage = images?.find((img) => img.id === item.imageId);
              const isLeft = index % 2 !== 0;

              return (
                <li
                  key={item.year}
                  className="relative grid grid-cols-[2.5rem_1fr] items-start gap-x-4 md:grid-cols-[1fr_3rem_1fr] md:gap-x-8"
                >
                  <div className="z-10 col-start-1 row-start-1 md:col-start-2">
                    <TimelineNode index={index} />
                  </div>

                  <Reveal
                    direction={isLeft ? "left" : "right"}
                    delay={80}
                    className={cn(
                      "col-start-2 row-start-1 min-w-0",
                      isLeft ? "md:col-start-1" : "md:col-start-3"
                    )}
                  >
                    <SpotlightCard className="group overflow-hidden border-primary/20">
                      {timelineImage ? (
                        <div className="relative h-56 w-full overflow-hidden md:h-64">
                          <Image
                            src={timelineImage.imageUrl}
                            alt={timelineImage.altText}
                            fill
                            sizes="(max-width: 768px) 90vw, 45vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            style={{ objectPosition: item.imagePosition }}
                            data-ai-hint={timelineImage.imageHint}
                          />
                          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                          <span className="glass-on-color absolute bottom-3 left-3 rounded-full px-3 py-1 font-ui text-xs font-semibold tracking-wider text-white">
                            {item.year}
                          </span>
                        </div>
                      ) : (
                        <div className="h-56 w-full animate-pulse bg-muted/60 md:h-64" aria-hidden />
                      )}
                      <CardHeader className="pb-2">
                        <CardTitle className="font-headline text-xl text-primary md:text-2xl">
                          <span className="mr-2 text-accent">{item.year}</span>
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-body leading-relaxed text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </SpotlightCard>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
