import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Presentation } from "lucide-react";

const timelineData = [
  {
    year: "1942",
    title: "Birth and Early Life",
    description: "Born in Zvishavane, his early years in a rural setting were shaped by a strong work ethic and a growing awareness of the political landscape.",
  },
  {
    year: "1960s-70s",
    title: "Political Activism and Liberation Struggle",
    description: "Joined the nationalist movement, receiving military training in China and Egypt. Became a key figure in the liberation war as a member of the Zimbabwe African National Liberation Army (ZANLA).",
  },
  {
    year: "1977",
    title: "Special Assistant to the President",
    description: "Appointed as Special Assistant to ZANU leader Robert Mugabe, becoming one of his most trusted aides and a key strategist during the Lancaster House talks.",
  },
  {
    year: "1980",
    title: "Minister of State Security",
    description: "Following Zimbabwe's independence, he was appointed as the first Minister of State Security, a critical role in the new government.",
  },
  {
    year: "1988-2017",
    title: "Various Ministerial Roles",
    description: "Held several senior cabinet positions, including Minister of Justice, Legal and Parliamentary Affairs, and Speaker of Parliament, contributing to the nation's governance.",
  },
  {
    year: "2014",
    title: "First Vice President",
    description: "Appointed as First Vice President of Zimbabwe, responsible for overseeing key government programs and national development agendas.",
  },
  {
    year: "2017",
    title: "Inauguration as President",
    description: "Sworn in as the second Executive President of Zimbabwe on November 24, 2017, ushering in the 'New Dispensation' focused on economic reform and national unity.",
  },
  {
    year: "2018-Present",
    title: "Leading the Nation",
    description: "Re-elected in 2018 and 2023, continues to lead with Vision 2030, aiming for an upper-middle-income economy through policies like the NDS1, engagement, and infrastructure development.",
  },
];

export default function TimelinePage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-headline text-primary mb-4">Presidential Timeline</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A chronological journey through the life, career, and key moments of the President of Zimbabwe.
          </p>
        </div>

        <div className="relative wrap overflow-hidden p-4 md:p-10 h-full">
          <div className="absolute border-opacity-20 border-primary/20 h-full border-2 left-5 md:left-1/2 md:-translate-x-1/2"></div>
          
          {timelineData.map((item, index) => (
            <div key={item.year} className="mb-8 flex md:justify-between items-center w-full flex-col md:flex-row">
              {/* Desktop: right side */}
              <div className="hidden md:flex order-1 w-5/12"></div>
              
              {/* Mobile: empty div for spacing */}
              <div className="order-1 w-full md:w-5/12 md:hidden"></div>

              {/* Icon */}
              <div className="z-20 flex items-center order-1 bg-accent shadow-xl w-12 h-12 rounded-full absolute left-5 -translate-x-1/2 md:relative md:left-auto md:translate-x-0">
                <Presentation className="mx-auto text-primary font-bold text-lg w-6 h-6" />
              </div>

              {/* Card */}
              <div className="order-1 w-full md:w-5/12 pl-12 md:pl-6 md:pr-0 py-4">
                 <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300 border-primary/20 bg-card">
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
          ))}
        </div>
      </div>
    </div>
  );
}
