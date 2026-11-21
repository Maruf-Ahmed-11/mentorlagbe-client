import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MentorLagbe | Find Your Ideal Mentor & Tuition in Bangladesh",
  description: "Find your perfect tutor or share your expertise with students across Bangladesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#07080B] text-slate-100 selection:bg-[#7C8CE4] selection:text-[#07080B]">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#0E1018",
              color: "#F8FAFC",
              border: "1px solid #1E2335",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8)",
            },
            success: {
              iconTheme: {
                primary: "#7C8CE4",
                secondary: "#07080B",
              },
            },
            error: {
              iconTheme: {
                primary: "#BE123C",
                secondary: "#FFFFFF",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
