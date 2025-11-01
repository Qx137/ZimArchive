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
      altText: "A majestic view of the Zimbabwe landscape at sunrise.",
      imageUrl: "https://images.unsplash.com/photo-1558013533-a3b555e3a890?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxaaW1iYWJ3ZSUyMGxhbmRzY2FwZXxlbnwwfHx8fDE3NjIxMjI3MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      imageHint: "Zimbabwe landscape",
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
      imageUrl: "https://images.unsplash.com/photo-1520986639249-3c82700a0624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxyb2FkJTIwY29uc3RydWN0aW9ufGVufDB8fHx8MTc2MjEyMjk2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
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
      imageUrl: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhirportJTIwdGVybWluYWx8ZW58MHx8fHwxNzYyMTIzMTIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
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
      imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxhdW5jaHxlbnwwfHx8fDE3NjIxMjMxODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      imageHint: "business launch",
    },
    {
      id: "history-origins",
      altText: "An archival document detailing the formation of ZANU in 1963.",
      imageUrl: "https://images.unsplash.com/photo-1583445395064-9628a43e4986?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxoaXN0b3JpY2FsJTIwZG9jdW1lbnR8ZW58MHx8fHwxNzYxOTI4ODU2fDA&ixlib-rb-4.1.0&q=80&w=1080",
      imageHint: "historical document",
    },
    {
      id: "key-figure-1",
      altText: "A portrait of Robert Mugabe, a key figure in Zimbabwe's history.",
      imageUrl: "https://images.unsplash.com/photo-1609188737575-de6f9a421e42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG9mJTIwYW4lMjBhZnJpY2FuJTIwbGVhZGVyfGVufDB8fHx8MTc2MjEyMzI4N3ww&ixlib-rb-4.1.0&q=80&w=1080",
      imageHint: "portrait leader",
    },
    {
      id: "key-figure-2",
      altText: "A portrait of Joshua Nkomo, known as 'Father Zimbabwe'.",
      imageUrl: "https://images.unsplash.com/photo-1610212595059-3b69a25f4a7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG9mJTIwYW4lMjBlbGRlcmx5JTIwYWZyaWNhbiUyMG1hbnxlbnwwfHx8fDE3NjIxMjMzMTl8MA&ixlib-rb-4.1.0&q=80&w=1080",
      imageHint: "portrait elder",
    },
    {
      id: "key-figure-3",
      altText: "A portrait of Herbert Chitepo, a nationalist leader.",
      imageUrl: "https://images.unsplash.com/photo-1580893472468-01373fe4c97e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxwb3J0cmFpdCUyMHBlcnNvbnxlbnwwfHx8fDE3NjE5NDgzMDV8MA&ixlib-rb-4.1.0&q=80&w=1080",
      imageHint: "portrait person",
    },
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
