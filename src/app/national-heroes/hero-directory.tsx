"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Info, Search, Users, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { HeroListItem } from "@/data/hero-profiles";

type Sort = "book" | "az" | "death";

const SORTS: { value: Sort; label: string }[] = [
  { value: "book", label: "Book order" },
  { value: "az", label: "A – Z" },
  { value: "death", label: "Date of death" },
];

const DECADES = [
  { value: "all", label: "All" },
  { value: "pre1980", label: "Before 1980" },
  { value: "1980", label: "1980s" },
  { value: "1990", label: "1990s" },
  { value: "2000", label: "2000s" },
  { value: "2010", label: "2010s" },
  { value: "2020", label: "2020s" },
];

const PAGE = 36;

function initials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

function surname(name: string) {
  const parts = name.split(/\s+/);
  return parts[parts.length - 1] ?? name;
}

function inDecade(year: number | undefined, decade: string) {
  if (decade === "all") return true;
  if (!year) return false;
  if (decade === "pre1980") return year < 1980;
  const d = Number(decade);
  return year >= d && year < d + 10;
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3.5 py-1.5 font-ui text-sm font-medium transition-all duration-300 active:scale-95",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
          : "border-white/60 bg-white/40 text-muted-foreground backdrop-blur-md hover:border-primary/40 hover:bg-white/70 hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

export default function HeroDirectory({ heroes }: { heroes: HeroListItem[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("book");
  const [decade, setDecade] = useState("all");
  const [shown, setShown] = useState(PAGE);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = heroes.filter((h) => {
      if (!inDecade(h.deathYear, decade)) return false;
      if (!q) return true;
      return `${h.name} ${h.epithet ?? ""} ${h.summary} ${h.tags.join(" ")}`.toLowerCase().includes(q);
    });
    if (sort === "az") {
      return [...list].sort((a, b) => surname(a.name).localeCompare(surname(b.name)) || a.name.localeCompare(b.name));
    }
    if (sort === "death") {
      return [...list].sort((a, b) => (a.deathYear ?? 9999) - (b.deathYear ?? 9999));
    }
    return list;
  }, [heroes, query, sort, decade]);

  const visible = results.slice(0, shown);
  const reset = () => setShown(PAGE);

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] via-[hsl(var(--destructive))] to-[hsl(var(--secondary))] py-16 text-primary-foreground shadow-inner md:py-24">
        <div className="absolute inset-0 bg-black/30 mix-blend-overlay" />
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
              <Users className="h-3.5 w-3.5" />
              {heroes.length} archived profiles
            </span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 md:py-12">
        {/* Controls */}
        <Reveal className="glass mb-8 space-y-4 rounded-2xl p-4 md:p-5">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, role or place…"
              aria-label="Search heroes"
              className="h-11 border-primary/20 bg-white/50 pl-10 pr-10 backdrop-blur-md focus-visible:ring-primary dark:bg-white/5"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                reset();
              }}
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setQuery("");
                  reset();
                }}
                className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition hover:bg-primary/10 hover:text-primary active:scale-90"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Sort">
              <span className="mr-1 font-ui text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sort</span>
              {SORTS.map((s) => (
                <Chip key={s.value} active={sort === s.value} onClick={() => setSort(s.value)}>
                  {s.label}
                </Chip>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by decade of death">
              <span className="mr-1 font-ui text-xs font-semibold uppercase tracking-wider text-muted-foreground">Died</span>
              {DECADES.map((d) => (
                <Chip
                  key={d.value}
                  active={decade === d.value}
                  onClick={() => {
                    setDecade(d.value);
                    reset();
                  }}
                >
                  {d.label}
                </Chip>
              ))}
            </div>
          </div>
        </Reveal>

        <p className="mb-6 font-ui text-sm text-muted-foreground" aria-live="polite">
          Showing {visible.length} of {results.length} {results.length === 1 ? "profile" : "profiles"}
        </p>

        {/* Grid */}
        {visible.length > 0 ? (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((hero, index) => (
              <li key={hero.id}>
                <Reveal delay={(index % 6) * 60} className="h-full">
                  <Link
                    href={`/national-heroes/${hero.id}`}
                    className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <SpotlightCard className="h-full border-primary/20">
                      <CardContent className="flex h-full flex-col gap-4 p-5">
                        <div className="flex items-start gap-4">
                          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-br from-primary to-secondary font-headline text-xl font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
                            {hero.portrait ? (
                              <Image src={hero.portrait} alt="" fill sizes="64px" className="object-cover" />
                            ) : (
                              <span aria-hidden>{initials(hero.name)}</span>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-ui text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent-foreground/70">
                              {hero.honorific}
                            </p>
                            <h2 className="font-headline text-xl font-semibold leading-tight tracking-tight text-primary">
                              {hero.name}
                            </h2>
                            {hero.epithet && (
                              <p className="mt-0.5 line-clamp-1 font-body text-sm italic text-muted-foreground">
                                {hero.epithet}
                              </p>
                            )}
                          </div>
                          <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground/60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {hero.lifespan && (
                            <span className="rounded-full bg-accent px-2.5 py-0.5 font-ui text-xs font-bold tabular-nums text-accent-foreground">
                              {hero.lifespan}
                            </span>
                          )}
                          {hero.badge && (
                            <Badge className="bg-primary font-ui text-[0.7rem] font-bold tracking-wide text-primary-foreground hover:bg-primary">
                              {hero.badge}
                            </Badge>
                          )}
                        </div>

                        <p className="line-clamp-3 font-body text-sm leading-relaxed text-muted-foreground">
                          {hero.summary}
                        </p>

                        <div className="mt-auto flex items-end justify-between gap-3 pt-1">
                          <div className="flex flex-wrap gap-1.5">
                            {hero.tags.map((t) => (
                              <span
                                key={t}
                                className="max-w-[14rem] truncate rounded-full border border-white/60 bg-white/50 px-2.5 py-0.5 font-ui text-[0.7rem] text-muted-foreground"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                          {hero.partial && (
                            <span
                              title="Some details are still being verified"
                              className="flex shrink-0 items-center gap-1 font-ui text-[0.7rem] text-muted-foreground/80"
                            >
                              <Info className="h-3.5 w-3.5" aria-hidden />
                              <span className="sr-only sm:not-sr-only">Verifying</span>
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </SpotlightCard>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <div className="glass mx-auto max-w-md rounded-2xl p-10 text-center">
            <Search className="mx-auto mb-4 h-10 w-10 stroke-1 text-muted-foreground" />
            <p className="font-headline text-xl text-primary">No profiles found</p>
            <p className="mt-1 text-sm text-muted-foreground">Try a different name or clear the filters.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setDecade("all");
                reset();
              }}
              className="mt-5 rounded-full bg-primary px-4 py-2 font-ui text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 active:scale-95"
            >
              Reset filters
            </button>
          </div>
        )}

        {shown < results.length && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setShown((n) => n + PAGE)}
              className="glass-strong rounded-full px-6 py-3 font-ui text-sm font-semibold text-primary transition-all hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground active:scale-95"
            >
              Show {Math.min(PAGE, results.length - shown)} more
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
