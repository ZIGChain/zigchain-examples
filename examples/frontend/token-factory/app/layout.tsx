import NavigationBar from "@/components/navigation-bar";
import "@interchain-ui/react/styles";
import clsx from "clsx";
import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-inter",
});
const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ps2p",
});

export const metadata: Metadata = {
  title:
    process.env.NEXT_PUBLIC_SITE_TITLE ?? "Token Factory",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ?? "Token Factory on Zigchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={clsx("min-h-screen", inter.className, pressStart2P.variable)}
      >
        <Providers>
          <NavigationBar />
          {children}
        </Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
