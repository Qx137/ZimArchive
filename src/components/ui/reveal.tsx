"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";

type Direction = "up" | "left" | "right" | "none";

const offsets: Record<Direction, { x: string; y: string }> = {
  up: { x: "0px", y: "28px" },
  left: { x: "-40px", y: "0px" },
  right: { x: "40px", y: "0px" },
  none: { x: "0px", y: "0px" },
};

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Delay in ms, handy for staggering siblings. */
  delay?: number;
  direction?: Direction;
  once?: boolean;
}

/** Fades and slides its children in the first time they scroll into view. */
export function Reveal({
  delay = 0,
  direction = "up",
  once = true,
  className,
  style,
  children,
  ...props
}: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ once });
  const { x, y } = offsets[direction];

  return (
    <div
      ref={ref}
      data-visible={inView}
      className={cn("reveal", className)}
      style={
        {
          "--rx": x,
          "--ry": y,
          "--reveal-delay": `${delay}ms`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
}
