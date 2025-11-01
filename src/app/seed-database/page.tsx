
"use client";

import { useEffect, useState } from "react";
import { collection, doc, writeBatch } from "firebase/firestore";
import { useFirestore } from "@/firebase";
import { Button } from "@/components/ui/button";

// This is the raw data from the original JSON file.
// We are embedding it here for this one-time seeding process.
const placeholderImagesData = {
  placeholderImages: [
    {
      id: "hero-main",
      altText: "A dramatic, colorful sunset over the Zimbabwean landscape.",
      imageUrl: "https://images.unsplash.com/photo-1544198422-33759a229352?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageHint: "dramatic sunset",
    },
    {
      id: "hero-timeline",
      altText: "An old, weathered book open to a page with handwritten notes.",
      imageUrl: "https://images.unsplash.com/photo-1472173148041-00294f0814a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxoaXN0b3J5JTIwYm9va3xlbnwwfHx8fDE3NjE5OTE1NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      imageHint: "history book",
    },
    {
      id: "hero-achievements",
      altText: "The newly constructed Mbudzi interchange in Harare, an example of modern infrastructure.",
      imageUrl: "https://images.unsplash.com/photo-1611911029245-a8a2f3b9c245?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageHint: "modern infrastructure",
    },
    {
      id: "hero-history",
      altText: "A vintage black and white photograph of a political gathering.",
      imageUrl: "https://images.unsplash.com/photo-1576858688752-d7d4dbd6686a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxoaXN0b3JpY2FsJTIwcGhvdG98ZW58MHx8fHwxNzYxOTkxNTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      imageHint: "historical photo",
    },
    {
      id: "hero-gallery",
      altText: "A collection of framed photos on a wall.",
      imageUrl: "https://images.unsplash.com/photo-1614447412838-3f4ebd5c2dc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxwaG90byUyMGdhbGxlcnl8ZW58MHx8fHwxNzYxODg5NzAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      imageHint: "photo gallery",
    },
    {
      id: "gallery-1",
      altText: "President giving a speech at a podium with the national flag.",
      imageUrl: "https://images.unsplash.com/photo-1609051336245-eac70fc7bac5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwb2xpdGljYWwlMjBzcGVlY2h8ZW58MHx8fHwxNzYxOTkxNTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      imageHint: "political speech",
    },
    {
      id: "gallery-2",
      altText: "President meeting with international investors for a mining deal.",
      imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmd8ZW58MHx8fHwxNzYyMTIyOTI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      imageHint: "business meeting",
    },
    {
      id: "gallery-3",
      altText: "President launching a new road construction project.",
      imageUrl: "https://images.unsplash.com/photo-1520986639249-3c82700a0624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxyb2FkJTIwY29uc3RydWN0aW9ufGVufDB8fHx8MTc2MjEyMjk2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      imageHint: "road construction",
    },
    {
      id: "gallery-4",
      altText: "A large crowd at a ZANU-PF rally.",
      imageUrl: "https://images.unsplash.com/photo-1589463313938-333ed89c7217?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwb2xpdGljYWwlMjByYWxseXxlbnwwfHx8fDE3NjE5ODA2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      imageHint: "political rally",
    },
    {
      id: "gallery-5",
      altText: "President visiting a newly equipped hospital wing.",
      imageUrl: "https://images.unsplash.com/photo-1538108144229-07b463337906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMHdhcmR8ZW58MHx8fHwxNzYyMTIzMDQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      imageHint: "hospital ward",
    },
    {
      id: "gallery-6",
      altText: "President inspecting a farm during the Pfumvudza/Intwasa program launch.",
      imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxmYXJtJTIwaW5zcGVjdGlvbnxlbnwwfHx8fDE3NjIxMjMwODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      imageHint: "farm inspection",
    },
    {
      id: "gallery-7",
      altText: "The new Robert Gabriel Mugabe International Airport terminal.",
      imageUrl: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhirportJTIwdGVybWluYWx8ZW58MHx8fHwxNzYyMTIzMTIwfDA&ixlib-rb-4.1.0&q=80&w=1080",
      imageHint: "airport terminal",
    },
    {
      id: "gallery-8",
      altText: "Graduation ceremony at a state university with new innovation hubs.",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MHx8fHwxNzYyMTIzMTU1fDA&ixlibrb-4.1.0&q=80&w=1080",
      imageHint: "graduation ceremony",
    },
    {
      id: "gallery-9",
      altText: "President at the launch of the National Development Strategy 1 (NDS1).",
      imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxhdW5jaHxlbnwwfHx8fDE3NjIxMjMxODh8MA&ixlib-rb-4.1.0&q=80&w=1080",
      imageHint: "business launch",
    },
    {
      id: "timeline-1",
      altText: "Emmerson Mnangagwa during his early years.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/31/Emmerson_Mnangagwa_Official_Portrait.jpg",
      imageHint: "vintage portrait",
    },
    {
      id: "timeline-2",
      altText: "Guerrilla fighters during the Rhodesian Bush War.",
      imageUrl: "https://images.unsplash.com/photo-1520176059343-3e3901b6a73c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageHint: "liberation war",
    },
    {
      id: "timeline-3",
      altText: "Robert Mugabe and other ZANU leaders in the 1970s.",
      imageUrl: "https://images.unsplash.com/photo-1604213410145-54652c77f0d4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageHint: "historical leaders",
    },
    {
      id: "timeline-4",
      altText: "The Zimbabwean Parliament building in Harare.",
      imageUrl: "https://images.unsplash.com/photo-1613926987422-7f720370a254?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageHint: "parliament building",
    },
    {
      id: "timeline-5",
      altText: "Official portrait of Emmerson Mnangagwa.",
      imageUrl: "https://www.zbcnews.co.zw/wp-content/uploads/2024/09/IMG-20240901-WA0147.jpg",
      imageHint: "official portrait",
    },
    {
      id: "timeline-6",
      altText: "Emmerson Mnangagwa taking the oath of office in 2017.",
      imageUrl: "https://www.aljazeera.com/wp-content/uploads/2023/08/33TT9AZ-highres-1-1693132132.jpg?quality=80&resize=770%2C513",
      imageHint: "presidential inauguration",
    },
    {
      id: "timeline-7",
      altText: "President Mnangagwa at a campaign rally.",
      imageUrl: "https://i.guim.co.uk/img/media/e26806b2636b65948c3a0133dde1a9262f98c1f4/0_200_6000_3600/master/6000.jpg?crop=none&dpr=1&s=none&width=465",
      imageHint: "campaign rally",
    },
    {
      id: "timeline-8",
      altText: "President Mnangagwa delivering a speech at a recent event.",
      imageUrl: "https://media.cnn.com/api/v1/images/stellar/prod/171124104634-09-emmerson-mnangagwa-1124.jpg?q=w_3000%2Ch_1902%2Cx_0%2Cy_0%2Cc_fill",
      imageHint: "official speech",
    },
    {
      id: "history-origins-2",
      altText: "A graphic showing the split of ZAPU and the formation of ZANU.",
      imageUrl: "https://www.tandfonline.com/cms/asset/775c8bd9-2a79-42aa-a41a-f2db27fe7d2c/cjss_a_1281040_f0001_oc.gif",
      imageHint: "historical chart",
    },
    {
      id: "key-figure-mugabe",
      altText: "Robert Mugabe and Joshua Nkomo, two key figures in Zimbabwe's liberation.",
      imageUrl: "https://www.victoriafalls-guide.net/images/nkomo-and-mugabe.jpg",
      imageHint: "historical leaders",
    },
    {
      id: "key-figure-nkomo",
      altText: "A portrait of Joshua Nkomo, leader of ZAPU.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/01/Joshua_Nkomo_%281978%29.jpg",
      imageHint: "portrait leader",
    },
    {
      id: "key-figure-chitepo",
      altText: "A portrait of Herbert Chitepo, the first black barrister in Rhodesia.",
      imageUrl: "https://www.dandaro.online/wp-content/uploads/2025/06/herbert-chitepo.jpg",
      imageHint: "portrait lawyer",
    },
    {
      id: "milestone-struggle",
      altText: "ZANLA combatants during the liberation struggle.",
      imageUrl: "https://www.zimbabwesituation.com/wp-content/uploads/2017/11/21zimbabwe-personal1-superJumbo.jpg",
      imageHint: "liberation fighters",
    },
    {
      id: "milestone-independence",
      altText: "Celebrations on Zimbabwe's Independence Day in 1980.",
      imageUrl: "https://www.victoriafalls-guide.net/image-files/zimbabwe-independence-day.jpg",
      imageHint: "independence celebration",
    },
    {
      id: "milestone-unity",
      altText: "Robert Mugabe and Joshua Nkomo signing the Unity Accord in 1987.",
      imageUrl: "https://cite.org.zw/wp-content/uploads/2024/12/Mugabe-NKOMO.jpg",
      imageHint: "political agreement",
    },
    {
      id: "milestone-land-reform",
      altText: "A farmer on a redistributed farm in Zimbabwe.",
      imageUrl: "https://www.zimbabwesituation.com/wp-content/uploads/2019/12/Zimbabwe-Farm-Invasions.jpeg",
      imageHint: "farming land",
    },
    {
      id: "milestone-new-dispensation",
      altText: "Emmerson Mnangagwa being sworn in as President in 2017.",
      imageUrl: "https://www.aljazeera.com/wp-content/uploads/2023/08/33TT9AZ-highres-1-1693132132.jpg?quality=80&resize=770%2C513",
      imageHint: "presidential inauguration",
    },
    {
      id: "ideology-structure",
      altText: "The ZANU-PF headquarters building in Harare.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Zanu_PF_Building.jpg",
      imageHint: "political building",
    },
    {
      id: "challenges-turning-points",
      altText: "A crowd of opposition supporters at a rally.",
      imageUrl: "https://images.unsplash.com/photo-1549492423-4002122c3753?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageHint: "political rally",
    }
  ],
};


export default function SeedDatabasePage() {
  const firestore = useFirestore();
  const [isSeeding, setIsSeeding] = useState(false);
  const [status, setStatus] = useState("Ready to seed database.");

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    setStatus("Seeding database... this may take a moment.");

    try {
      const batch = writeBatch(firestore);
      const imagesCollection = collection(firestore, "images");

      placeholderImagesData.placeholderImages.forEach((image) => {
        const docRef = doc(imagesCollection, image.id);
        const { id, ...imageData } = image; // Exclude id from the document data
        batch.set(docRef, imageData);
      });

      await batch.commit();
      setStatus("Database seeded successfully!");
    } catch (error) {
      console.error("Error seeding database:", error);
      setStatus(`Error seeding database: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Database Seeder</h1>
      <p className="text-muted-foreground mb-8">
        Click the button below to populate your Firestore database with the initial image data.
        You only need to do this once.
      </p>
      <Button onClick={handleSeedDatabase} disabled={isSeeding}>
        {isSeeding ? "Seeding..." : "Seed Database"}
      </Button>
      <p className="mt-4 text-sm text-muted-foreground">{status}</p>
    </div>
  );
}

    