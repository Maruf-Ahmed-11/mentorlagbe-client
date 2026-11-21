import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Icon Badge: Bold Chainsaw Man Cinematic Crimson Badge */}
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#880816] via-[#E11D48] to-[#FF2E50] text-white shadow-[0_0_20px_rgba(225,29,72,0.55)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(255,30,64,0.85)]">
        {/* Mentor Cap SVG */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-white transition-transform duration-300 group-hover:-rotate-6"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
          <path d="M22 10v6" />
        </svg>

        {/* Luminous Core Beacon */}
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1E40] opacity-80"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF1E40] shadow-[0_0_10px_#FF1E40]"></span>
        </span>
      </div>

      {/* Brand Name Typography */}
      {showText && (
        <div className="flex items-baseline tracking-tight font-sans">
          <span className="text-xl font-black text-white tracking-tighter uppercase transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Mentor
          </span>
          <span className="text-xl font-black text-[#FF1E40] group-hover:text-[#FF4D6D] tracking-tighter uppercase ml-0.5 transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,30,64,0.7)]">
            Lagbe
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF1E40] ml-1 shadow-[0_0_8px_#FF1E40]" />
        </div>
      )}
    </Link>
  );
}
