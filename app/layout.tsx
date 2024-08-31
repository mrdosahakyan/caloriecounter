"use client";

import { NextUIProvider } from "@nextui-org/system";
import "./globals.css";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useEffect(() => {
  //   // Dynamically load the script
  //   const script = document.createElement("script");
  //   script.src = "/setVH.js";
  //   script.async = true;
  //   document.body.appendChild(script);

  //   // Cleanup function to remove the script when the component unmounts
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  return (
    <html lang="en">
      <body className="bg-[#FFF5E5] h-svh">
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
