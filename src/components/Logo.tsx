import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* Icon Badge */}
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#009e80] via-[#00c29f] to-[#12e2bb] text-white shadow-[0_0_18px_rgba(0,194,159,0.35)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(0,194,159,0.55)]">
        {/* Graduation Cap / Mortarboard SVG */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-[#031e17] transition-transform duration-300 group-hover:-rotate-3"
        >
          {/* Cap top rhombus */}
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          {/* Cap bottom skullcap */}
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
          {/* Tassel hanging */}
          <path d="M22 10v6" />
        </svg>

        {/* Small subtle inner glow */}
        <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Brand Text */}
      {showText && (
        <span className="text-xl font-bold tracking-tight text-[#00c29f] font-sans transition-all duration-300 group-hover:text-[#19e9c4] group-hover:drop-shadow-[0_0_12px_rgba(0,194,159,0.4)]">
          MentorLagbe
        </span>
      )}
    </Link>
  );
}

