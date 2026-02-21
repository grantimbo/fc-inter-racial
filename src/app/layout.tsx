import Script from 'next/script';
import type { Metadata } from "next";
import { Poppins, Bebas_Neue } from "next/font/google";
import "./globals.css";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const bebbas = Bebas_Neue({
  variable: "--font-bebas",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inter Racial Football Club",
  description: "Based in the heart of Dumaguete City, our club is defined by a passion for the beautiful game.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${bebbas.variable} antialiased`}>
        {/* 1. The fb-root div must be at the top level of the body */}
        <div id="fb-root"></div>

        {children}

        {/* 2. The SDK Script using Next.js optimization */}
        <Script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v22.0&appId=250706382314503"
          strategy="afterInteractive" 
        />
      </body>
    </html>
  );
}