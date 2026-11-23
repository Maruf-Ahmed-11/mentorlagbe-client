import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "MentorLagbe | The Premier Tuition & Mentorship Platform in Bangladesh",
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
        >
          {`
            (function() {
              try {
                var stored = localStorage.getItem('theme');
                if (stored === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                }
              } catch (e) {}
            })();
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-200 selection:bg-[#E11D48] selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#1C0307",
              color: "#FFFFFF",
              border: "1px solid rgba(225, 29, 72, 0.4)",
              boxShadow: "0 10px 30px rgba(225, 29, 72, 0.3)",
            },
            success: {
              iconTheme: {
                primary: "#FF1E40",
                secondary: "#FFFFFF",
              },
            },
            error: {
              iconTheme: {
                primary: "#880816",
                secondary: "#FFFFFF",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
