import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Cursor } from "@/components/cursor";
import { CommandPalette } from "@/components/command-palette";
import { ScrollProgress } from "@/components/scroll-progress";
import { MagneticFields } from "@/components/magnetic-fields";
import { caseStudies, person, SITE_URL } from "@/lib/content";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${person.name} · ${person.role}`,
  description:
    "Web developer and software engineer in Kolkata. Interactive web apps, Python tools and computer vision, with live repositories and deployments.",
  openGraph: {
    title: `${person.name} · ${person.role}`,
    description:
      "Web developer and software engineer in Kolkata. Interactive web apps, Python tools and computer vision, with live repositories and deployments.",
    url: SITE_URL,
    siteName: person.name,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

const sections = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Stack", href: "/#stack" },
  { label: "Background", href: "/#experience" },
  { label: "Elsewhere", href: "/#writing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="button-sm sr-only rounded-lg bg-ink px-3 py-2 text-cream focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60]"
        >
          Skip to content
        </a>
        <Cursor />
        <ScrollProgress />
        <MagneticFields />
        <Nav
          email={person.email}
          palette={
            <CommandPalette
              sections={sections}
              projects={caseStudies.map((c) => ({
                title: c.title,
                sub: c.kicker,
                href: `/work/${c.slug}`,
              }))}
            />
          }
        />
        {children}
      </body>
    </html>
  );
}
