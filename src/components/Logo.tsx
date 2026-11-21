import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Icon Badge: The Honored Sphere with Limitless Glow */}
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#5B6BC8] via-[#7C8CE4] to-[#38BDF8] text-[#07080B] shadow-[0_0_20px_rgba(124,140,228,0.45)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_28px_rgba(56,189,248,0.65)]">
        {/* Mentor Cap & Limitless Halo SVG */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-[#07080B] transition-transform duration-300 group-hover:-rotate-6"
        >
          {/* Mortarboard rhomboid top */}
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          {/* Cap bottom curve */}
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
          {/* Tassel line */}
          <path d="M22 10v6" />
        </svg>

        {/* Six-Eyes Electric Cyan Spark Center */}
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]"></span>
        </span>
      </div>

      {/* Brand Name Typography */}
      {showText && (
        <div className="flex items-baseline tracking-tight font-sans">
          <span className="text-xl font-black text-foreground tracking-tighter uppercase transition-colors">
            Mentor
          </span>
          <span className="text-xl font-black text-[#7C8CE4] group-hover:text-[#94A3F2] tracking-tighter uppercase ml-0.5 transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(124,140,228,0.55)]">
            Lagbe
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8] ml-1 shadow-[0_0_6px_#38BDF8]" />
        </div>
      )}
    </Link>
  );
}
