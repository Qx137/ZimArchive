
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useImages } from "@/hooks/use-images";
import { BookOpen, Users, Milestone, Pyramid, Scale } from "lucide-react";
import Image from "next/image";

const origins = {
  title: "Origins and Founding",
  icon: <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-accent mr-4" />,
  imageId: "history-origins-2",
  description: "The party traces its roots to Zimbabwe African National Union (ZANU), which was formed on 8 August 1963 as a breakaway from Zimbabwe African People’s Union (ZAPU). Founding figures included Ndabaningi Sithole (its first president), Herbert Chitepo (national chairman), Robert Mugabe (secretary-general), Enos Nkala (treasurer) and others. The split from ZAPU reflected a more militant‐oriented strategy: ZANU emphasised armed struggle, socialist and nationalist ideology, land reclamation, one man/one vote, and African self-determination. ZANU’s military wing, Zimbabwe African National Liberation Army (ZANLA), was organised to carry out guerrilla operations against the Rhodesian white minority regime."
};

const keyFigures = [
    { name: "Robert Mugabe", imageId: "key-figure-mugabe", description: "One of ZANU’s most prominent figures; later Prime Minister and President of Zimbabwe.", imageIds: ["key-figure-mugabe", "key-figure-mugabe-2"] },
    { name: "Joshua Nkomo", imageId: "key-figure-nkomo", description: "Leader of ZAPU, rival and later partner in the Unity Accord; pivotal in the liberation struggle.", imageIds: ["key-figure-nkomo", "key-figure-nkomo-2"] },
    { name: "Herbert Chitepo", imageId: "key-figure-chitepo", description: "First black barrister in Rhodesia, ZANU chairman, was assassinated in 1975; his death triggered internal fractures within ZANU.", imageIds: ["key-figure-chitepo", "key-figure-chitepo-2"] },
];

const milestones = [
    { year: "1960s–1970s", title: "Liberation Struggle", description: "Soon after formation, ZANU pursued guerrilla warfare against the Rhodesian regime, recruiting and training cadres in countries such as China and Ghana. In 1975, after Chitepo’s assassination and disagreements, ZANU effectively split into a Mugabe‐led faction and a Sithole faction. In 1976, ZANU (Mugabe) formed the Patriotic Front alliance with ZAPU during the war.", imageId: "milestone-struggle" },
    { year: "1980", title: "Independence & Election Victory", description: "In April 1980, Zimbabwe gained independence. ZANU-PF won the election, and Mugabe became Prime Minister. The party transitioned from a liberation movement into the governing party of the new independent state.", imageId: "milestone-independence" },
    { year: "1987", title: "Unity Accord & One‐Party Dominance", description: "On 22 December 1987, ZANU and ZAPU signed the Unity Accord, merging to form ZANU-PF, thereby ending a period of intense violence (notably the Gukurahundi era) and consolidating political power. As part of this, the office of Prime Minister was abolished and Robert Mugabe became Executive President.", imageId: "milestone-unity" },
    { year: "2000", title: "Fast‐Track Land Reform", description: "In 2000, ZANU-PF launched the Fast-Track Land Reform Programme which forcibly redistributed land from the white minority to black Zimbabweans. The slogan “Land is the economy, the economy is the land” captured its populist thrust. This period also coincided with rising opposition politics, and economic challenges.", imageId: "milestone-land-reform" },
    { year: "2017", title: "“New Dispensation” and Leadership Transition", description: "In November 2017, after internal party and military manoeuvres, Robert Mugabe was removed and Emmerson Mnangagwa, formerly Vice-President, took over as party leader and then as President of Zimbabwe. ZANU-PF branded the transition as the “New Dispensation,” signalling intentions for economic reform and re-engagement with the world.", imageId: "milestone-new-dispensation" },
];

const ideology = {
    title: "Ideology, Structure & Long‐Term Dominance",
    icon: <Pyramid className="w-8 h-8 md:w-10 md:h-10 text-accent mr-4" />,
    imageId: "ideology-structure",
    description: "The party emphasises its origins as a national liberation movement, with rhetoric around indigenous economic empowerment, land reform, anti‐imperialism, and African socialism. Over time, especially under Mnangagwa, there has been a shift toward more investor-friendly language and economic pragmatism (e.g., “Zimbabwe is open for business”). ZANU-PF’s organisational structure includes a Politburo, Central Committee, women’s and youth leagues. The party’s dominance has been supported by a mix of liberation legitimacy, state resources, party structures, and institutional entrenchment."
};

