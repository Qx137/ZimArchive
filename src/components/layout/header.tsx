"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { ZimbabweBirdIcon } from "../icons/zimbabwe-bird";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/timeline", label: "Timeline" },
  { href: "/achievements", label: "Achievements" },
  { href: "/gallery", label: "Gallery" },
  { href: "/national-heroes", label: "National Heroes" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    // Fixed-height wrapper so the bar can shrink and float without shifting the page.
    <header className="sticky top-0 z-50 h-20 w-full">
      <div
        className={cn(
          "absolute inset-x-0 top-0 border border-white/25 bg-gradient-to-r from-primary/90 via-accent/85 via-destructive/85 to-secondary/95 backdrop-blur-xl backdrop-saturate-150 transition-all duration-500 ease-out",
          scrolled
            ? "mx-3 mt-2 h-16 rounded-2xl shadow-2xl shadow-black/25 md:mx-6"
            : "mx-0 mt-0 h-20 rounded-none border-x-0 border-t-0 shadow-lg"
        )}
      >
        <div className="container mx-auto flex h-full items-center justify-between px-4">
          <Link href="/" className="group flex items-center gap-2">
            <ZimbabweBirdIcon className="h-9 w-9 text-background/80 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 md:h-10 md:w-10" />
            <span className="font-headline text-2xl font-semibold tracking-tight text-primary-foreground">
              ZimArchive
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-active={active}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "link-underline rounded-full px-3 py-1.5 font-ui text-[0.92rem] font-medium transition-colors duration-300 hover:bg-black/15 hover:text-accent",
                    active ? "bg-black/20 text-accent" : "text-primary-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="md:hidden">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="glass-on-color text-primary-foreground hover:bg-black/20 hover:text-accent"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[78vw] max-w-xs border-l border-white/20 bg-gradient-to-b from-primary/85 to-secondary/90 text-primary-foreground backdrop-blur-2xl"
              >
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <nav className="flex flex-col gap-2 pt-10" aria-label="Mobile">
                  {navLinks.map((link, index) => {
                    const active = isActive(link.href);
                    return (
                      <Link
                        href={link.href}
                        key={`mobile-${link.href}`}
                        onClick={() => setMenuOpen(false)}
                        aria-current={active ? "page" : undefined}
                        style={{ animationDelay: `${120 + index * 60}ms`, animationFillMode: "both" }}
                        className={cn(
                          "animate-in fade-in-0 slide-in-from-right-6 rounded-xl px-4 py-3 font-ui text-lg font-medium transition-colors duration-300 hover:bg-white/10 hover:text-accent",
                          active ? "glass-on-color text-accent" : "text-primary-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
