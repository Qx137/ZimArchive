import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Award, BookOpen, Calendar, Info } from "lucide-react";
import QRCode from "react-qr-code";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllProfiles, getNeighbours, getProfile, type HeroProfile } from "@/data/hero-profiles";
import { getSiteUrl } from "@/lib/site-url";
import { cn } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getAllProfiles().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const hero = getProfile(id);
  if (!hero) return { title: "Hero not found · ZimArchive" };
  return {
    title: `${hero.honorific} ${hero.name} · ZimArchive`,
    description: hero.summary.length > 200 ? `${hero.summary.slice(0, 197)}…` : hero.summary,
  };
}

function initials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

const toneClasses = {
  primary: { dot: "text-primary", box: "bg-primary/10 text-primary", title: "text-primary" },
  destructive: { dot: "text-destructive", box: "bg-destructive/10 text-destructive", title: "text-destructive" },
  accent: { dot: "text-primary", box: "bg-accent/20 text-accent-foreground", title: "text-primary" },
};

function Neighbour({ hero, dir }: { hero?: HeroProfile; dir: "prev" | "next" }) {
  if (!hero) return <span aria-hidden />;
  const Icon = dir === "prev" ? ArrowLeft : ArrowRight;
  return (
    <Link
      href={`/national-heroes/${hero.id}`}
      className={cn(
        "glass glass-hover group flex items-center gap-3 rounded-2xl p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        dir === "next" && "flex-row-reverse text-right"
      )}
    >
      <Icon className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:[&]:data-[dir=prev]:-translate-x-0.5" />
      <span className="min-w-0">
        <span className="block font-ui text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {dir === "prev" ? "Previous" : "Next"}
        </span>
        <span className="block truncate font-headline text-lg font-semibold text-primary">{hero.name}</span>
      </span>
    </Link>
  );
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const hero = getProfile(id);
  if (!hero) notFound();

  const canonical = `${getSiteUrl().replace(/\/$/, "")}/national-heroes/${hero.id}`;
  const { prev, next } = getNeighbours(hero.id);

  const tabs = [
    hero.narrative.length > 0 && { value: "biography", label: "Biography", icon: BookOpen },
    hero.timeline.length > 0 && { value: "timeline", label: "Timeline", icon: Calendar },
    hero.sections.length > 0 && { value: "credentials", label: "Roles & education", icon: Award },
  ].filter(Boolean) as { value: string; label: string; icon: typeof BookOpen }[];

  return (
    <div className="min-h-screen py-10 md:py-12">
      <div className="container mx-auto px-4">
        <Link
          href="/national-heroes"
          className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-ui text-sm font-medium text-primary transition-colors hover:bg-white/50 hover:text-accent-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All national heroes
        </Link>

        {/* Header card */}
        <Reveal>
          <Card className="group overflow-hidden border-primary/20">
            <div className="h-3 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] via-[hsl(var(--destructive))] to-[hsl(var(--secondary))]" />
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col items-start gap-8 md:flex-row">
                <div className="relative flex aspect-[3/4] w-full flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-br from-primary to-secondary shadow-xl shadow-primary/15 md:w-56">
                  {hero.portrait ? (
                    <>
                      <Image
                        src={hero.portrait}
                        alt={`Portrait of ${hero.honorific} ${hero.name}`}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 224px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                    </>
                  ) : (
                    <span aria-hidden className="font-headline text-7xl font-semibold text-primary-foreground/90 drop-shadow">
                      {initials(hero.name)}
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-grow space-y-4">
                  {hero.badges.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      {hero.badges.map((b, i) => (
                        <Badge
                          key={b}
                          variant={i === 0 ? "default" : "outline"}
                          className={cn(
                            "font-ui text-xs font-bold uppercase tracking-wider",
                            i === 0
                              ? "bg-primary text-primary-foreground hover:bg-primary/90"
                              : "border-accent text-accent-foreground"
                          )}
                        >
                          {b}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div>
                    <p className="font-ui text-xs font-semibold uppercase tracking-[0.2em] text-accent-foreground/70">
                      {hero.honorific}
                    </p>
                    <h1 className="font-headline text-3xl font-semibold tracking-tight text-primary md:text-5xl">
                      {hero.name}
                    </h1>
                    {hero.epithet && (
                      <p className="mt-1 font-body text-lg italic text-muted-foreground">{hero.epithet}</p>
                    )}
                    {hero.lifespan && (
                      <p className="mt-2 inline-block rounded-full bg-accent px-3 py-0.5 font-ui text-sm font-bold tabular-nums text-accent-foreground">
                        {hero.lifespan}
                      </p>
                    )}
                  </div>

                  <p className="rounded-r-xl border-l-4 border-accent bg-white/30 py-2 pl-4 pr-3 font-body text-base leading-relaxed text-muted-foreground backdrop-blur-sm">
                    {hero.summary}
                  </p>

                  {hero.facts.length > 0 && (
                    <dl className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
                      {hero.facts.map((f) => (
                        <div
                          key={f.label}
                          className="rounded-xl border border-white/50 bg-white/30 px-3 py-2 backdrop-blur-sm transition-colors duration-300 hover:border-primary/30 hover:bg-white/60"
                        >
                          <dt className="font-ui text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                            {f.label}
                          </dt>
                          <dd className="font-body text-sm text-foreground/90">{f.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>

                <div className="flex w-full flex-shrink-0 items-start md:w-40 md:items-center">
                  <div className="glass w-full rounded-2xl p-3 text-center transition-transform duration-500 hover:-rotate-1 hover:scale-105">
                    <div className="mx-auto h-32 w-32 rounded-lg bg-white p-1.5">
                      <QRCode value={canonical} size={128} style={{ height: "auto", width: "100%" }} />
                    </div>
                    <p className="mt-2 font-ui text-xs text-muted-foreground">Scan to open profile</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        {hero.partial && (
          <Reveal delay={80} className="mt-6">
            <div
              role="note"
              className="glass flex items-start gap-3 rounded-2xl border-accent/40 p-4 text-sm text-muted-foreground"
            >
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent-foreground" aria-hidden />
              <p>
                Some details in this profile could not be fully confirmed from the source pages and are still being
                reviewed. Dates and places shown here are the ones that could be read clearly.
              </p>
            </div>
          </Reveal>
        )}

        {tabs.length > 0 && (
          <Reveal delay={120} className="mt-8">
            <Tabs defaultValue={tabs[0].value} className="w-full">
              <TabsList
                className="grid h-auto w-full rounded-xl p-1.5"
                style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
              >
                {tabs.map(({ value, label, icon: Icon }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="py-2.5 text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 md:text-base"
                  >
                    <Icon className="mr-2 hidden h-4 w-4 sm:inline" /> {label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {hero.narrative.length > 0 && (
                <TabsContent value="biography" className="mt-6">
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="font-headline text-2xl font-semibold text-primary">
                        Biographical narrative
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 font-body text-base leading-relaxed text-muted-foreground">
                      {hero.narrative.map((paragraph, i) => {
                        const isQuote = paragraph.startsWith('"') || paragraph.startsWith("“");
                        return (
                          <Reveal key={i} delay={Math.min(i, 3) * 60}>
                            <p
                              className={cn(
                                "text-justify",
                                isQuote &&
                                  "rounded-r-xl border-l-4 border-primary bg-primary/5 py-2 pl-4 text-lg font-semibold italic text-primary"
                              )}
                            >
                              {paragraph}
                            </p>
                          </Reveal>
                        );
                      })}
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {hero.timeline.length > 0 && (
                <TabsContent value="timeline" className="mt-6">
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="font-headline text-2xl font-semibold text-primary">
                        Service &amp; career milestones
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 md:p-8">
                      <ol className="relative ml-4 space-y-6 border-l-2 border-primary/30 md:ml-6">
                        {hero.timeline.map((item, i) => (
                          <li key={i}>
                            <Reveal direction="right" delay={Math.min(i, 4) * 60}>
                              <div className="group relative pl-6 md:pl-8">
                                <div className="absolute -left-[9px] top-2 z-10 h-4 w-4 rounded-full border-2 border-primary bg-background transition-all duration-300 group-hover:scale-125 group-hover:bg-primary group-hover:shadow-[0_0_0_4px_hsl(var(--primary)/0.2)]" />
                                <div className="space-y-1 rounded-xl p-2 transition-colors duration-300 group-hover:bg-white/40">
                                  {item.year && (
                                    <span className="mb-1 inline-block rounded-full bg-accent px-2.5 py-0.5 font-ui text-xs font-bold tracking-wider text-accent-foreground">
                                      {item.year}
                                    </span>
                                  )}
                                  {item.label && (
                                    <h3 className="font-headline text-lg font-semibold text-primary">{item.label}</h3>
                                  )}
                                  <p className="font-body text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                                </div>
                              </div>
                            </Reveal>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {hero.sections.length > 0 && (
                <TabsContent value="credentials" className="mt-6">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {hero.sections.map((section, idx) => {
                      const tone = toneClasses[section.tone ?? "primary"];
                      const wide = hero.sections.length % 2 === 1 && idx === hero.sections.length - 1;
                      return (
                        <SpotlightCard key={section.title} className={cn("border-primary/20", wide && "md:col-span-2")}>
                          <CardHeader className="pb-3">
                            <CardTitle className={cn("font-headline text-xl font-semibold", tone.title)}>
                              {section.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className={cn("grid gap-3 font-body text-sm text-muted-foreground", wide && "md:grid-cols-2")}>
                              {section.items.map((item, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 rounded-xl border border-white/50 bg-white/30 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-white/60 hover:shadow-md"
                                >
                                  <span className={cn("mt-0.5 font-bold", tone.dot)}>•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </SpotlightCard>
                      );
                    })}
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </Reveal>
        )}

        {/* Previous / next */}
        {(prev || next) && (
          <Reveal className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Neighbour hero={prev} dir="prev" />
            <Neighbour hero={next} dir="next" />
          </Reveal>
        )}

        <p className="mt-10 text-center font-ui text-xs text-muted-foreground">
          {hero.order > 0
            ? "Profile compiled for ZimArchive from the published guide “A Guide to Heroes Acre”. Summaries are written in our own words."
            : "Profile compiled for ZimArchive."}
        </p>
      </div>
    </div>
  );
}
