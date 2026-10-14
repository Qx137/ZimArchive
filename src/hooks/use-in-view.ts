"use client";

import { useEffect, useRef, useState } from "react";

interface Options {
  /** Fraction of the element that must be visible before it counts as in view. */
  threshold?: number;
  rootMargin?: string;
  /** Stay `true` after the first time the element is seen. */
  once?: boolean;
}

export function useInView<T extends Element = HTMLDivElement>({
  threshold = 0.12,
  rootMargin = "0px 0px -6% 0px",
  once = true,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView] as const;
}
