import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Haguenau.pro - Annuaire des entreprises locales",
  description: "Découvrez toutes les entreprises de Haguenau et ses environs (30 km). Restaurants, commerces, services et plus encore.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
