import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteConfig } from "@/lib/site-config";
import { Providers } from "./providers";
import { TailwindIndicator } from "@/components/TailwindIndicator";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
};

export default async function RootLayout({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full w-full" suppressHydrationWarning>
      <body
        className={cn(
          dmSans.variable,
          "h-full bg-background font-sans antialiased"
        )}
      >
        <Providers>
          <div className="relative flex min-h-screen min-w-full flex-col justify-center">
            <div className="w-full h-full">
              {children}
              {auth}
            </div>
          </div>
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}
