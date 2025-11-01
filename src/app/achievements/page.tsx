import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, GraduationCap, HeartPulse } from "lucide-react";

const achievements = {
  economy: [
    { title: "National Development Strategy 1 (NDS1)", description: "Launched the NDS1, a five-year economic blueprint aimed at achieving an upper-middle-income economy by 2030 through inclusive growth and sustainable development." },
    { title: "Infrastructure Development", description: "Spearheaded major infrastructure projects including the rehabilitation of the Beitbridge-Harare-Chirundu highway, expansion of the Robert Gabriel Mugabe International Airport, and construction of the Gwayi-Shangani Dam." },
    { title: "'Zimbabwe is Open for Business'", description: "Championed a global engagement drive to attract foreign direct investment, resulting in new ventures in mining (lithium, platinum), agriculture, and energy sectors." },
    { title: "Currency and Economic Stabilization", description: "Implemented various fiscal and monetary policy reforms aimed at stabilizing the local currency and curbing inflation, including the introduction of the ZiG currency." },
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
            A showcase of the President's and his party's major achievements and initiatives, categorized by sector.
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
