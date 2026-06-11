"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";

type BackgroundVideoProps = {
  src: string;
  /** Scrim layered over the video for text legibility, e.g. "bg-teal-dark/85". */
  overlayClassName?: string;
  /** Extra classes for the sharp video layer, e.g. "scale-[0.93]" to zoom out a touch. */
  videoClassName?: string;
};

// Ambient, muted background video with a legibility scrim.
// Hides itself entirely if the file fails or the user prefers reduced motion.
export default function BackgroundVideo({
  src,
  overlayClassName = "",
  videoClassName = "",
}: BackgroundVideoProps) {
  const [failed, setFailed] = useState(false);
  const reduce = useReducedMotion();

  if (failed || reduce) return null;

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Blurred backdrop fills the frame so the sharp layer never has to over-zoom */}
      <video
        className="absolute inset-0 h-full w-full scale-[1.15] object-cover blur-2xl brightness-[0.6]"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
      </video>
      {/* Sharp layer at the video's natural aspect ratio — no cropping, no zoom */}
      <video
        className={`absolute inset-0 h-full w-full object-contain ${videoClassName}`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onError={() => setFailed(true)}
      >
        <source src={src} type="video/mp4" />
      </video>
      {overlayClassName && <div className={`absolute inset-0 ${overlayClassName}`} />}
    </div>
  );
}
