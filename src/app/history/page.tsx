
"use client";

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
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


function FeatureCard({
    icon,
    title,
    description,
    image,
    flip = false,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    image?: { imageUrl: string; altText: string; imageHint?: string };
    flip?: boolean;
}) {
    return (
        <Reveal>
            <SpotlightCard className="group overflow-hidden border-primary/20">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className={`flex flex-col justify-center p-6 md:p-12 ${flip ? "order-2 md:order-1" : ""}`}>
                        <div className="mb-4 flex items-center">
                            {icon}
                            <h2 className="text-3xl font-headline text-primary md:text-4xl">{title}</h2>
                        </div>
                        <p className="mt-4 font-body leading-relaxed text-muted-foreground">{description}</p>
                    </div>
                    <div className={`relative min-h-[300px] overflow-hidden md:min-h-full ${flip ? "order-1 md:order-2" : ""}`}>
                        {image ? (
                            <>
                                <Image
                                    src={image.imageUrl}
                                    alt={image.altText}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    data-ai-hint={image.imageHint}
                                />
                                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                            </>
                        ) : (
                            <div className="absolute inset-0 animate-pulse bg-muted/60" aria-hidden />
                        )}
                    </div>
                </div>
            </SpotlightCard>
        </Reveal>
    );
}

function SectionIntro({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <Reveal className="mb-12 text-center">
            <span className="glass mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl">{icon}</span>
            <h2 className="text-3xl font-headline text-primary md:text-4xl">{title}</h2>
            <p className="mx-auto mt-2 max-w-2xl text-balance text-lg text-muted-foreground">{description}</p>
        </Reveal>
    );
}

export default function HistoryPage() {
    const { images } = useImages();
    const originsImage = images?.find(img => img.id === origins.imageId);
    const ideologyImage = images?.find(img => img.id === ideology.imageId);
    const challengesImage = images?.find(img => img.id === challenges.imageId);

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-16">
                <PageHeader
                    eyebrow="Since 1963"
                    title="Historical Context"
                    description="Understanding the roots, key personalities, and significant milestones of the ruling party."
                />

                <section className="mb-20">
                    <FeatureCard icon={origins.icon} title={origins.title} description={origins.description} image={originsImage} />
                </section>

                <section className="mb-20">
                    <SectionIntro
                        icon={<Users className="h-8 w-8 text-accent" />}
                        title="Key Figures"
                        description="The architects and pioneers who shaped the party's journey."
                    />
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {keyFigures.map((figure, index) => {
                            const figureImage = images?.find(img => img.id === figure.imageId);
                            return (
                                <Reveal key={figure.name} delay={index * 120} className="h-full">
                                    <SpotlightCard className="group h-full border-primary/20 text-center">
                                        <CardHeader>
                                            <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-accent shadow-xl shadow-accent/20 transition-transform duration-500 group-hover:rotate-2 group-hover:scale-105 md:h-40 md:w-40">
                                                {figureImage ? (
                                                    <Image
                                                        src={figureImage.imageUrl}
                                                        alt={figureImage.altText}
                                                        fill
                                                        sizes="160px"
                                                        className="object-cover"
                                                        data-ai-hint={figureImage.imageHint}
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 animate-pulse bg-muted/60" aria-hidden />
                                                )}
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <CardTitle className="font-headline text-xl text-primary md:text-2xl">{figure.name}</CardTitle>
                                            <CardDescription className="mt-2 font-body text-base text-muted-foreground">{figure.description}</CardDescription>
                                        </CardContent>
                                    </SpotlightCard>
                                </Reveal>
                            );
                        })}
                    </div>
                </section>

                <section className="mb-20">
                    <SectionIntro
                        icon={<Milestone className="h-8 w-8 text-accent" />}
                        title="Historical Milestones"
                        description="Pivotal moments that defined the party and the nation."
                    />
                    <div className="space-y-8">
                        {milestones.map((milestone, index) => {
                            const milestoneImage = images?.find(img => img.id === milestone.imageId);
                            return (
                                <Reveal key={milestone.year} direction={index % 2 === 0 ? "left" : "right"}>
                                    <SpotlightCard className="group overflow-hidden border-primary/20">
                                        <div className="grid grid-cols-1 md:grid-cols-3">
                                            <div className="relative min-h-[200px] overflow-hidden md:min-h-full">
                                                {milestoneImage ? (
                                                    <Image
                                                        src={milestoneImage.imageUrl}
                                                        alt={milestoneImage.altText}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, 33vw"
                                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                                        data-ai-hint={milestoneImage.imageHint}
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 animate-pulse bg-muted/60" aria-hidden />
                                                )}
                                            </div>
                                            <div className="p-6 md:col-span-2">
                                                <span className="inline-block rounded-full bg-accent px-3 py-0.5 font-ui text-sm font-bold text-accent-foreground">
                                                    {milestone.year}
                                                </span>
                                                <h3 className="mt-2 text-2xl font-headline text-primary">{milestone.title}</h3>
                                                <p className="mt-2 font-body leading-relaxed text-muted-foreground">{milestone.description}</p>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                </Reveal>
                            );
                        })}
                    </div>
                </section>

                <section className="mb-20">
                    <FeatureCard icon={ideology.icon} title={ideology.title} description={ideology.description} image={ideologyImage} />
                </section>

                <section>
                    <FeatureCard icon={challenges.icon} title={challenges.title} description={challenges.description} image={challengesImage} flip />
                </section>
            </div>
        </div>
    );
}
