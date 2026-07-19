import type { Metadata } from "next";
import { headers } from "next/headers";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "www.iniati.org.br";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const socialImage = `${origin}/og.png`;

  return {
    title: "INIATI | Ciência aplicada. Impacto real.",
    description: "Instituto Nacional de Inovação Aplicada à Tecnologia da Informação. Pesquisa, desenvolvimento e inovação para transformar desafios em tecnologia.",
    icons: {
      icon: "/iniati-logo.webp",
      shortcut: "/iniati-logo.webp",
    },
    openGraph: {
      title: "INIATI | Ciência aplicada. Impacto real.",
      description: "Pesquisa que vira tecnologia. Tecnologia que gera impacto.",
      type: "website",
      locale: "pt_BR",
      siteName: "INIATI",
      url: origin,
      images: [{ url: socialImage, width: 1730, height: 909, alt: "INIATI — Pesquisa que vira tecnologia. Tecnologia que gera impacto." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "INIATI | Ciência aplicada. Impacto real.",
      description: "Pesquisa que vira tecnologia. Tecnologia que gera impacto.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ResearchOrganization",
    name: "INIATI — Instituto Nacional de Inovação Aplicada à Tecnologia da Informação",
    url: "https://www.iniati.org.br/",
    email: "contato@iniati.org.br",
    logo: "https://www.iniati.org.br/iniati-logo.webp",
    areaServed: "Brasil",
  };

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
