"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Glass card that lifts on hover and has a soft highlight following the cursor. */
export const SpotlightCard = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Card>
>(({ className, onMouseMove, ...props }, ref) => {
  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
    onMouseMove?.(event);
  };

  return (
    <Card
      ref={ref}
      onMouseMove={handleMove}
      className={cn("spotlight glass-hover", className)}
      {...props}
    />
  );
});
SpotlightCard.displayName = "SpotlightCard";
