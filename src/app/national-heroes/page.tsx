import { Suspense } from "react";
import NationalHeroesPageContent from "./national-heroes-page-content";

export default function NationalHeroesPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-background min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading heroes…</p>
        </div>
      }
    >
      <NationalHeroesPageContent />
    </Suspense>
  );
}
