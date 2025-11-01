import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BookOpen, Users, Milestone } from "lucide-react";
import Image from "next/image";

const keyFigures = [
    { name: "Founding Father 1", imageId: "key-figure-1", description: "A visionary leader who was instrumental in the party's formation and early ideology." },
    { name: "Founding Mother 2", imageId: "key-figure-2", description: "A key strategist and mobilizer during the liberation struggle, championing unity and progress." },
    { name: "Ideological Architect 3", imageId: "key-figure-3", description: "Shaped the core principles of the party, focusing on self-determination and economic empowerment." },
];

export default function HistoryPage() {
    const originsImage = PlaceHolderImages.find(img => img.id === "history-origins");

    return (
        <div className="bg-background min-h-screen">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-headline text-primary mb-4">Historical Context</h1>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Understanding the roots, key personalities, and significant milestones of the ruling party.
                    </p>
                </div>

                {/* Origins Section */}
                <section className="mb-20">
                    <Card className="overflow-hidden shadow-xl border-primary/20">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                             <div className="p-6 md:p-12 flex flex-col justify-center">
                                <div className="flex items-center mb-4">
                                    <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-accent mr-4" />
                                    <h2 className="text-3xl md:text-4xl font-headline text-primary">The Origins</h2>
                                </div>
                                <p className="font-body text-muted-foreground leading-relaxed mt-4">
                                    The party was forged in the crucible of the liberation struggle, born from a collective desire for sovereignty, freedom, and justice. Its foundations were laid by nationalist pioneers who envisioned a unified and prosperous Zimbabwe, free from the shackles of colonialism. The core ideology centered on land reform, economic independence, and majority rule, principles that mobilized millions and continue to guide the party's mission.
                                </p>
                            </div>
                            <div className="relative min-h-[300px] md:min-h-full">
                                {originsImage && (
                                    <Image
                                        src={originsImage.imageUrl}
                                        alt={originsImage.description}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={originsImage.imageHint}
                                    />
                                )}
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Key Figures Section */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <Users className="w-12 h-12 text-accent mx-auto mb-4" />
                        <h2 className="text-3xl md:text-4xl font-headline text-primary">Key Figures</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
                            The architects and pioneers who shaped the party's journey.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {keyFigures.map((figure) => {
                             const figureImage = PlaceHolderImages.find(img => img.id === figure.imageId);
                             return (
                                <Card key={figure.name} className="text-center shadow-lg hover:shadow-2xl transition-shadow duration-300 border-primary/20">
                                    <CardHeader>
                                        {figureImage && (
                                            <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-4 border-accent">
                                            <Image
                                                src={figureImage.imageUrl}
                                                alt={figureImage.description}
                                                fill
                                                className="object-cover"
                                                data-ai-hint={figureImage.imageHint}
                                            />
                                            </div>
                                        )}
                                    </CardHeader>
                                    <CardContent>
                                        <CardTitle className="font-headline text-xl md:text-2xl text-primary">{figure.name}</CardTitle>
                                        <CardDescription className="font-body text-base text-muted-foreground mt-2">{figure.description}</CardDescription>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </section>

                {/* Milestones Section */}
                <section>
                    <div className="text-center mb-12">
                        <Milestone className="w-12 h-12 text-accent mx-auto mb-4" />
                        <h2 className="text-3xl md:text-4xl font-headline text-primary">Historical Milestones</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
                            Pivotal moments that defined the party and the nation.
                        </p>
                    </div>
                    <ul className="space-y-4 max-w-3xl mx-auto">
                        <li className="p-4 bg-card border-l-4 border-accent shadow-md"><strong>1963:</strong> Formation of the party, uniting various nationalist movements under a single banner.</li>
                        <li className="p-4 bg-card border-l-4 border-accent shadow-md"><strong>1980:</strong> Victory in the first democratic elections and the attainment of Zimbabwe's independence.</li>
                        <li className="p-4 bg-card border-l-4 border-accent shadow-md"><strong>1987:</strong> The Unity Accord is signed, creating a more unified and stable political landscape.</li>
                        <li className="p-4 bg-card border-l-4 border-accent shadow-md"><strong>2000:</strong> The Fast Track Land Reform Programme is initiated to address historical land imbalances.</li>
                        <li className="p-4 bg-card border-l-4 border-accent shadow-md"><strong>2017:</strong> A new dispensation begins, focusing on economic renewal and international re-engagement.</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
