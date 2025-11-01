import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Presentation } from "lucide-react";

const timelineData = [
  {
    year: "1942",
    title: "Birth and Early Life",
    description: "Born in Zvishavane, his early years were marked by a strong educational foundation and burgeoning political consciousness.",
  },
  {
    year: "1960s",
    title: "Political Activism and Imprisonment",
    description: "Became actively involved in the liberation struggle against colonial rule. Was arrested and imprisoned for his activities.",
  },
  {
    year: "1977",
    title: "Special Assistant to the President",
    description: "Became a key figure in the party, serving as a special assistant and demonstrating his leadership capabilities.",
  },
  {
    year: "1980",
    title: "Minister of State Security",
    description: "Following Zimbabwe's independence, he was appointed to a critical cabinet position, overseeing national security.",
  },
  {
    year: "2000s",
    title: "Various Ministerial Roles",
    description: "Held several important ministerial portfolios, including Minister of Justice and Speaker of Parliament, contributing significantly to the nation's governance.",
  },
  {
    year: "2014",
    title: "Vice President of Zimbabwe",
    description: "Appointed as Vice President, a role in which he served with distinction, supporting national development agendas.",
  },
  {
    year: "2017",
    title: "Inauguration as President",
    description: "Sworn in as the President of Zimbabwe, ushering in a new era focused on economic reform and national unity.",
  },
  {
    year: "2018-Present",
    title: "Leading the Nation",
    description: "Continues to lead the country with a vision for a prosperous and inclusive Zimbabwe, focusing on economic development, international re-engagement, and improving the lives of all citizens.",
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
