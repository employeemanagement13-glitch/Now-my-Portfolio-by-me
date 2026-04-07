// app/layout.tsx
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { googleSansFlex } from "./ui/font";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shahzilshahzad.com"),
  title: {
    template: "%s | Shahzil Shahzad - System Development",
    default: "Shahzil Shahzad | Full-Stack System & Web Developer",
  },
  description:
    "Need a scalable cloud system, SaaS MVP, or a high-converting web presence? I architect, design, and build custom business applications—from blazing-fast frontends to complex enterprise ERP solutions. Let's turn your ideas into a measurable digital success.",
  keywords: [
    "System Developer",
    "Web Developer",
    "SaaS Development",
    "Cloud Architecture",
    "ERP Developer",
    "POS Systems",
    "Webflow Expert",
    "No-code Integrations",
    "Freelance Software Engineer"
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Shahzil Shahzad Portfolio",
    title: "Shahzil Shahzad | Full-Stack System & Web Developer",
    description:
      "Expert systems and modern web developer specializing in SaaS platforms, cloud integrations, and enterprise web solutions tailored to fuel your business growth.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shahzil Shahzad | System & Web Developer",
    description: "Architecting scalable cloud systems, SaaS platforms, and enterprise-grade web applications.",
  },
  alternates: {
    canonical: "/",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Shahzil Shahzad',
    url: 'https://shahzilshahzad.com',
    image: 'https://shahzilshahzad.com/shahzil.png',
    jobTitle: 'System & Web Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance'
    },
    sameAs: [
      'https://www.linkedin.com/in/shahzil-shahzad-563b8031a/',
      'https://x.com/shahzil_tech',
      'https://www.instagram.com/shahzil.shahzad'
    ]
  };

  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${googleSansFlex.className} h-full antialiased`}
      >
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </head>
        <body className={`${googleSansFlex.className} min-h-full flex flex-col`}>
          {children}
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
