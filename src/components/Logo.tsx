import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <Link href="/" className={`brand-logo flex items-center gap-3 group select-none ${className}`}>
      {/* Icon Badge: High-Contrast Glowing Frame */}
      <div className="brand-logo-badge relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 text-white transition-all duration-300 group-hover:scale-105 group-hover:border-white group-hover:shadow-[0_0_30px_rgba(56,189,248,0.9)]">
        {/* Luminous White Mentor Cap */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-white transition-transform duration-300 group-hover:-rotate-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.95)]"
          style={{ stroke: "#FFFFFF", color: "#FFFFFF" }}
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
          <path d="M22 10v6" />
        </svg>

        {/* Electric Pulsing Beacon */}
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#38BDF8] dark:bg-[#0EA5E9] shadow-[0_0_10px_#38BDF8]"></span>
        </span>
      </div>

      {/* Brand Name Typography with Razor-Sharp Distinction */}
      {showText && (
        <div className="flex items-baseline tracking-tight font-sans">
          {/* MENTOR in Crisp Dark Espresso (Light) / Pure White (Dark) */}
          <span className="text-xl sm:text-2xl font-black text-[#0B1320] dark:text-white tracking-tighter uppercase transition-colors">
            Mentor
          </span>
          {/* LAGBE in Glowing High-Luminance Gradient */}
          <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#0369A1] dark:from-white dark:via-[#38BDF8] dark:to-[#0EA5E9] tracking-tighter uppercase ml-1 transition-all duration-300 drop-shadow-[0_0_12px_rgba(2,132,199,0.4)] dark:drop-shadow-[0_0_22px_rgba(56,189,248,0.95)]">
            Lagbe
          </span>
          <span className="h-2 w-2 rounded-full bg-[#0284C7] dark:bg-[#38BDF8] ml-1.5 shadow-[0_0_10px_#0284C7] dark:shadow-[0_0_14px_#38BDF8] animate-pulse" />
        </div>
      )}
    </Link>
  );
}
