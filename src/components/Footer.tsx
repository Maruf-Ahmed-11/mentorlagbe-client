import Link from "next/link";
import Logo from "./Logo";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#0E0203] border-t border-[#E11D48]/25 text-[#F4E2E5] pt-16 pb-8 overflow-hidden">
      {/* Ambient Chainsaw Man Crimson Spotlight Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[220px] bg-gradient-to-t from-[#E11D48]/20 via-[#880816]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12">
          
          {/* Column 1: Logo & Description */}
          <div className="flex flex-col items-start space-y-4">
            <Logo />
            <p className="text-sm text-[#BFA5AA] leading-relaxed max-w-xs">
              Find your perfect tutor or share your expertise with students across Bangladesh.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF1E40] shadow-[0_0_8px_#FF1E40]" />
              QUICK LINKS
            </h3>
            <ul className="space-y-2 text-sm text-[#F4E2E5]">
              <li>
                <Link href="/" className="hover:text-[#FF1E40] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tuitions" className="hover:text-[#FF1E40] transition-colors">
                  Browse Tuitions
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#FF1E40] transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FF1E40] transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF1E40] shadow-[0_0_8px_#FF1E40]" />
              CONTACT INFO
            </h3>
            <div className="space-y-2.5 text-sm text-[#F4E2E5]">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#FF1E40] shrink-0" />
                <a
                  href="mailto:mentorlagbe@gmail.com"
                  className="hover:text-[#FF1E40] transition-colors"
                >
                  mentorlagbe@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#FF1E40] shrink-0" />
                <a
                  href="tel:+8801700000000"
                  className="font-mono hover:text-[#FF1E40] transition-colors"
                >
                  +880-1700-000000
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-[#FF1E40] shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Column 4: Connect With Us */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF1E40] shadow-[0_0_8px_#FF1E40]" />
              CONNECT WITH US
            </h3>
            <p className="text-xs text-[#BFA5AA] leading-relaxed">
              Follow our social channels for study tips, tutor highlights, and updates.
            </p>
            
            {/* Social Media Rounded Buttons */}
            <div className="flex items-center gap-2.5 pt-1">
              
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1C0307] border border-[#E11D48]/35 text-[#F4E2E5] hover:text-white hover:border-[#FF1E40] hover:bg-[#2A060C] hover:shadow-[0_0_15px_rgba(255,30,64,0.4)] transition-all"
              >
                <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (formerly Twitter)"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1C0307] border border-[#E11D48]/35 text-[#F4E2E5] hover:text-white hover:border-[#FF1E40] hover:bg-[#2A060C] hover:shadow-[0_0_15px_rgba(255,30,64,0.4)] transition-all"
              >
                <svg className="h-3.5 w-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1C0307] border border-[#E11D48]/35 text-[#F4E2E5] hover:text-white hover:border-[#FF1E40] hover:bg-[#2A060C] hover:shadow-[0_0_15px_rgba(255,30,64,0.4)] transition-all"
              >
                <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1C0307] border border-[#E11D48]/35 text-[#F4E2E5] hover:text-white hover:border-[#FF1E40] hover:bg-[#2A060C] hover:shadow-[0_0_15px_rgba(255,30,64,0.4)] transition-all"
              >
                <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

            </div>
          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-6 border-t border-[#E11D48]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#BFA5AA]">
          <p>© 2026 MentorLagbe. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="/pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/tuitions" className="hover:text-white transition-colors">
              Tuitions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
