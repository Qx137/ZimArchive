import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Shield,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import QRCode from "react-qr-code";
import { heroesData } from "@/data/heroes";
import matemadandaImage from "@/img/matemadanda.png";
import { getSiteUrl } from "@/lib/site-url";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const hero = heroesData.find((h) => h.id === id);
  if (!hero) {
    return (
      <div className="container mx-auto p-8">
        <Card className="mx-auto max-w-lg p-8 text-center">
          <h2 className="font-headline text-2xl text-primary">Hero not found</h2>
          <p className="mt-2 text-muted-foreground">No profile matches the requested identifier.</p>
          <Link
            href="/timeline"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to the archive
          </Link>
        </Card>
      </div>
    );
  }

  const base = getSiteUrl();
  const canonical = `${base.replace(/\/$/, "")}/national-heroes/${hero.id}`;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Reveal>
          <Card className="group overflow-hidden border-primary/20">
            <div className="h-3 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--secondary))]" />
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col items-start gap-8 md:flex-row">
                <div className="relative aspect-[3/4] w-full flex-shrink-0 overflow-hidden rounded-2xl border border-white/60 bg-muted shadow-xl shadow-primary/15 md:w-56">
                  <Image
                    src={matemadandaImage}
                    alt={hero.fullName}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                </div>

                <div className="flex-grow space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-primary text-xs text-primary-foreground">LIBERATION FIGHTER</Badge>
                    <Badge variant="outline" className="border-accent text-xs text-accent">DIPLOMAT</Badge>
                  </div>

                  <div>
                    <h2 className="font-headline text-3xl font-semibold tracking-tight text-primary">Cde {hero.fullName}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{hero.birthDate} – {hero.deathDate || 'Present'}</p>
                  </div>

                  <p className="rounded-r-xl border-l-4 border-accent bg-white/30 py-2 pl-4 pr-3 font-body text-base italic leading-relaxed text-muted-foreground backdrop-blur-sm">
                    &quot;{hero.summary}&quot;
                  </p>

                  <div className="grid grid-cols-1 gap-3 pt-2 text-sm text-muted-foreground md:grid-cols-2">
                    {[
                      { icon: MapPin, text: `Origin: ${hero.placeOfOrigin}` },
                      { icon: Briefcase, text: `Residence: ${hero.residence}` },
                      { icon: User, text: `Family: ${hero.maritalStatus}, ${hero.children}` },
                      { icon: Shield, text: "Military: ZANLA (1973)" },
                    ].map(({ icon: Icon, text }) => (
                      <div
                        key={text}
                        className="flex items-center space-x-2 rounded-lg border border-transparent px-2 py-1.5 transition-colors duration-300 hover:border-white/60 hover:bg-white/40"
                      >
                        <Icon className="h-4 w-4 text-primary" />
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex w-full flex-shrink-0 items-start md:w-40 md:items-center">
                  <div className="glass w-full rounded-2xl p-3 text-center transition-transform duration-500 hover:scale-105 hover:-rotate-1">
                    <div className="mx-auto h-32 w-32 rounded-lg bg-white p-1.5">
                      <QRCode value={canonical} size={128} style={{ height: "auto", width: "100%" }} />
                    </div>
                    <p className="mt-2 break-words text-xs text-muted-foreground">{canonical}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal delay={80} className="h-full">
            <Card className="h-full border-primary/20">
              <CardHeader>
                <CardTitle className="font-headline text-primary">Biographical Narrative</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                {hero.narrative.map((p, i) => (
                  <p key={i} className="text-justify">{p}</p>
                ))}
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={160} className="h-full">
            <Card className="h-full border-primary/20">
              <CardHeader>
                <CardTitle className="font-headline text-primary">Service &amp; Career Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {hero.timeline.map((t, i) => (
                    <li
                      key={i}
                      className="rounded-xl border border-transparent p-2 font-body text-muted-foreground transition-colors duration-300 hover:border-white/60 hover:bg-white/40"
                    >
                      <strong className="mr-2 text-primary">{t.year}</strong>{t.title} — {t.description}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
