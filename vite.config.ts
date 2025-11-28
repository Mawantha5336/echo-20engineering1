import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import express from "express";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true,
    hmr: {
      clientPort: 443,
    },
    fs: {
      allow: ["./client", "./shared", "./attached_assets", "./echo"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  publicDir: "public",
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin(), serveEchoPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
      "@assets": path.resolve(__dirname, "./attached_assets"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve",
    configureServer(server) {
      const app = createServer();
      server.middlewares.use(app);
    },
  };
}

function serveEchoPlugin(): Plugin {
  return {
    name: "serve-echo-plugin",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/echo", express.static(path.resolve(__dirname, "echo")));
    },
  };
}
