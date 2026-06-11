import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 kräver att icke-standard kvalitetsvärden tillåts explicit.
    // 90 används för skarpa hero-/foto-bakgrunder.
    qualities: [75, 90],
  },
};

export default nextConfig;
