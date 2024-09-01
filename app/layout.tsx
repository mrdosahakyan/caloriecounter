"use client";

import { NextUIProvider } from "@nextui-org/system";
import "./globals.css";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-primaryBgColor h-svh">
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
