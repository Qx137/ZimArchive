import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, GraduationCap, HeartPulse } from "lucide-react";

const achievements = {
  economy: [
    { title: "Economic Stabilization", description: "Implemented key reforms to stabilize the currency and control inflation, creating a more predictable economic environment for businesses and citizens." },
    { title: "Infrastructure Development", description: "Launched major infrastructure projects, including road rehabilitation, dam construction, and power generation upgrades to support economic growth." },
    { title: "'Zimbabwe is Open for Business'", description: "Spearheaded a global engagement drive to attract foreign direct investment, resulting in new ventures in mining, agriculture, and manufacturing." },
    { title: "Mining Sector Growth", description: "Facilitated significant investments in the mining sector, aiming to create a US$12 billion mining industry by expanding exploration and production." },
  ],
  education: [
    { title: "Education 5.0", description: "Championed the Education 5.0 model, transforming higher education to focus on innovation, industrialization, and problem-solving for national development." },
    { title: "Innovation Hubs", description: "Established innovation hubs at state universities to nurture student-led startups and commercialize research, linking academia with industry." },
    { title: "Basic Education Support", description: "Increased support for basic education through school construction, textbook provision, and programs aimed at improving literacy and numeracy rates." },
    { title: "Teacher Welfare", description: "Initiated programs to improve the welfare and working conditions of teachers, recognizing their crucial role in national development." },
  ],
  health: [
    { title: "Healthcare Infrastructure Upgrade", description: "Oversaw the construction and refurbishment of hospitals and clinics across the country to improve access to quality healthcare for all." },
    { title: "Pharmaceutical Production", description: "Promoted local production of essential medicines and medical supplies to reduce reliance on imports and ensure availability." },
    { title: "Pandemic Response", description: "Led a comprehensive national response to the COVID-19 pandemic, including successful vaccination campaigns and strengthening of the public health system." },
    { title: "Primary Healthcare Expansion", description: "Focused on expanding primary healthcare services, particularly in rural areas, to ensure early diagnosis and treatment of common ailments." },
  ],
};

export default function AchievementsPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-headline text-primary mb-4">Key Achievements</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A showcase of the President's and his party's major achievements and initiatives, categorized by sector.
          </p>
        </div>

        <Tabs defaultValue="economy" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 bg-primary/10 p-2 h-auto">
            <TabsTrigger value="economy" className="py-2 text-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-md">
              <DollarSign className="mr-2"/> Economy
            </TabsTrigger>
            <TabsTrigger value="education" className="py-2 text-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-md">
              <GraduationCap className="mr-2"/> Education
            </TabsTrigger>
            <TabsTrigger value="health" className="py-2 text-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-md">
              <HeartPulse className="mr-2"/> Health
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
