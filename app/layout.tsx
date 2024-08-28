import { NextUIProvider } from "@nextui-org/system";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#FFF5E5]">
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
