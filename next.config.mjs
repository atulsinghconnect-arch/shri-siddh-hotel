import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

// Set by the GitHub Pages workflow (e.g. "/shri-siddh-hotel"); empty for local dev.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: root,
  output: "export",
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
