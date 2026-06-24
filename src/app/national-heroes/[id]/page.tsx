import Image from "next/image";
import {
  Calendar,
  GraduationCap,
  MapPin,
  Briefcase,
  Shield,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import QRCode from "react-qr-code";
import { heroesData } from "@/data/heroes";
import matemadandaImage from "@/img/matemadanda.png";

interface Props {
  params: { id: string };
}

export default function Page({ params }: Props) {
  const { id } = params;
  const hero = heroesData.find((h) => h.id === id);
  if (!hero) {
    return (
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-headline">Hero not found</h2>
        <p className="text-muted-foreground mt-2">No profile matches the requested identifier.</p>
      </div>
    );
  }

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://zimarchive.netlify.app";
  const canonical = `${base.replace(/\/$/, "")}/national-heroes/${hero.id}`;

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden border-primary/20 shadow-lg">
          <div className="h-3 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--secondary))]" />
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="relative w-full md:w-56 aspect-[3/4] rounded-xl overflow-hidden border border-primary/20 shadow-md flex-shrink-0 bg-muted">
                <Image src={matemadandaImage} alt={hero.fullName} fill className="object-cover" />
              </div>

              <div className="flex-grow space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-primary text-primary-foreground text-xs">LIBERATION FIGHTER</Badge>
                  <Badge variant="outline" className="border-accent text-accent text-xs">DIPLOMAT</Badge>
                </div>

                <div>
                  <h2 className="text-3xl font-headline text-primary">Cde {hero.fullName}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{hero.birthDate} – {hero.deathDate || 'Present'}</p>
                </div>

                <p className="font-body text-base text-muted-foreground leading-relaxed italic border-l-4 border-accent pl-4 py-1">"{hero.summary}"</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2"><MapPin className="h-4 w-4 text-primary" /><span>Origin: {hero.placeOfOrigin}</span></div>
                  <div className="flex items-center space-x-2"><Briefcase className="h-4 w-4 text-primary" /><span>Residence: {hero.residence}</span></div>
                  <div className="flex items-center space-x-2"><User className="h-4 w-4 text-primary" /><span>Family: {hero.maritalStatus}, {hero.children}</span></div>
                  <div className="flex items-center space-x-2"><Shield className="h-4 w-4 text-primary" /><span>Military: ZANLA (1973)</span></div>
                </div>
              </div>

              <div className="w-full md:w-40 flex-shrink-0 flex items-start md:items-center">
                <div className="p-3 bg-muted rounded-lg border border-primary/10 shadow-sm w-full text-center">
                  <div className="mx-auto w-32 h-32">
                    <QRCode value={canonical} size={128} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 break-words">{canonical}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Biographical Narrative</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              {hero.narrative.map((p, i) => (
                <p key={i} className="text-justify">{p}</p>
              ))}
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Service & Career Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {hero.timeline.map((t, i) => (
                  <li key={i} className="font-body text-muted-foreground">
                    <strong className="text-primary mr-2">{t.year}</strong>{t.title} — {t.description}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
