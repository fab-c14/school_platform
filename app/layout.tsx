import type { Metadata } from "next";
import { Newsreader, Outfit } from "next/font/google";
import { getSite } from "@/lib/site-store";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: site.home.title,
      template: `%s · ${site.name}`,
    },
    description: site.description,
    applicationName: site.name,
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: site.name,
      images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.name }],
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${newsreader.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
