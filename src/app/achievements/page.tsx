
"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpandableText } from "@/components/ui/expandable-text";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { DollarSign, GraduationCap, HeartPulse, type LucideIcon } from "lucide-react";

const achievements = {
  economy: [
    { title: "Trabablas Interchange", description: "The Trabablas project has successfully transformed the former Mbudzi roundabout into a state-of-the-art interchange, significantly aimed at alleviating chronic traffic congestion in the area. Officially renamed 'Trabablas' in honor of President Mnangagwa's liberation war alias, this initiative not only enhances transportation efficiency but also serves as a poignant tribute to the heroes who fought for the freedom of Zimbabwe. By integrating modern infrastructure with historical significance, this project exemplifies a balanced approach to development that honors the past while paving the way for a brighter future." },
    { title: "Smart City Initiatives", description: "Under President Mnangagwa's visionary leadership, Zimbabwe has adopted the Smart Zimbabwe 2030 Master Plan, a strategic framework designed to foster a knowledge-based, digital economy characterized by modern urban spaces. The government is actively engaged in implementing several transformative projects aligned with this comprehensive, cross-sectoral roadmap. Key pillars of this plan include Smart Government, Smart Cities, Smart Education, Smart Health, and Smart Agriculture. A notable highlight is the commissioning of AI-powered silos at the Grain Marketing Board (GMB) depot in Mutare, which is part of a broader initiative to establish such facilities at 14 locations nationwide. This proactive embrace of artificial intelligence and technology underscores the government's commitment to ensuring that Zimbabwe evolves alongside global advancements, thus enhancing productivity and efficiency across various sectors." },
    { title: "Biometric E-Passports", description: "On December 14, 2021, President Mnangagwa launched Zimbabwe's biometric e-passports, marking a significant milestone in the country's digitalization efforts. These modern travel documents are designed to enhance border security and streamline the processes involved in identity verification. Each e-passport contains an embedded chip that securely stores the holder's personal and biometric data, allowing for quicker and more reliable identity checks at border control points. This initiative not only simplifies travel for citizens but also aligns with global best practices in security and identification, contributing to a more efficient and secure travel environment." },
    { title: "Gwayi Shangani Dam", description: "The construction of the Gwayi Shangani Dam, strategically located in Hwange District, is poised to deliver substantial benefits to Bulawayo, Binga, Lupane, and surrounding communities. This vital infrastructure will provide essential water resources, facilitating agricultural activities in regions that have historically faced water shortages. By addressing these critical needs, the dam supports the government’s objective of restoring Zimbabwe's reputation as the 'breadbasket of Africa.' This initiative reflects a deep commitment to sustainable development and agricultural revitalization, positioning Zimbabwe for enhanced food security and economic resilience." },
    { title: "Rural Electrification Programme", description: "The Rural Electrification Programme, managed by the Rural Electrification Fund (REF), focuses on extending modern energy services to rural areas through both grid extension and innovative off-grid solutions such as solar and biogas. Recent projects in Matabeleland North Province, including a completed 60kW solar mini-grid in Tsholotsho, highlight the ongoing electrification efforts aimed at improving the quality of life for rural communities. Initiated in 1983, this program exemplifies a long-term commitment to inclusivity and equity, ensuring that all Zimbabweans have access to reliable energy sources, which are crucial for economic development and social progress." },
    { title: "Palm River Energy (Plant) - Beitbridge", description: "The Palm River Energy and Metallurgical Special Economic Zone, implemented in 2025, is a transformative project reshaping the rural landscape of Beitbridge. This initiative has already created 110 jobs, with 870 positions filled by local community members, showcasing the project's impact on local employment and economic empowerment. As President Mnangagwa frequently asserts, 'nyika inovakwa ne vene vayo' (the country is built by its people). By fostering local participation in development initiatives like this one, the government is not only addressing unemployment but also encouraging community involvement in shaping the future of Zimbabwe." },
    { title: "Modernization of Border Posts", description: "Under the leadership of President Mnangagwa, Zimbabwe has made significant strides in modernizing its border posts, including the ambitious Beitbridge Border Post Expansion Project. This initiative is critical for enhancing the efficiency of cross-border trade and is expected to yield substantial economic benefits. By reducing congestion and streamlining customs processes, the expansion aims to increase revenue inflows for the country while improving the overall experience for travelers and traders alike. The modernization of border posts is not just a logistical improvement; it is a cornerstone of Zimbabwe's broader economic strategy.The Beitbridge expansion serves as a pivotal point for trade between Zimbabwe and its neighbors, reinforcing the country's commitment to development and regional integration. This forward-looking approach not only enhances economic stability but also fosters a collaborative environment that benefits all stakeholders involved." },
  ],
  education: [
    { title: "Education 5.0", description: "Championed the Education 5.0 model in higher and tertiary education, focusing on teaching, research, community service, innovation, and industrialization to produce relevant, problem-solving graduates." },
    { title: "Innovation Hubs and Industrial Parks", description: "Established innovation hubs and industrial parks at state universities to nurture student-led startups, promote research, and commercialize new technologies." },
    { title: "Basic Education Support", description: "Rolled out the Free Primary Education policy and provided grants for school infrastructure development, textbook provision, and ICT equipment to improve access and quality." },
    { title: "Science and Technology Focus", description: "Promoted STEM education through the construction of specialized schools and providing resources to foster a new generation of scientists and innovators." },
  ],
  health: [
    { title: "Healthcare Infrastructure Upgrade", description: "Oversaw the construction and refurbishment of hospitals and clinics nationwide, including the provision of modern medical equipment to improve access to quality healthcare." },
    { title: "Local Pharmaceutical Production", description: "Promoted local production of essential medicines and medical supplies, with companies like Varichem and CAPS Pharmaceuticals increasing their manufacturing capacity." },
    { title: "Pandemic Response and Vaccination", description: "Led a comprehensive national response to the COVID-19 pandemic, achieving one of Africa's highest vaccination rates through a multi-pronged procurement and distribution strategy." },
    { title: "Presidential He-Goat Scheme", description: "Launched a nationwide livestock program to improve rural household nutrition and income by distributing goats, promoting food security at a local level." },
  ],
};

