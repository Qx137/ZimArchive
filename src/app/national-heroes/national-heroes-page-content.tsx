"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  ChevronRight,
  GraduationCap,
  MapPin,
  Search,
  Shield,
  User,
  X,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal } from "@/components/ui/reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { heroesData, Hero } from "@/data/heroes";
import matemadandaImage from "@/img/matemadanda.png";
import QRCode from "react-qr-code";
import { useRouter, useSearchParams } from "next/navigation";
import { getSiteUrl } from "@/lib/site-url";

export default function NationalHeroesPageContent() {
  const [selectedHero, setSelectedHero] = useState<Hero>(heroesData[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const filteredHeroes = heroesData.filter(
    (hero) =>
      hero.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hero.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const heroParam = searchParams?.get?.("hero");
    if (heroParam) {
      const found = heroesData.find((h) => h.id === heroParam);
      if (found) setSelectedHero(found);
    }
  }, [searchParams]);

  useEffect(() => {
    const base = getSiteUrl(typeof window !== "undefined" ? window.location.origin : undefined);
    if (selectedHero) {
      setProfileUrl(`${base.replace(/\/$/, "")}/national-heroes/${selectedHero.id}`);
    }
  }, [selectedHero]);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] via-[hsl(var(--destructive))] to-[hsl(var(--secondary))] py-16 text-primary-foreground shadow-inner md:py-24">
        <div className="absolute inset-0 bg-black/30 mix-blend-overlay" />
        {/* slow light sweep */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent motion-safe:animate-[sheen_7s_ease-in-out_infinite]"
        />
        <div className="container relative z-10 mx-auto px-4">
          <div className="glass-on-color mx-auto max-w-3xl rounded-3xl px-6 py-10 text-center md:px-12 md:py-12">
            <h1 className="mb-4 font-headline text-4xl font-semibold tracking-tight text-white md:text-6xl">
              National Heroes of Zimbabwe
            </h1>
            <p className="mx-auto max-w-2xl font-body text-md leading-relaxed text-primary-foreground/90 md:text-xl">
              Honoring the brave patriots, diplomats, and leaders who fought, served, and dedicated their lives to securing Zimbabwe&apos;s sovereignty and shaping its future.
            </p>
            <span className="glass-on-color mt-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-ui text-xs font-semibold uppercase tracking-[0.2em]">
              <User className="h-3.5 w-3.5" />
              {heroesData.length} archived {heroesData.length === 1 ? "profile" : "profiles"}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Left Sidebar: Hero Selection List */}
          <div className="space-y-6 lg:col-span-1">
            <Reveal direction="right" className="lg:sticky lg:top-28">
              <Card className="border-primary/20">
                <CardHeader className="pb-4">
                  <CardTitle className="font-headline text-xl text-primary">Archived Heroes</CardTitle>
                  <CardDescription className="font-body">Search or select a profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-muted-foreground" />
                    <Input
                      placeholder="Search heroes..."
                      aria-label="Search heroes"
                      className="border-primary/20 bg-white/50 pl-9 pr-9 backdrop-blur-md transition-shadow focus-visible:ring-primary dark:bg-white/5"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        aria-label="Clear search"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition hover:bg-primary/10 hover:text-primary active:scale-90"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  {searchQuery && (
                    <p className="text-xs text-muted-foreground" aria-live="polite">
                      {filteredHeroes.length} {filteredHeroes.length === 1 ? "match" : "matches"}
                    </p>
                  )}

                  {/* Heroes List */}
                  <div className="scrollbar-thin max-h-[400px] space-y-2 overflow-y-auto pr-1">
                    {filteredHeroes.length > 0 ? (
                      filteredHeroes.map((hero) => {
                        const active = selectedHero.id === hero.id;
                        return (
                          <button
                            key={hero.id}
                            onClick={() => {
                              setSelectedHero(hero);
                              router.push(`/national-heroes/${hero.id}`);
                            }}
                            aria-current={active ? "true" : undefined}
                            className={`group relative flex w-full items-center justify-between overflow-hidden rounded-xl border p-3 text-left transition-all duration-300 active:scale-[0.98] ${
                              active
                                ? "border-primary/60 bg-primary/10 text-primary shadow-md shadow-primary/10"
                                : "border-transparent text-muted-foreground hover:border-white/60 hover:bg-white/50 hover:text-foreground hover:shadow-md"
                            }`}
                          >
                            <span
                              aria-hidden
                              className={`absolute inset-y-2 left-0 w-1 rounded-r-full bg-accent transition-transform duration-300 ${
                                active ? "scale-y-100" : "scale-y-0 group-hover:scale-y-50"
                              }`}
                            />
                            <div className="flex items-center space-x-3">
                              <div
                                className={`rounded-full p-1.5 transition-colors duration-300 ${
                                  active
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground group-hover:bg-primary/20"
                                }`}
                              >
                                <User className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-ui text-sm font-semibold">{hero.fullName}</p>
                                <p className="max-w-[150px] truncate text-xs text-muted-foreground">{hero.summary}</p>
                              </div>
                            </div>
                            <ChevronRight
                              className={`h-4 w-4 transition-transform duration-300 ${
                                active
                                  ? "translate-x-1 text-primary"
                                  : "text-muted-foreground/50 group-hover:translate-x-1"
                              }`}
                            />
                          </button>
                        );
                      })
                    ) : (
                      <p className="py-4 text-center text-sm text-muted-foreground">No profiles found.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>

          {/* Right Area: Hero Details */}
          <div className="lg:col-span-3">
            {selectedHero ? (
              <div
                key={selectedHero.id}
                className="space-y-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
              >
                {/* Hero Summary Card */}
                <Card className="group overflow-hidden border-primary/20">
                  {/* Decorative Banner */}
                  <div className="h-3 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] via-[hsl(var(--destructive))] to-[hsl(var(--secondary))]" />

                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col items-start gap-8 md:flex-row">
                      {/* Image section */}
                      <div className="relative aspect-[3/4] w-full flex-shrink-0 overflow-hidden rounded-2xl border border-white/60 bg-muted shadow-xl shadow-primary/15 md:w-56">
                        <Image
                          src={matemadandaImage}
                          alt={`Artistic portrait of Cde ${selectedHero.fullName}`}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          priority
                          sizes="(max-width: 768px) 100vw, 224px"
                        />
                        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                      </div>

                      {/* Bio Title Section */}
                      <div className="flex-grow space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className="bg-primary font-ui text-xs font-bold tracking-wider text-primary-foreground hover:bg-primary/90">
                            LIBERATION FIGHTER
                          </Badge>
                          <Badge variant="outline" className="border-accent font-ui text-xs font-bold tracking-wider text-accent">
                            DIPLOMAT
                          </Badge>
                        </div>

                        <div>
                          <h2 className="font-headline text-3xl font-semibold tracking-tight text-primary md:text-4xl">
                            Cde {selectedHero.fullName}
                          </h2>
                          <p className="mt-1 font-body text-sm text-muted-foreground">
                            {selectedHero.birthDate} – {selectedHero.deathDate || "Present"}
                          </p>
                        </div>

                        <p className="rounded-r-xl border-l-4 border-accent bg-white/30 py-2 pl-4 pr-3 font-body text-base italic leading-relaxed text-muted-foreground backdrop-blur-sm">
                          &quot;{selectedHero.summary}&quot;
                        </p>

                        {/* Quick details tags */}
                        <div className="grid grid-cols-1 gap-3 pt-2 font-body text-sm text-muted-foreground md:grid-cols-2">
                          {[
                            { icon: MapPin, text: `Origin: ${selectedHero.placeOfOrigin}` },
                            { icon: Briefcase, text: `Residence: ${selectedHero.residence}` },
                            { icon: User, text: `Family: ${selectedHero.maritalStatus}, ${selectedHero.children}` },
                            { icon: Shield, text: "Military: ZANLA (1973)" },
                          ].map(({ icon: Icon, text }) => (
                            <div
                              key={text}
                              className="flex items-center space-x-2 rounded-lg border border-transparent px-2 py-1.5 transition-colors duration-300 hover:border-white/60 hover:bg-white/40"
                            >
                              <Icon className="h-4 w-4 shrink-0 text-primary" />
                              <span>{text}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* QR Code Column */}
                      <div className="flex w-full flex-shrink-0 items-start md:w-40 md:items-center">
                        <div className="glass w-full rounded-2xl p-3 text-center transition-transform duration-500 hover:scale-105 hover:-rotate-1">
                          {profileUrl ? (
                            <>
                              <div className="mx-auto h-32 w-32 rounded-lg bg-white p-1.5">
                                <QRCode value={profileUrl} size={128} style={{ height: "auto", width: "100%" }} />
                              </div>
                              <p className="mt-2 break-words text-xs text-muted-foreground">Scan to open profile</p>
                            </>
                          ) : (
                            <p className="text-sm text-muted-foreground">Preparing QR…</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tabs Section */}
                <Tabs defaultValue="biography" className="w-full">
                  <TabsList className="grid h-auto w-full grid-cols-3 rounded-xl p-1.5">
                    <TabsTrigger
                      value="biography"
                      className="py-2.5 font-headline text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 md:text-base"
                    >
                      <BookOpen className="mr-2 hidden h-4 w-4 sm:inline" /> Biography
                    </TabsTrigger>
                    <TabsTrigger
                      value="timeline"
                      className="py-2.5 font-headline text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 md:text-base"
                    >
                      <Calendar className="mr-2 hidden h-4 w-4 sm:inline" /> Timeline
                    </TabsTrigger>
                    <TabsTrigger
                      value="credentials"
                      className="py-2.5 font-headline text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 md:text-base"
                    >
                      <Award className="mr-2 hidden h-4 w-4 sm:inline" /> Credentials
                    </TabsTrigger>
                  </TabsList>

                  {/* Biography Tab */}
                  <TabsContent value="biography" className="mt-6">
                    <Card className="border-primary/20">
                      <CardHeader>
                        <CardTitle className="font-headline text-2xl text-primary">Biographical Narrative</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6 font-body text-base leading-relaxed text-muted-foreground">
                        {selectedHero.narrative.map((paragraph, index) => {
                          const isQuote = paragraph.startsWith('"') || paragraph.startsWith("“");
                          return (
                            <Reveal key={index} delay={Math.min(index, 3) * 60}>
                              <p
                                className={`text-justify ${
                                  isQuote
                                    ? "rounded-r-xl border-l-4 border-primary bg-primary/5 py-2 pl-4 text-lg font-semibold italic text-primary"
                                    : ""
                                }`}
                              >
                                {paragraph}
                              </p>
                            </Reveal>
                          );
                        })}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Timeline Tab */}
                  <TabsContent value="timeline" className="mt-6">
                    <Card className="border-primary/20">
                      <CardHeader>
                        <CardTitle className="font-headline text-2xl text-primary">Service &amp; Career Milestones</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 md:p-8">
                        <div className="relative ml-4 space-y-8 border-l-2 border-primary/30 md:ml-6">
                          {selectedHero.timeline.map((milestone, index) => (
                            <Reveal key={index} direction="right" delay={Math.min(index, 4) * 70}>
                              <div className="group relative pl-6 md:pl-8">
                                {/* Dot marker */}
                                <div className="absolute -left-[9px] top-1.5 z-10 h-4 w-4 rounded-full border-2 border-primary bg-background transition-all duration-300 group-hover:scale-125 group-hover:bg-primary group-hover:shadow-[0_0_0_4px_hsl(var(--primary)/0.2)]" />

                                <div className="space-y-1 rounded-xl p-2 transition-colors duration-300 group-hover:bg-white/40">
                                  <span className="mb-1 inline-block rounded-full bg-accent px-2.5 py-0.5 font-ui text-xs font-bold tracking-wider text-accent-foreground">
                                    {milestone.year}
                                  </span>
                                  <h4 className="font-headline text-lg font-semibold text-primary">{milestone.title}</h4>
                                  <p className="font-body text-sm leading-relaxed text-muted-foreground">
                                    {milestone.description}
                                  </p>
                                </div>
                              </div>
                            </Reveal>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Credentials Tab */}
                  <TabsContent value="credentials" className="mt-6">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                      {/* Education Card */}
                      <SpotlightCard className="border-primary/20">
                        <CardHeader className="flex flex-row items-center space-x-3 pb-3">
                          <div className="rounded-xl bg-primary/10 p-2 text-primary">
                            <GraduationCap className="h-6 w-6" />
                          </div>
                          <CardTitle className="font-headline text-xl text-primary">Education</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3 font-body text-sm text-muted-foreground">
                            {selectedHero.education.map((edu, idx) => (
                              <li key={idx} className="flex items-start space-x-2">
                                <span className="mt-1 font-bold text-primary">•</span>
                                <span>{edu}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </SpotlightCard>

                      {/* Military & Liberation War Card */}
                      <SpotlightCard className="border-primary/20">
                        <CardHeader className="flex flex-row items-center space-x-3 pb-3">
                          <div className="rounded-xl bg-destructive/10 p-2 text-destructive">
                            <Shield className="h-6 w-6" />
                          </div>
                          <CardTitle className="font-headline text-xl text-destructive">Military Service</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3 font-body text-sm text-muted-foreground">
                            {selectedHero.militaryService.map((mil, idx) => (
                              <li key={idx} className="flex items-start space-x-2">
                                <span className="mt-1 font-bold text-destructive">•</span>
                                <span>{mil}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </SpotlightCard>

                      {/* Political & Diplomatic Career Card (Spans full width on desktop) */}
                      <SpotlightCard className="border-primary/20 md:col-span-2">
                        <CardHeader className="flex flex-row items-center space-x-3 pb-3">
                          <div className="rounded-xl bg-accent/10 p-2 text-accent-foreground">
                            <Briefcase className="h-6 w-6" />
                          </div>
                          <CardTitle className="font-headline text-xl text-primary">Political &amp; Diplomatic Career</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="grid grid-cols-1 gap-4 font-body text-sm text-muted-foreground md:grid-cols-2">
                            {selectedHero.politicalCareer.map((pol, idx) => (
                              <li
                                key={idx}
                                className="flex items-start space-x-2 rounded-xl border border-white/50 bg-white/30 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-white/60 hover:shadow-md"
                              >
                                <span className="mr-1 font-bold text-primary">✓</span>
                                <span>{pol}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </SpotlightCard>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <User className="mb-4 h-16 w-16 stroke-1" />
                <p>Select a hero from the list to view their profile.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
