import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700", "800"],
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dataFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-data",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Siva Surya P | AI Engineer & Full Stack Developer",
  description: "Personal portfolio of Siva Surya P, third-year B.Tech IT student at Sri Shakthi Institute of Engineering and Technology. Specializing in LangGraph agent workflows, RAG pipelines, and full-stack API engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${displayFont.variable} ${bodyFont.variable} ${dataFont.variable} scroll-smooth`}
    >
      <body className="antialiased bg-canvas text-text-primary">
        {children}
      </body>
    </html>
  );
}
