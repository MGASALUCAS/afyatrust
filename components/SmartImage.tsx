"use client";

import { useState } from "react";

type SmartImageProps = {
  src: string;
  alt: string;
  aspect?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  position?: string;
};

// Plain <img> with a branded fallback — so the page looks intentional
// even before the real photo is dropped into /public/media.
export default function SmartImage({
  src,
  alt,
  aspect,
  className = "",
  imgClassName = "",
  priority = false,
  position = "center",
}: SmartImageProps) {
  const [err, setErr] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-sage-mist ${className}`}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      {err ? (
        <div className="absolute inset-0 grid place-items-center px-6 text-center">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-teal">
              AfyaTrust
            </p>
            <p className="mt-2 text-[14px] text-charcoal-muted">{alt}</p>
            <p className="mt-3 text-[11px] text-charcoal-faint">
              Add photo → <code>{src}</code>
            </p>
          </div>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setErr(true)}
          loading={priority ? "eager" : "lazy"}
          className={`h-full w-full object-cover ${imgClassName}`}
          style={{ objectPosition: position }}
        />
      )}
    </div>
  );
}