const categories: { value: keyof typeof achievements; label: string; icon: LucideIcon }[] = [
  { value: "economy", label: "Economy", icon: DollarSign },
  { value: "education", label: "Education", icon: GraduationCap },
  { value: "health", label: "Health", icon: HeartPulse },
];

export default function AchievementsPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <PageHeader
          eyebrow="By sector"
          title="Key Achievements"
          description="A showcase of the President's and his party's major achievements and initiatives, categorized by sector."
        />

        <Tabs defaultValue="economy" className="w-full">
          <Reveal delay={100}>
            <TabsList className="grid h-auto w-full grid-cols-1 gap-1 p-1.5 md:grid-cols-3">
              {categories.map(({ value, label, icon: Icon }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="text-md py-2.5 md:text-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-accent/30"
                >
                  <Icon className="mr-2 h-5 w-5" /> {label}
                  <span className="ml-2 rounded-full bg-black/10 px-2 py-0.5 text-xs font-semibold">
                    {achievements[value].length}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Reveal>

          {categories.map(({ value }) => (
            <TabsContent key={value} value={value} className="mt-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                {achievements[value].map((item, index) => (
                  <Reveal key={item.title} delay={Math.min(index, 4) * 80}>
                    <SpotlightCard className="h-full border-primary/20">
                      <CardHeader className="flex-row items-start gap-4 space-y-0">
                        <span className="glass-strong flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-ui text-sm font-bold text-accent-foreground bg-accent/80">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <CardTitle className="font-headline text-2xl leading-tight text-primary">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ExpandableText text={item.description} />
                      </CardContent>
                    </SpotlightCard>
                  </Reveal>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
