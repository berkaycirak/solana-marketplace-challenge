import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RabidHall",
  description:
    "You can buy and list rabiddos to unlock new features of NFTs on RabidHall Marketplace. The are fluffy and warrior type.Also, they seem funny but I wouldn't make them angry if I were you ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("flex h-dvh min-h-dvh flex-col", inter.className)}>
        <Providers>
          <Navbar />
          <main className="flex-1"> {children}</main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
