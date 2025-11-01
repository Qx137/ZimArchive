"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useImages } from "@/hooks/use-images";
import { BookOpen, Users, Milestone } from "lucide-react";
import Image from "next/image";

const keyFigures = [
    { name: "Robert Mugabe", imageId: "key-figure-1", description: "A founding father and the first leader of Zimbabwe, serving as Prime Minister and later as President from 1980 to 2017." },
    { name: "Joshua Nkomo", imageId: "key-figure-2", description: "Leader of the Zimbabwe African People's Union (ZAPU) and a key figure in the liberation struggle, who later became Vice President after the Unity Accord." },
    { name: "Herbert Chitepo", imageId: "key-figure-3", description: "The first black citizen of Rhodesia to become a barrister, he was a leading nationalist who led ZANU until his assassination in 1975." },
];

export default function HistoryPage() {
    const { images, isLoading } = useImages();
    const originsImage = images?.find(img => img.id === "history-origins");

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
                                    The Zimbabwe African National Union (ZANU) was formed in 1963 as a breakaway from the Zimbabwe African People's Union (ZAPU), led by Ndabaningi Sithole, Herbert Chitepo, and Robert Mugabe. The party was forged in the crucible of the liberation struggle, advocating for a more militant approach to ending white minority rule. Its core ideology centered on national sovereignty, land reclamation, and socialist principles, which guided its mission to establish an independent Zimbabwe.
                                </p>
                            </div>
                            <div className="relative min-h-[300px] md:min-h-full">
                                {originsImage && (
                                    <Image
                                        src={originsImage.imageUrl}
                                        alt={originsImage.altText}
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
                             const figureImage = images?.find(img => img.id === figure.imageId);
                             return (
                                <Card key={figure.name} className="text-center shadow-lg hover:shadow-2xl transition-shadow duration-300 border-primary/20">
                                    <CardHeader>
                                        {figureImage && (
                                            <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-4 border-accent">
                                            <Image
                                                src={figureImage.imageUrl}
                                                alt={figureImage.altText}
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
                        <li className="p-4 bg-card border-l-4 border-accent shadow-md"><strong>1963:</strong> Formation of ZANU in Highfield, Salisbury (now Harare), by founding members including Ndabaningi Sithole.</li>
                        <li className="p-4 bg-card border-l-4 border-accent shadow-md"><strong>1980:</strong> ZANU wins a landslide victory in the first universal suffrage elections, leading to Zimbabwe's independence.</li>
                        <li className="p-4 bg-card border-l-4 border-accent shadow-md"><strong>1987:</strong> The Unity Accord is signed between ZANU and ZAPU, merging to form ZANU-PF and creating a de facto one-party state.</li>
                        <li className="p-4 bg-card border-l-4 border-accent shadow-md"><strong>2000:</strong> The Fast-Track Land Reform Programme is launched to redistribute land from the white minority to the black majority.</li>
                        <li className="p-4 bg-card border-l-4 border-accent shadow-md"><strong>2017:</strong> A new dispensation begins as Emmerson Mnangagwa assumes the presidency, emphasizing economic reform and international re-engagement.</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
