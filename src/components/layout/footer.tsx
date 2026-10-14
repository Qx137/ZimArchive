import { ZimbabweBirdIcon } from "../icons/zimbabwe-bird";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-white/25 bg-gradient-to-r from-primary/90 via-accent/85 via-destructive/85 to-secondary/95 text-primary-foreground backdrop-blur-xl backdrop-saturate-150">
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-5 text-center">
        <span className="glass-on-color mb-2 flex h-10 w-10 items-center justify-center rounded-full">
          <ZimbabweBirdIcon className="h-6 w-6 text-background/90" />
        </span>
        <p className="font-headline text-md">ZimArchive</p>
        <p className="mt-1 text-xs text-primary-foreground/70">
          © {currentYear} ZimArchive. All Rights Reserved.
        </p>
        <p className="text-xs text-primary-foreground/50">
          A historical and informational resource.
        </p>
      </div>
    </footer>
  );
}
