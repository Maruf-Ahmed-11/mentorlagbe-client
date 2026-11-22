import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <Link href="/" className={`brand-logo flex items-center gap-3 group select-none ${className}`}>
      {/* Icon Badge: High-Contrast Glowing Frame */}
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A0306] border-2 border-[#D91E48] dark:border-[#FF1E40] text-white shadow-[0_4px_16px_rgba(217,30,72,0.35)] dark:shadow-[0_0_22px_rgba(255,30,64,0.65),_inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-300 group-hover:scale-105 group-hover:border-white group-hover:shadow-[0_0_30px_rgba(255,255,255,0.8)]">
        {/* Luminous White Mentor Cap */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-white transition-transform duration-300 group-hover:-rotate-6 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          style={{ stroke: "#FFFFFF", color: "#FFFFFF" }}
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
          <path d="M22 10v6" />
        </svg>

        {/* Electric Pulsing Beacon */}
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF1E40] shadow-[0_0_10px_#FFFFFF]"></span>
        </span>
      </div>

      {/* Brand Name Typography with Razor-Sharp Distinction */}
      {showText && (
        <div className="flex items-baseline tracking-tight font-sans">
          {/* MENTOR in Crisp Dark Espresso (Light) / Pure White (Dark) */}
          <span className="text-xl sm:text-2xl font-black text-[#180C0E] dark:text-white tracking-tighter uppercase transition-colors">
            Mentor
          </span>
          {/* LAGBE in Glowing High-Luminance Gradient */}
          <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D91E48] via-[#FF1E40] to-[#BE123C] dark:from-white dark:via-[#FFE4E6] dark:to-[#FF4D6D] tracking-tighter uppercase ml-1 transition-all duration-300 drop-shadow-[0_0_18px_rgba(217,30,72,0.5)] dark:drop-shadow-[0_0_18px_rgba(255,30,64,0.7)]">
            Lagbe
          </span>
          <span className="h-2 w-2 rounded-full bg-[#D91E48] dark:bg-[#FF1E40] ml-1.5 shadow-[0_0_10px_#D91E48] dark:shadow-[0_0_10px_#FF1E40] animate-pulse" />
        </div>
      )}
    </Link>
  );
}
