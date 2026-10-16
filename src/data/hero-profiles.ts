import type { StaticImageData } from "next/image";
import matemadandaImage from "@/img/matemadanda.png";
import { heroesData, type Hero } from "./heroes";
import { archiveHeroes, type ArchiveHero } from "./heroes-archive";

/** Unified shape the heroes pages render, whether the hero came from the archive or the original hand-written profile. */
export interface HeroProfile {
  id: string;
  order: number;
  name: string;
  honorific: string;
  epithet?: string;
  /** "1916 – 1970", "d. 1970", "b. 1916" or undefined when the source gives no usable years. */
  lifespan?: string;
  deathYear?: number;
  badges: string[];
  summary: string;
  /** Label / value pairs shown in the key-facts grid. */
  facts: { label: string; value: string }[];
  /** Long-form paragraphs (only the hand-written profile has these). */
  narrative: string[];
  timeline: { year: string | null; label?: string; text: string }[];
  /** Titled bullet lists for the "Roles & education" tab. */
  sections: { title: string; tone?: "primary" | "destructive" | "accent"; items: string[] }[];
  portrait?: StaticImageData;
  /** Some facts could not be fully confirmed from the source pages. */
  partial: boolean;
}

/** Light version for the directory grid, so the full profiles never ship to the browser. */
export interface HeroListItem {
  id: string;
  name: string;
  honorific: string;
  epithet?: string;
  lifespan?: string;
  deathYear?: number;
  summary: string;
  tags: string[];
  badge?: string;
  partial: boolean;
  portrait?: StaticImageData;
}

function lifespan(birth?: number | null, death?: number | null): string | undefined {
  if (birth && death) return `${birth} – ${death}`;
  if (death) return `d. ${death}`;
  if (birth) return `b. ${birth}`;
  return undefined;
}

function yearOf(text?: string | null): number | undefined {
  const m = text?.match(/(1[89]\d\d|20\d\d)/);
  return m ? Number(m[1]) : undefined;
}

const join = (...parts: (string | null | undefined)[]) => parts.filter(Boolean).join(", ");

function fromArchive(h: ArchiveHero): HeroProfile {
  const facts: HeroProfile["facts"] = [];
  const born = join(h.born, h.birthPlace);
  const died = join(h.died, h.deathPlace);
  if (born) facts.push({ label: "Born", value: born });
  if (died) facts.push({ label: "Died", value: died });
  if (h.deathCause) facts.push({ label: "Cause of death", value: h.deathCause });
  const burial = join(h.burialPlace, h.burialDate);
  if (burial) facts.push({ label: "Burial", value: burial });

  const honorific = h.title && h.title.toLowerCase() !== "cde" ? h.title : "Cde";
  return {
    id: h.id,
    order: h.order,
    name: h.name,
    honorific,
    epithet: h.epithet ?? undefined,
    lifespan: lifespan(h.birthYear, h.deathYear),
    deathYear: h.deathYear ?? undefined,
    badges: [h.status].filter((b): b is string => Boolean(b)),
    summary: h.summary,
    facts,
    narrative: [],
    timeline: h.timeline.map((e) => ({ year: e.year ?? yearOf(e.date)?.toString() ?? null, text: e.text })),
    sections: [
      { title: "Roles & offices", tone: "primary" as const, items: h.roles },
      { title: "Education", tone: "accent" as const, items: h.education },
    ].filter((s) => s.items.length > 0),
    partial: h.verification.partial,
  };
}

/**
 * The original hand-written profile. When the compiled archive also has a record for the same
 * person, that record only supplies facts the hand-written one lacks (death date, burial) so the
 * hero is not listed twice.
 */
function fromLegacy(h: Hero, archive?: ArchiveHero): HeroProfile {
  const legacyDeath = h.deathDate && /\d{4}/.test(h.deathDate) ? h.deathDate : undefined;
  const died = legacyDeath ?? join(archive?.died, archive?.deathPlace);
  const deathYear = yearOf(legacyDeath) ?? archive?.deathYear ?? undefined;
  const burial = join(archive?.burialPlace, archive?.burialDate);
  const facts: HeroProfile["facts"] = [
    { label: "Born", value: join(h.birthDate, h.placeOfOrigin) },
    ...(died ? [{ label: "Died", value: died }] : []),
    ...(burial ? [{ label: "Burial", value: burial }] : []),
    ...(h.residence ? [{ label: "Residence", value: h.residence }] : []),
    { label: "Family", value: join(h.maritalStatus, h.children) },
  ];
  const birthYear = yearOf(h.birthDate);
  return {
    id: h.id,
    order: 0,
    name: h.fullName,
    honorific: "Cde",
    lifespan: lifespan(birthYear, deathYear) ?? (birthYear ? `b. ${birthYear}` : undefined),
    deathYear,
    badges: ["Liberation fighter", "Diplomat"],
    summary: h.summary,
    facts,
    narrative: h.narrative,
    timeline: h.timeline.map((t) => ({ year: t.year, label: t.title, text: t.description })),
    sections: [
      { title: "Education", tone: "primary" as const, items: h.education },
      { title: "Military service", tone: "destructive" as const, items: h.militaryService },
      { title: "Political & diplomatic career", tone: "accent" as const, items: h.politicalCareer },
    ].filter((s) => s.items.length > 0),
    portrait: matemadandaImage,
    partial: false,
  };
}

const legacyIds = new Set(heroesData.map((h) => h.id));

const profiles: HeroProfile[] = [
  ...heroesData.map((h) => fromLegacy(h, archiveHeroes.find((a) => a.id === h.id))),
  ...archiveHeroes.filter((a) => !legacyIds.has(a.id)).map(fromArchive),
].sort((a, b) => a.order - b.order);

export function getAllProfiles(): HeroProfile[] {
  return profiles;
}

export function getProfile(id: string): HeroProfile | undefined {
  return profiles.find((p) => p.id === id);
}

export function getNeighbours(id: string): { prev?: HeroProfile; next?: HeroProfile } {
  const i = profiles.findIndex((p) => p.id === id);
  if (i === -1) return {};
  return { prev: profiles[i - 1], next: profiles[i + 1] };
}

function clip(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max).replace(/\s+\S*$/, "");
  return `${cut}…`;
}

export function getHeroIndex(): HeroListItem[] {
  return profiles.map((p) => ({
    id: p.id,
    name: p.name,
    honorific: p.honorific,
    epithet: p.epithet,
    lifespan: p.lifespan,
    deathYear: p.deathYear,
    summary: clip(p.summary, 190),
    tags: p.sections
      .find((s) => /role|career/i.test(s.title))
      ?.items.slice(0, 2)
      .map((t) => clip(t, 46)) ?? [],
    badge: p.badges[0],
    partial: p.partial,
    portrait: p.portrait,
  }));
}
