'use client';

import { NextUIProvider } from "@nextui-org/system";
import "./globals.css";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  useEffect(() => {
    // Dynamically load the script
    const script = document.createElement('script');
    script.src = '/setVH.js';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Disable scroll when the component mounts (picker is active)
    document.body.classList.add('no-scroll');
  
    // Re-enable scroll when the component unmounts (picker is closed)
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return (
    <html lang="en">
      <body className="bg-[#FFF5E5] full-height">
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
