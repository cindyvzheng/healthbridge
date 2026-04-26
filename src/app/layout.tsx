import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "HealthBridge — Healthcare Career Pathways for Students",
  description: "A free toolkit helping low-income students explore healthcare careers. Discover resources, career pathways, and community support — no cost, no barriers.",
  keywords: "healthcare careers, pre-med, public health, health policy, student resources, free",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
