import "../styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { Toaster } from "@/components/ui/Toaster";

export const metadata = {
  title: "Outpost - Online marketplace",
  description: "Online marketplace",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
