"use client";
import { memo } from "react";

type FramerGlobeProps = {
  src: string;
  title?: string;
  allow?: string;
};

function FramerGlobeBase({
  src,
  title = "Framer 3D Globe",
  allow = "fullscreen; autoplay; xr-spatial-tracking",
}: FramerGlobeProps) {
  if (!src) return null;
  return (
    <div className="w-full h-full">
      <iframe
        src={src}
        title={title}
        className="w-full h-full"
        style={{ border: 0 }}
        loading="lazy"
        allow={allow}
      />
    </div>
  );
}

export const FramerGlobe = memo(FramerGlobeBase);


