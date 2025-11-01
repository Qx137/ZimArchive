import { FactCheckerForm } from "./_components/fact-checker-form";

export default function FactCheckerPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-headline text-primary mb-4">AI-Powered Fact Checker</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Utilize our AI tool to verify statements about Zimbabwean politics. Enter a statement below to receive an analysis with sources and context.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <FactCheckerForm />
        </div>
      </div>
    </div>
  );
}
