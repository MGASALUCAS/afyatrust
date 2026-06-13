// Minimal, consistent line icons. One stroke weight, one style.
// Used sparingly - only where an icon clarifies meaning.
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function WalletIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H17a1 1 0 0 1 1 1v1" />
      <rect x="3" y="7" width="18" height="12" rx="2.5" />
      <path d="M16 13h2.5" />
    </svg>
  );
}

export function BoltIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13 3 5 13h5l-1 8 8-10h-5l1-8Z" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 5 6v5c0 4.2 2.8 7.6 7 9 4.2-1.4 7-4.8 7-9V6l-7-3Z" />
      <path d="m9.5 12 1.8 1.8L15 10" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" {...props}>
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.46 1.34 4.97L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.24h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.9 9.9 0 0 0 12.04 2Zm0 1.84c2.17 0 4.21.85 5.75 2.39a8.08 8.08 0 0 1 2.38 5.73c0 4.49-3.65 8.13-8.14 8.13a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.08.81.82-3-.19-.31a8.06 8.06 0 0 1-1.24-4.32c0-4.49 3.65-8.13 8.13-8.13Zm-2.6 4.36c-.16 0-.42.06-.64.31-.22.24-.84.83-.84 2.02s.86 2.35.98 2.51c.12.16 1.69 2.66 4.16 3.62 2.06.8 2.48.64 2.93.6.45-.04 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.32-.74-1.8-.2-.47-.4-.41-.54-.42h-.46Z" />
    </svg>
  );
}

export function MemberIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 56 56" fill="none" {...props}>
      <circle cx="28" cy="28" r="27" stroke="#006D77" strokeWidth="1.4" />
      <circle cx="28" cy="23" r="6.5" stroke="#006D77" strokeWidth="1.6" />
      <path d="M17 40c1.6-5.2 6-8 11-8s9.4 2.8 11 8" stroke="#006D77" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ClinicIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 56 56" fill="none" {...props}>
      <circle cx="28" cy="28" r="27" stroke="#006D77" strokeWidth="1.4" />
      <path d="M19 38V22l9-5 9 5v16" stroke="#006D77" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M28 25v8M24 29h8" stroke="#FFB703" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 38h24" stroke="#006D77" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function TreatmentIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 56 56" fill="none" {...props}>
      <circle cx="28" cy="28" r="27" stroke="#006D77" strokeWidth="1.4" />
      <path
        d="M28 38s-9-5.4-9-11.4A4.6 4.6 0 0 1 28 24a4.6 4.6 0 0 1 9 2.6C37 32.6 28 38 28 38Z"
        stroke="#006D77"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
