import { NextUIProvider } from "@nextui-org/system";
import "./globals.css";
import Head from "next/head";
import Script from "next/script";
import { v4 as uuidv4 } from "uuid";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userIdScript = `
    (function() {
      var userId = localStorage.getItem('userId');
      if (!userId) {
        userId = '${uuidv4()}'; 
        localStorage.setItem('userId', userId);
      }
      fbq('init', '535765588843358', {
        external_id: userId  
      });
      fbq('track', 'PageView');
    })();
  `;

  return (
    <html lang="en">
      <Head>
        <title>Calorie Counter</title>
      </Head>
      <body className="bg-primaryBgColor h-svh">
        <NextUIProvider>{children}</NextUIProvider>
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`       
        !function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');

            `}
        </Script>
        <Script id="fb-pixel-init" strategy="afterInteractive">
          {userIdScript}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=535765588843358&ev=PageView&noscript=1"
          />
        </noscript>
      </body>
    </html>
  );
}
