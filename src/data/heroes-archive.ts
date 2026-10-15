import archive from "./heroes-archive.json";

/** One dated event in a hero's life, written in our own words from the source biography. */
export interface ArchiveEvent {
  year: string | null;
  date: string | null;
  text: string;
}

/**
 * A hero record compiled from "A Guide to Heroes Acre". Facts are only filled in when the
 * source states them; `verification.partial` marks records whose source pages were hard to read.
 */
export interface ArchiveHero {
  id: string;
  /** Position in the source book (used for default ordering and previous/next links). */
  order: number;
  name: string;
  title: string | null;
  epithet: string | null;
  born: string | null;
  birthYear: number | null;
  birthPlace: string | null;
  died: string | null;
  deathYear: number | null;
  deathPlace: string | null;
  deathCause: string | null;
  burialPlace: string | null;
  burialDate: string | null;
  status: string | null;
  roles: string[];
  education: string[];
  summary: string;
  timeline: ArchiveEvent[];
  verification: {
    partial: boolean;
    ocrQuality: string;
    complete: boolean;
    notes: string[];
  };
  sourceChunk: number;
}

export const archiveHeroes = archive as ArchiveHero[];
