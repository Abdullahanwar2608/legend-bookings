import type { SVGProps } from "react";

/** Mustache icon — used for "LEGEN FADE" branding everywhere. */
export function MustacheIcon({ className, style, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 50"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
      {...props}
    >
      {/*
        Two symmetric curling lobes that form a classic handlebar mustache.
        Left lobe curves up-left, right lobe mirrors it.
      */}
      <path d="
        M50 28
        C46 28 42 32 36 32
        C28 32 22 26 18 22
        C14 18 8 18 4 22
        C2 24 2 28 6 28
        C10 28 14 24 18 26
        C22 28 28 36 36 36
        C42 36 48 30 50 28
        Z
        M50 28
        C52 30 58 36 64 36
        C72 36 78 28 82 26
        C86 24 90 28 94 28
        C98 28 98 24 96 22
        C92 18 86 18 82 22
        C78 26 72 32 64 32
        C58 32 54 28 50 28
        Z
      " />
    </svg>
  );
}

/** Head silhouette icon — used for "Haircut" service. */
export function HaircutIcon({ className, style }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden="true">
      {/* Head */}
      <ellipse cx="32" cy="24" rx="14" ry="16" />
      {/* Neck + shoulders */}
      <path d="M22 38 C18 42 12 46 10 56 L54 56 C52 46 46 42 42 38 C40 40 36 42 32 42 C28 42 24 40 22 38Z" />
      {/* Scissors snip at top */}
      <path d="M22 12 Q32 6 42 12" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

/** Beard/razor icon — used for "Beard Trim" service. */
export function BeardTrimIcon({ className, style }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden="true">
      {/* Head */}
      <ellipse cx="32" cy="22" rx="13" ry="14" />
      {/* Full beard shape */}
      <path d="M19 30 C16 36 16 44 20 50 C23 54 28 56 32 56 C36 56 41 54 44 50 C48 44 48 36 45 30 C42 34 38 36 32 36 C26 36 22 34 19 30Z" />
    </svg>
  );
}

/** Combo icon — head + beard outline — used for "Haircut & Beard". */
export function HaircutBeardIcon({ className, style }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden="true">
      {/* Two overlapping head silhouettes side by side, slightly offset */}
      <ellipse cx="26" cy="22" rx="11" ry="13" fill="currentColor" opacity="0.6" />
      <ellipse cx="38" cy="22" rx="11" ry="13" fill="currentColor" />
      {/* Beard bottom */}
      <path d="M17 30 C15 38 19 48 26 52 C29 54 35 54 38 52 C45 48 49 38 47 30 C44 34 41 36 38 36 C35 36 29 36 26 36 C23 36 20 34 17 30Z" fill="currentColor" />
    </svg>
  );
}

/** Shave / straight razor icon — used for "Shave" service. */
export function ShaveIcon({ className, style }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden="true">
      {/* Handle */}
      <rect x="28" y="36" width="8" height="20" rx="3" />
      {/* Blade pivot */}
      <rect x="26" y="32" width="12" height="6" rx="2" />
      {/* Open blade */}
      <path d="M18 8 L46 8 L44 32 L20 32 Z" />
      {/* Cutting edge */}
      <path d="M18 8 L46 8" stroke="#000" strokeWidth="2" fill="none"/>
    </svg>
  );
}

/** Star icon — used for "Kids Cut" service. */
export function KidsCutIcon({ className, style }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden="true">
      <polygon points="32,6 38,24 58,24 42,36 48,54 32,42 16,54 22,36 6,24 26,24" />
    </svg>
  );
}

/**
 * Returns the right icon component for a given service name.
 * Falls back to HaircutIcon for unknown services.
 */
export function getServiceIcon(
  name: string,
  opts: { className?: string; style?: React.CSSProperties } = {}
) {
  const n = name.toLowerCase();
  if (n.includes("beard") && (n.includes("haircut") || n.includes("combo"))) {
    return <HaircutBeardIcon {...opts} />;
  }
  if (n.includes("beard")) return <BeardTrimIcon {...opts} />;
  if (n.includes("shave")) return <ShaveIcon {...opts} />;
  if (n.includes("kid")) return <KidsCutIcon {...opts} />;
  return <HaircutIcon {...opts} />;
}
