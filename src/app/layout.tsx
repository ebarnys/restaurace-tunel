import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";

const leagueSpartan = League_Spartan({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Restaurace TUNEL Plzeň",
  description: "Tradiční česká restaurace v Plzni. Tankové pivo, polední menu, soukromé akce, terasa.",
  keywords: "restaurace, Plzeň, polední menu, tankové pivo, Pilsner Urquell, terasa, firemní akce",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body className={leagueSpartan.className}>{children}</body>
    </html>
  );
}
