"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster richColors />
        <SidebarProvider defaultOpen={false}>{children}</SidebarProvider>
      </ThemeProvider>
    </>
  );
};
