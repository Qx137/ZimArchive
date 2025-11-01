"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { ZimbabweBirdIcon } from "../icons/zimbabwe-bird";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/timeline", label: "Timeline" },
  { href: "/achievements", label: "Achievements" },
  { href: "/history", label: "History" },
  { href: "/gallery", label: "Gallery" },
];

export function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link href={href}>
      <span
        className={cn(
          "font-medium transition-colors hover:text-accent",
          pathname === href ? "text-accent" : "text-primary-foreground"
        )}
      >
        {label}
      </span>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-primary shadow-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <ZimbabweBirdIcon className="h-10 w-10 text-accent" />
          <span className="text-2xl font-headline font-bold text-primary-foreground">
            ZimArchive
          </span>
        </Link>

        <nav className="hidden items-center space-x-6 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80 hover:text-accent">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[40vw] bg-primary text-primary-foreground border-l-primary/50">
              <nav className="flex flex-col space-y-6 pt-10">
                {navLinks.map((link) => (
                   <Link href={link.href} key={`mobile-${link.href}`}>
                    <span
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-accent",
                        pathname === link.href ? "text-accent" : "text-primary-foreground"
                      )}
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
