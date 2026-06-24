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
  User 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { heroesData, Hero } from "@/data/heroes";
import matemadandaImage from "@/img/matemadanda.png";
import QRCode from "react-qr-code";
import { useRouter, useSearchParams } from "next/navigation";

export default function NationalHeroesPage() {
  const [selectedHero, setSelectedHero] = useState<Hero>(heroesData[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const filteredHeroes = heroesData.filter(hero => 
    hero.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hero.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const heroParam = searchParams?.get?.("hero");
    if (heroParam) {
      const found = heroesData.find(h => h.id === heroParam);
      if (found) setSelectedHero(found);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "https://zimarchive.netlify.app");
    if (selectedHero) {
      setProfileUrl(`${base.replace(/\/$/, "")}/national-heroes/${selectedHero.id}`);
    }
  }, [selectedHero]);

  return (
    <div className="bg-background min-h-screen">
      {/* Page Header */}
      <section className="relative bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] via-[hsl(var(--destructive))] to-[hsl(var(--secondary))] py-16 md:py-24 text-primary-foreground shadow-inner">
        <div className="absolute inset-0 bg-black/30 mix-blend-overlay" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-headline tracking-wide text-white mb-4">
            National Heroes of Zimbabwe
          </h1>
          <p className="text-md md:text-xl font-body max-w-2xl mx-auto text-primary-foreground/90 leading-relaxed">
            Honoring the brave patriots, diplomats, and leaders who fought, served, and dedicated their lives to securing Zimbabwe's sovereignty and shaping its future.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar: Hero Selection List */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-primary/20 shadow-md">
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
                    className="pl-9 border-primary/20 focus-visible:ring-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Heroes List */}
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                  {filteredHeroes.length > 0 ? (
                    filteredHeroes.map((hero) => (
                      <button
                        key={hero.id}
                        onClick={() => {
                          setSelectedHero(hero);
                          router.push(`/national-heroes/${hero.id}`);
                        }}
                        className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between group ${
                          selectedHero.id === hero.id
                            ? "bg-primary/10 border-primary text-primary"
                            : "border-transparent hover:bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-1.5 rounded-full ${
                            selectedHero.id === hero.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/20"
                          }`}>
                            <User className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm font-headline tracking-wide">{hero.fullName}</p>
                            <p className="text-xs text-muted-foreground truncate max-w-[150px]">{hero.summary}</p>
                          </div>
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${
                          selectedHero.id === hero.id ? "translate-x-1 text-primary" : "text-muted-foreground/50 group-hover:translate-x-1"
                        }`} />
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">No profiles found.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Area: Hero Details */}
          <div className="lg:col-span-3">
            {selectedHero ? (
              <div className="space-y-8 animate-in fade-in duration-300">
                {/* Hero Summary Card */}
                <Card className="overflow-hidden border-primary/20 shadow-lg">
                  {/* Decorative Banner */}
                  <div className="h-3 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] via-[hsl(var(--destructive))] to-[hsl(var(--secondary))]" />
                  
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      {/* Image section */}
                      <div className="relative w-full md:w-56 aspect-[3/4] rounded-xl overflow-hidden border border-primary/20 shadow-md flex-shrink-0 bg-muted">
                        <Image
                          src={matemadandaImage}
                          alt={`Artistic portrait of Cde ${selectedHero.fullName}`}
                          fill
                          className="object-cover"
                          priority
                          sizes="(max-width: 768px) 100vw, 224px"
                        />
                      </div>

                      {/* Bio Title Section */}
                      <div className="flex-grow space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground font-headline font-semibold text-xs tracking-wider">
                            LIBERATION FIGHTER
                          </Badge>
                          <Badge variant="outline" className="border-accent text-accent font-headline font-semibold text-xs tracking-wider">
                            DIPLOMAT
                          </Badge>
                        </div>
                        
                        <div>
                          <h2 className="text-3xl md:text-4xl font-headline text-primary font-bold">
                            Cde {selectedHero.fullName}
                          </h2>
                          <p className="text-sm text-muted-foreground font-body mt-1">
                            {selectedHero.birthDate} – {selectedHero.deathDate || "Present"}
                          </p>
                        </div>

                        <p className="font-body text-base text-muted-foreground leading-relaxed italic border-l-4 border-accent pl-4 py-1">
                          "{selectedHero.summary}"
                        </p>

                        {/* Quick details tags */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-sm font-body text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-primary shrink-0" />
                            <span>Origin: {selectedHero.placeOfOrigin}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Briefcase className="h-4 w-4 text-primary shrink-0" />
                            <span>Residence: {selectedHero.residence}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-primary shrink-0" />
                            <span>Family: {selectedHero.maritalStatus}, {selectedHero.children}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4 text-primary shrink-0" />
                            <span>Military: ZANLA (1973)</span>
                          </div>
                        </div>
                      </div>

                      {/* QR Code Column */}
                      <div className="w-full md:w-40 flex-shrink-0 flex items-start md:items-center">
                        <div className="p-3 bg-muted rounded-lg border border-primary/10 shadow-sm w-full text-center">
                          {profileUrl ? (
                            <>
                              <div className="mx-auto w-32 h-32">
                                <QRCode value={profileUrl} size={128} />
                              </div>
                              <p className="text-xs text-muted-foreground mt-2 break-words">Scan to open profile</p>
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
                  <TabsList className="grid w-full grid-cols-3 bg-primary/10 p-1.5 h-auto rounded-lg">
                    <TabsTrigger value="biography" className="py-2.5 font-headline font-semibold text-sm md:text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <BookOpen className="w-4 h-4 mr-2 hidden sm:inline" /> Biography
                    </TabsTrigger>
                    <TabsTrigger value="timeline" className="py-2.5 font-headline font-semibold text-sm md:text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <Calendar className="w-4 h-4 mr-2 hidden sm:inline" /> Timeline
                    </TabsTrigger>
                    <TabsTrigger value="credentials" className="py-2.5 font-headline font-semibold text-sm md:text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <Award className="w-4 h-4 mr-2 hidden sm:inline" /> Credentials
                    </TabsTrigger>
                  </TabsList>

                  {/* Biography Tab */}
                  <TabsContent value="biography" className="mt-6">
                    <Card className="border-primary/20 shadow-md">
                      <CardHeader>
                        <CardTitle className="font-headline text-2xl text-primary">Biographical Narrative</CardTitle>
                      </CardHeader>
                      <CardContent className="font-body text-base text-muted-foreground space-y-6 leading-relaxed">
                        {selectedHero.narrative.map((paragraph, index) => {
                          const isQuote = paragraph.startsWith('"') || paragraph.startsWith('“');
                          return (
                            <p 
                              key={index} 
                              className={`text-justify ${
                                isQuote 
                                  ? "text-lg text-primary italic font-semibold border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded-r-lg" 
                                  : ""
                              }`}
                            >
                              {paragraph}
                            </p>
                          );
                        })}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Timeline Tab */}
                  <TabsContent value="timeline" className="mt-6">
                    <Card className="border-primary/20 shadow-md">
                      <CardHeader>
                        <CardTitle className="font-headline text-2xl text-primary">Service & Career Milestones</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 md:p-8">
                        <div className="relative border-l-2 border-primary/30 ml-4 md:ml-6 space-y-8">
                          {selectedHero.timeline.map((milestone, index) => (
                            <div key={index} className="relative pl-6 md:pl-8 group">
                              {/* Dot marker */}
                              <div className="absolute -left-[9px] top-1.5 z-10 bg-background border-2 border-primary w-4.5 h-4.5 rounded-full group-hover:bg-primary transition-colors duration-300" />
                              
                              <div className="space-y-1">
                                <span className="inline-block px-2.5 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-bold font-headline tracking-wider mb-1">
                                  {milestone.year}
                                </span>
                                <h4 className="text-lg font-headline font-bold text-primary">
                                  {milestone.title}
                                </h4>
                                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                                  {milestone.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Credentials Tab */}
                  <TabsContent value="credentials" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Education Card */}
                      <Card className="border-primary/20 shadow-md">
                        <CardHeader className="flex flex-row items-center space-x-3 pb-3">
                          <div className="p-2 bg-primary/10 text-primary rounded-lg">
                            <GraduationCap className="h-6 w-6" />
                          </div>
                          <CardTitle className="font-headline text-xl text-primary">Education</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3 font-body text-muted-foreground text-sm">
                            {selectedHero.education.map((edu, idx) => (
                              <li key={idx} className="flex items-start space-x-2">
                                <span className="text-primary mt-1 font-bold">•</span>
                                <span>{edu}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Military & Liberation War Card */}
                      <Card className="border-primary/20 shadow-md">
                        <CardHeader className="flex flex-row items-center space-x-3 pb-3">
                          <div className="p-2 bg-destructive/10 text-destructive rounded-lg">
                            <Shield className="h-6 w-6" />
                          </div>
                          <CardTitle className="font-headline text-xl text-destructive">Military Service</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3 font-body text-muted-foreground text-sm">
                            {selectedHero.militaryService.map((mil, idx) => (
                              <li key={idx} className="flex items-start space-x-2">
                                <span className="text-destructive mt-1 font-bold">•</span>
                                <span>{mil}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Political & Diplomatic Career Card (Spans full width on desktop) */}
                      <Card className="border-primary/20 shadow-md md:col-span-2">
                        <CardHeader className="flex flex-row items-center space-x-3 pb-3">
                          <div className="p-2 bg-accent/10 text-accent-foreground rounded-lg">
                            <Briefcase className="h-6 w-6" />
                          </div>
                          <CardTitle className="font-headline text-xl text-primary">Political & Diplomatic Career</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 font-body text-muted-foreground text-sm">
                            {selectedHero.politicalCareer.map((pol, idx) => (
                              <li key={idx} className="flex items-start space-x-2 bg-muted/30 p-3 rounded-lg border border-primary/5 hover:border-primary/25 transition-all">
                                <span className="text-primary font-bold mr-1">✓</span>
                                <span>{pol}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <User className="h-16 w-16 mb-4 stroke-1" />
                <p>Select a hero from the list to view their profile.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
