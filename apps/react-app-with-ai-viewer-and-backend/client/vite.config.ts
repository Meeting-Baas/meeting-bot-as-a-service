import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3080",
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("Sending Request to the Target:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log(
              "Received Response from the Target:",
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
      "/meetingbaas-api": {
        target: "https://api.meetingbaas.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/meetingbaas-api/, ""),
        secure: true,
      },
      "/s3": {
        target: "https://s3.eu-west-3.amazonaws.com/bots-videos",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/s3/, ""),
        secure: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@meeting-baas/shared": path.resolve(__dirname, "../packages/shared/src"),
    },
  },
});
