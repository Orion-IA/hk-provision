import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    tailwindcss(),
    nitro({
      preset: process.env.VERCEL ? "vercel" : "node-server",
      vercel: { functions: { runtime: "nodejs22.x" } },
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
