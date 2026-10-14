import type { Metadata } from 'next';
import { Fraunces, Literata, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster"
import { FirebaseClientProvider } from '@/firebase';
import { ScrollEffects } from '@/components/layout/scroll-effects';

// Display serif for headings (real weights + optical sizing), humanist sans for UI labels,
// and Literata for long-form reading. Self-hosted by next/font, so no layout shift.
const headlineFont = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-headline',
  axes: ['opsz'],
});
const bodyFont = Literata({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  axes: ['opsz'],
});
const uiFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ui',
});

export const metadata: Metadata = {
  title: 'ZimArchive',
  description: "Explore the achievements and history of Zimbabwe's President and party.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${headlineFont.variable} ${bodyFont.variable} ${uiFont.variable}`}
    >
      <head>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="font-body antialiased bg-background">
        <div className="ambient-bg" aria-hidden>
          <span className="ambient-blob ambient-blob-1" />
          <span className="ambient-blob ambient-blob-2" />
          <span className="ambient-blob ambient-blob-3" />
        </div>
        <FirebaseClientProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="page-in flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <ScrollEffects />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
