"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // Do not render global footer inside dashboard workspace
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }
  return (
    <footer className="relative bg-[#F8FAFC] dark:bg-[#050B14] border-t border-[#E2E8F0] dark:border-[#0284C7]/30 text-[#475569] dark:text-[#E2E8F0] pt-16 pb-8 overflow-hidden transition-colors duration-200">
      {/* Ambient Crimson Spotlight Glow at Base */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[750px] h-[240px] bg-gradient-to-t from-[#BAE6FD]/25 via-[#E0F2FE]/15 to-transparent dark:from-[#0284C7]/25 dark:via-[#0C4A6E]/15 dark:to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 4-Column Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[#E2E8F0] dark:border-[#0284C7]/20">
          
          {/* Column 1: Logo & Tagline */}
          <div className="flex flex-col items-start space-y-4">
            <Logo />
            <p className="text-sm text-[#475569] dark:text-[#E2E8F0]/80 leading-relaxed max-w-xs">
              Find your perfect tutor or share your expertise with students across Bangladesh.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0284C7] dark:text-[#0EA5E9]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0284C7] dark:bg-[#0EA5E9] animate-pulse shadow-[0_0_8px_#0284C7] dark:shadow-[0_0_8px_#0EA5E9]" />
              <span>COMMITTED TO ACADEMIC MASTERY</span>
            </div>
          </div>

          {/* Column 2: Quick Navigation Links */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B1320] dark:text-white flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0284C7] dark:bg-[#0EA5E9] shadow-[0_0_8px_#0284C7] dark:shadow-[0_0_8px_#0EA5E9]" />
              QUICK LINKS
            </h3>
            <ul className="space-y-2.5 text-sm text-[#475569] dark:text-[#E2E8F0]/85">
              <li>
                <Link href="/#home" className="hover:text-[#0284C7] dark:hover:text-[#0EA5E9] hover:translate-x-1 inline-block transition-all">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#tuitions" className="hover:text-[#0284C7] dark:hover:text-[#0EA5E9] hover:translate-x-1 inline-block transition-all">
                  Browse Tuitions
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-[#0284C7] dark:hover:text-[#0EA5E9] hover:translate-x-1 inline-block transition-all">
                  Pricing / Pro Plans
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-[#0284C7] dark:hover:text-[#0EA5E9] hover:translate-x-1 inline-block transition-all">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-[#0284C7] dark:hover:text-[#0EA5E9] hover:translate-x-1 inline-block transition-all">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B1320] dark:text-white flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0284C7] dark:bg-[#0EA5E9] shadow-[0_0_8px_#0284C7] dark:shadow-[0_0_8px_#0EA5E9]" />
              CONTACT INFO
            </h3>
            <div className="space-y-3 text-sm text-[#475569] dark:text-[#E2E8F0]/90">
              {/* Email */}
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FFFFFF] dark:bg-[#102547] border border-[#BAE6FD] dark:border-[#0EA5E9]/60 text-[#0284C7] dark:text-[#0EA5E9] shadow-sm dark:shadow-[0_0_10px_rgba(14, 165, 233,0.3)]">
                  <Mail className="h-3.5 w-3.5 text-[#0284C7] dark:text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase text-[#64748B] dark:text-[#94A3B8]">Email Support</p>
                  <a
                    href="mailto:maruf04ahmed12rohan04@gmail.com"
                    className="font-medium text-[#0B1320] dark:text-white hover:text-[#0284C7] dark:hover:text-[#0EA5E9] transition-colors break-all"
                  >
                    maruf04ahmed12rohan04@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FFFFFF] dark:bg-[#102547] border border-[#BAE6FD] dark:border-[#0EA5E9]/60 text-[#0284C7] dark:text-[#0EA5E9] shadow-sm dark:shadow-[0_0_10px_rgba(14, 165, 233,0.3)]">
                  <Phone className="h-3.5 w-3.5 text-[#0284C7] dark:text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase text-[#64748B] dark:text-[#94A3B8]">Direct Line</p>
                  <a
                    href="tel:+8801773532098"
                    className="font-mono font-bold text-[#0B1320] dark:text-white hover:text-[#0284C7] dark:hover:text-[#0EA5E9] transition-colors"
                  >
                    +880 1773 532 098
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FFFFFF] dark:bg-[#102547] border border-[#BAE6FD] dark:border-[#0EA5E9]/60 text-[#0284C7] dark:text-[#0EA5E9] shadow-sm dark:shadow-[0_0_10px_rgba(14, 165, 233,0.3)]">
                  <MapPin className="h-3.5 w-3.5 text-[#0284C7] dark:text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase text-[#64748B] dark:text-[#94A3B8]">Headquarters</p>
                  <p className="text-xs text-[#475569] dark:text-[#E2E8F0]">
                    1 No. Navy Gate, Khalishpur, Khulna, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Connect & Social Media Links */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B1320] dark:text-white flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0284C7] dark:bg-[#0EA5E9] shadow-[0_0_8px_#0284C7] dark:shadow-[0_0_8px_#0EA5E9]" />
              CONNECT WITH US
            </h3>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
              Follow our verified channels for study tips, tutor spotlights, and platform announcements.
            </p>
            
            {/* Social Grid: Uniform, Organized & Glowing */}
            <div className="grid grid-cols-5 gap-3 pt-2">
              
              {/* 1. Official New X Logo */}
              <a
                href="https://x.com/MarufAhmed614"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
                className="group flex items-center justify-center h-11 w-11 rounded-xl bg-white dark:bg-[#0C4A6E] border-2 border-[#BAE6FD] dark:border-[#0EA5E9] text-[#0B1320] dark:text-white shadow-[0_4px_12px_rgba(2, 132, 199,0.12)] dark:shadow-[0_0_15px_rgba(14, 165, 233,0.4),_inset_0_1px_0_rgba(255,255,255,0.25)] hover:border-[#0284C7] hover:bg-[#0284C7] hover:text-white dark:hover:border-white dark:hover:bg-[#0EA5E9] hover:shadow-[0_6px_20px_rgba(2, 132, 199,0.35)] dark:hover:shadow-[0_0_25px_rgba(14, 165, 233,0.9)] hover:scale-110 transition-all duration-300 cursor-pointer"
                title="X (formerly Twitter)"
              >
                <svg className="h-5 w-5 transition-transform group-hover:scale-110 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* 2. LinkedIn */}
              <a
                href="https://www.linkedin.com/in/maruf-ahmed-rohan/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group flex items-center justify-center h-11 w-11 rounded-xl bg-white dark:bg-[#0C4A6E] border-2 border-[#BAE6FD] dark:border-[#0EA5E9] text-[#0B1320] dark:text-white shadow-[0_4px_12px_rgba(2, 132, 199,0.12)] dark:shadow-[0_0_15px_rgba(14, 165, 233,0.4),_inset_0_1px_0_rgba(255,255,255,0.25)] hover:border-[#0284C7] hover:bg-[#0284C7] hover:text-white dark:hover:border-white dark:hover:bg-[#0EA5E9] hover:shadow-[0_6px_20px_rgba(2, 132, 199,0.35)] dark:hover:shadow-[0_0_25px_rgba(14, 165, 233,0.9)] hover:scale-110 transition-all duration-300 cursor-pointer"
                title="LinkedIn"
              >
                <svg className="h-5 w-5 transition-transform group-hover:scale-110 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* 3. GitHub */}
              <a
                href="https://github.com/Maruf-Ahmed-11"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group flex items-center justify-center h-11 w-11 rounded-xl bg-white dark:bg-[#0C4A6E] border-2 border-[#BAE6FD] dark:border-[#0EA5E9] text-[#0B1320] dark:text-white shadow-[0_4px_12px_rgba(2, 132, 199,0.12)] dark:shadow-[0_0_15px_rgba(14, 165, 233,0.4),_inset_0_1px_0_rgba(255,255,255,0.25)] hover:border-[#0284C7] hover:bg-[#0284C7] hover:text-white dark:hover:border-white dark:hover:bg-[#0EA5E9] hover:shadow-[0_6px_20px_rgba(2, 132, 199,0.35)] dark:hover:shadow-[0_0_25px_rgba(14, 165, 233,0.9)] hover:scale-110 transition-all duration-300 cursor-pointer"
                title="GitHub"
              >
                <svg className="h-5 w-5 transition-transform group-hover:scale-110 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>

              {/* 4. Facebook */}
              <a
                href="https://www.facebook.com/marufahmed.rohan/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group flex items-center justify-center h-11 w-11 rounded-xl bg-white dark:bg-[#0C4A6E] border-2 border-[#BAE6FD] dark:border-[#0EA5E9] text-[#0B1320] dark:text-white shadow-[0_4px_12px_rgba(2, 132, 199,0.12)] dark:shadow-[0_0_15px_rgba(14, 165, 233,0.4),_inset_0_1px_0_rgba(255,255,255,0.25)] hover:border-[#0284C7] hover:bg-[#0284C7] hover:text-white dark:hover:border-white dark:hover:bg-[#0EA5E9] hover:shadow-[0_6px_20px_rgba(2, 132, 199,0.35)] dark:hover:shadow-[0_0_25px_rgba(14, 165, 233,0.9)] hover:scale-110 transition-all duration-300 cursor-pointer"
                title="Facebook"
              >
                <svg className="h-5 w-5 transition-transform group-hover:scale-110 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* 5. Instagram */}
              <a
                href="https://www.instagram.com/maruf_ahmed_rohan_04/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group flex items-center justify-center h-11 w-11 rounded-xl bg-white dark:bg-[#0C4A6E] border-2 border-[#BAE6FD] dark:border-[#0EA5E9] text-[#0B1320] dark:text-white shadow-[0_4px_12px_rgba(2, 132, 199,0.12)] dark:shadow-[0_0_15px_rgba(14, 165, 233,0.4),_inset_0_1px_0_rgba(255,255,255,0.25)] hover:border-[#0284C7] hover:bg-[#0284C7] hover:text-white dark:hover:border-white dark:hover:bg-[#0EA5E9] hover:shadow-[0_6px_20px_rgba(2, 132, 199,0.35)] dark:hover:shadow-[0_0_25px_rgba(14, 165, 233,0.9)] hover:scale-110 transition-all duration-300 cursor-pointer"
                title="Instagram"
              >
                <svg className="h-5 w-5 transition-transform group-hover:scale-110 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

            </div>
          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B] dark:text-[#94A3B8]">
          <p>© 2026 MentorLagbe. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/#about" className="hover:text-[#0B1320] dark:hover:text-white transition-colors">
              About
            </Link>
            <Link href="/#pricing" className="hover:text-[#0B1320] dark:hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/#how-it-works" className="hover:text-[#0B1320] dark:hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="/#tuitions" className="hover:text-[#0B1320] dark:hover:text-white transition-colors">
              Browse Tuitions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
