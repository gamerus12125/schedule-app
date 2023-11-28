"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation/Navigation";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: never;
}) {
  return (
    <html lang="ru">
      <head>
        <title>Site for schedule</title>
        <meta name="description" content="Description" />
      </head>
      <SessionProvider session={session}>
        <body className={inter.className}>
          <Navigation />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
