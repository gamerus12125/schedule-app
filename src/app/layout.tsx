"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import Navigation from "@/components/Navigation/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Site for schedule",
  description: "",
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <html lang="ru">
      <SessionProvider session={session}>
        <body className={inter.className}>
            <Navigation />
            {children}
        </body>
      </SessionProvider>
    </html>
  );
}
