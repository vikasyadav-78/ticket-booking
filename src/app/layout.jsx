import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
// import RoyalCursor from "@/components/common/RoyalCursor";
import LayoutWrapper from "@/components/common/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Jaipur Travel",
  description: "Royal Heritage Booking Platform",
};

export default function RootLayout({ children, }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} >
      <body className="min-h-full flex flex-col">
        <Providers>
          <SmoothScrollProvider>
            {/* <RoyalCursor /> */}
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </SmoothScrollProvider>
        </Providers>
      </body>
    </html>
  );
}