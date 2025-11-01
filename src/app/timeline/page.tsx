"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useImages } from "@/hooks/use-images";
import Image from "next/image";

const timelineData = [
  {
    year: "1942-1950s",
    title: "Birth and Early Life",
    description: "Born in Zvishavane on September 15, 1942. His family later relocated to Zambia in the 1950s under pressure from colonial rule.",
    imageId: "timeline-1",
  },
  {
    year: "1960s",
    title: "Political Activism & Liberation Struggle",
    description: "Joined the nationalist movement, received military training abroad, and was arrested for sabotage. His death sentence was commuted, and he served 10 years in prison.",
    imageId: "timeline-2",
  },
  {
    year: "1977",
    title: "Rise in ZANU",
    description: "Appointed by Robert Mugabe as Head of Civil and Military Affairs for ZANU, becoming a key strategist in the liberation war.",
    imageId: "timeline-3",
  },
  {
    year: "1980-2013",
    title: "Senior Government Minister",
    description: "After Zimbabwe's independence in 1980, he held several senior cabinet posts, including Minister of State Security, Minister of Justice, and Minister of Defence.",
    imageId: "timeline-4",
  },
  {
    year: "2014",
    title: "First Vice President",
    description: "Appointed as First Vice President of Zimbabwe, positioning him as a potential successor to President Mugabe.",
    imageId: "timeline-5",
  },
  {
    year: "2017",
    title: "Inauguration as President",
    description: "After a brief period of exile, he returned to Zimbabwe and was sworn in as the second Executive President on November 24, 2017, following the resignation of Robert Mugabe.",
    imageId: "timeline-6",
  },
  {
    year: "2018",
    title: "First Election Victory",
    description: "Won the 2018 presidential election and launched the 'Second Republic,' focusing on economic reform. He also survived a grenade attack during a rally in Bulawayo.",
    imageId: "timeline-7",
  },
  {
    year: "2023-Present",
    title: "Re-Election and Second Term",
    description: "Re-elected in August 2023, he continues to lead with Vision 2030. His presidency focuses on economic development but faces criticism over human rights and governance.",
    imageId: "timeline-8",
  },
];


export default function TimelinePage() {
    const { images } = useImages();

    return (
        <div className="bg-background min-h-screen">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-headline text-primary mb-4">Presidential Timeline</h1>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        A chronological journey through the life, career, and key moments of the President of Zimbabwe.
                    </p>
                </div>

                <div className="relative wrap overflow-hidden p-4 md:p-10 h-full">
                    <div className="absolute border-opacity-20 border-primary/40 h-full border-2 left-5 md:left-1/2 md:-translate-x-1/2 rounded-full"></div>
                    
                    {timelineData.map((item, index) => {
                        const timelineImage = images?.find(img => img.id === item.imageId);
                        const isLeft = index % 2 !== 0;

                        return (
                            <div key={item.year} className={cn(
                                "mb-8 flex justify-between items-center w-full",
                                isLeft ? "flex-row-reverse left-timeline" : "right-timeline"
                            )}>
                                <div className="order-1 w-5/12"></div>
                                <div className={cn("z-20 flex items-center order-1 bg-accent shadow-xl w-8 h-8 rounded-full",
                                     "md:w-12 md:h-12"
                                )}>
                                    <span className="mx-auto font-semibold text-sm md:text-lg text-white">{index + 1}</span>
                                </div>
                                <div className={cn(
                                    "order-1 rounded-lg w-full md:w-5/12",
                                )}>
                                    <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300 border-primary/20 bg-card">
                                      {timelineImage && (
                                          <div className="relative w-full h-48">
                                              <Image
                                                  src={timelineImage.imageUrl}
                                                  alt={timelineImage.altText}
                                                  fill
                                                  className="object-cover rounded-t-lg"
                                                  data-ai-hint={timelineImage.imageHint}
                                              />
                                          </div>
                                      )}
                                      <CardHeader>
                                          <CardTitle className="mb-2 text-primary font-headline text-xl md:text-2xl">
                                              {item.year}: {item.title}
                                          </CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                          <p className="text-muted-foreground font-body leading-relaxed">
                                              {item.description}
                                          </p>
                                      </CardContent>
                                    </Card>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}