const challenges = {
    title: "Challenges and Turning Points",
    icon: <Scale className="w-8 h-8 md:w-10 md:h-10 text-accent mr-4" />,
    imageId: "challenges-turning-points",
    description: "The rise of the opposition: The Movement for Democratic Change (MDC) was founded in 1999 and posed the first significant electoral challenge to ZANU-PF in decades. The 2017 leadership transition marked both continuity (same party) and potential change (new rhetoric). How far substantive reform will go remains debated."
};


export default function HistoryPage() {
    const { images } = useImages();
    const originsImage = images?.find(img => img.id === origins.imageId);
    const ideologyImage = images?.find(img => img.id === ideology.imageId);
    const challengesImage = images?.find(img => img.id === challenges.imageId);


    return (
        <div className="bg-background min-h-screen">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-headline text-primary mb-4">Historical Context</h1>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Understanding the roots, key personalities, and significant milestones of the ruling party.
                    </p>
                </div>

                <section className="mb-20">
                    <Card className="overflow-hidden shadow-xl border-primary/20">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                             <div className="p-6 md:p-12 flex flex-col justify-center">
                                <div className="flex items-center mb-4">
                                    {origins.icon}
                                    <h2 className="text-3xl md:text-4xl font-headline text-primary">{origins.title}</h2>
                                </div>
                                <p className="font-body text-muted-foreground leading-relaxed mt-4">
                                    {origins.description}
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

                <section className="mb-20">
                    <div className="text-center mb-12">
                        <Users className="w-12 h-12 text-accent mx-auto mb-4" />
                        <h2 className="text-3xl md:text-4xl font-headline text-primary">Key Figures</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
                            The architects and pioneers who shaped the party&apos;s journey.
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

                <section className="mb-20">
                    <div className="text-center mb-12">
                        <Milestone className="w-12 h-12 text-accent mx-auto mb-4" />
                        <h2 className="text-3xl md:text-4xl font-headline text-primary">Historical Milestones</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
                            Pivotal moments that defined the party and the nation.
                        </p>
                    </div>
                    <div className="space-y-8">
                        {milestones.map((milestone) => {
                            const milestoneImage = images?.find(img => img.id === milestone.imageId);
                            return (
                                <Card key={milestone.year} className="overflow-hidden shadow-lg border-primary/20 hover:shadow-xl transition-shadow duration-300">
                                    <div className="grid grid-cols-1 md:grid-cols-3">
                                        <div className="relative min-h-[200px] md:min-h-full">
                                            {milestoneImage && (
                                                <Image src={milestoneImage.imageUrl} alt={milestoneImage.altText} fill className="object-cover" data-ai-hint={milestoneImage.imageHint} />
                                            )}
                                        </div>
                                        <div className="md:col-span-2 p-6">
                                            <p className="text-accent font-bold font-headline text-lg">{milestone.year}</p>
                                            <h3 className="text-2xl font-headline text-primary mt-1">{milestone.title}</h3>
                                            <p className="text-muted-foreground font-body mt-2 leading-relaxed">{milestone.description}</p>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </section>

                 <section className="mb-20">
                    <Card className="overflow-hidden shadow-xl border-primary/20">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                             <div className="p-6 md:p-12 flex flex-col justify-center">
                                <div className="flex items-center mb-4">
                                    {ideology.icon}
                                    <h2 className="text-3xl md:text-4xl font-headline text-primary">{ideology.title}</h2>
                                </div>
                                <p className="font-body text-muted-foreground leading-relaxed mt-4">
                                    {ideology.description}
                                </p>
                            </div>
                            <div className="relative min-h-[300px] md:min-h-full">
                                {ideologyImage && (
                                    <Image
                                        src={ideologyImage.imageUrl}
                                        alt={ideologyImage.altText}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={ideologyImage.imageHint}
                                    />
                                )}
                            </div>
                        </div>
                    </Card>
                </section>

                <section>
                    <Card className="overflow-hidden shadow-xl border-primary/20">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                             <div className="p-6 md:p-12 flex flex-col justify-center order-2 md:order-1">
                                <div className="flex items-center mb-4">
                                    {challenges.icon}
                                    <h2 className="text-3xl md:text-4xl font-headline text-primary">{challenges.title}</h2>
                                </div>
                                <p className="font-body text-muted-foreground leading-relaxed mt-4">
                                    {challenges.description}
                                </p>
                            </div>
                            <div className="relative min-h-[300px] md:min-h-full order-1 md:order-2">
                                {challengesImage && (
                                    <Image
                                        src={challengesImage.imageUrl}
                                        alt={challengesImage.altText}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={challengesImage.imageHint}
                                    />
                                )}
                            </div>
                        </div>
                    </Card>
                </section>
            </div>
        </div>
    );
}

    