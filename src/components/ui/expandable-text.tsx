"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpandableTextProps {
  text: string;
  /** Texts at or under this many characters are shown in full with no toggle. */
  threshold?: number;
  className?: string;
}

export function ExpandableText({ text, threshold = 260, className }: ExpandableTextProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const collapsible = text.length > threshold;

  return (
    <div className={className}>
      <div className="relative">
        <p
          id={id}
          className={cn(
            "font-body text-base leading-relaxed text-muted-foreground transition-all",
            collapsible && !open && "line-clamp-4"
          )}
        >
          {text}
        </p>
        {collapsible && !open && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-card/80 to-transparent"
          />
        )}
      </div>
      {collapsible && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="group mt-3 inline-flex items-center gap-1 font-ui text-sm font-semibold text-primary transition-colors hover:text-accent-foreground hover:underline"
        >
          {open ? "Show less" : "Read more"}
          <ChevronDown
            className={cn("h-4 w-4 transition-transform duration-300", open && "rotate-180")}
          />
        </button>
      )}
    </div>
  );
}
