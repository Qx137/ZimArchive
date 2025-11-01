import { ZimbabweBirdIcon } from "../icons/zimbabwe-bird";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto flex flex-col items-center justify-center p-6 text-center">
        <ZimbabweBirdIcon className="h-12 w-12 text-accent mb-2" />
        <p className="font-headline text-xl">ZimArchive</p>
        <p className="text-sm text-primary-foreground/70 mt-4">
          © {currentYear} ZimArchive. All Rights Reserved.
        </p>
         <p className="text-xs text-primary-foreground/50 mt-2">
          A historical and informational resource.
        </p>
      </div>
    </footer>
  );
}
