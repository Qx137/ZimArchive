
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, GraduationCap, HeartPulse } from "lucide-react";

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

export default function AchievementsPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-headline text-primary mb-4">Key Achievements</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A showcase of the President&apos;s and his party&apos;s major achievements and initiatives, categorized by sector.
          </p>
        </div>

        <Tabs defaultValue="economy" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 bg-primary/10 p-2 h-auto">
            <TabsTrigger value="economy" className="py-2 text-md md:text-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-md">
              <DollarSign className="mr-2 h-5 w-5"/> Economy
            </TabsTrigger>
            <TabsTrigger value="education" className="py-2 text-md md:text-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-md">
              <GraduationCap className="mr-2 h-5 w-5"/> Education
            </TabsTrigger>
            <TabsTrigger value="health" className="py-2 text-md md:text-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-md">
              <HeartPulse className="mr-2 h-5 w-5"/> Health
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="economy" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {achievements.economy.map((item) => (
                <Card key={item.title} className="shadow-lg border-primary/20 hover:border-primary/40 transition-all">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="font-body text-base text-muted-foreground">{item.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="education" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {achievements.education.map((item) => (
                <Card key={item.title} className="shadow-lg border-primary/20 hover:border-primary/40 transition-all">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary">{item.title}</CardTitle>

                  </CardHeader>
                  <CardContent>
                    <CardDescription className="font-body text-base text-muted-foreground">{item.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="health" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {achievements.health.map((item) => (
                <Card key={item.title} className="shadow-lg border-primary/20 hover:border-primary/40 transition-all">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="font-body text-base text-muted-foreground">{item.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
