import * as React from "react";
import { Reveal } from "@/components/ui/reveal";

interface PageHeaderProps {
  title: string;
  description: string;
  eyebrow?: string;
  icon?: React.ReactNode;
}

export function PageHeader({ title, description, eyebrow, icon }: PageHeaderProps) {
  return (
    <Reveal className="mb-14 text-center md:mb-16">
      {eyebrow && (
        <span className="glass mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-ui text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          {icon}
          {eyebrow}
        </span>
      )}
      <h1 className="mb-4 text-balance font-headline text-5xl font-semibold tracking-tight text-primary md:text-6xl">{title}</h1>
      <div
        aria-hidden
        className="mx-auto h-1 w-28 rounded-full bg-gradient-to-r from-primary via-accent to-destructive"
      />
      <p className="mx-auto mt-6 max-w-3xl text-balance text-lg text-muted-foreground">{description}</p>
    </Reveal>
  );
}
