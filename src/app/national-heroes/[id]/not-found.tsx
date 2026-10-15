import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function HeroNotFound() {
  return (
    <div className="container mx-auto px-4 py-20">
      <Card className="mx-auto max-w-lg p-10 text-center">
        <h1 className="font-headline text-3xl font-semibold text-primary">Hero not found</h1>
        <p className="mt-2 text-muted-foreground">No profile matches that address.</p>
        <Link
          href="/national-heroes"
          className="mt-6 inline-flex items-center gap-2 font-ui text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Browse all national heroes
        </Link>
      </Card>
    </div>
  );
}
