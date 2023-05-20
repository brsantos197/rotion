// electron.vite.config.ts
import path from "node:path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
import tsconfigPathsPlugin from "vite-tsconfig-paths";
import tailwindcss from "tailwindcss";
var tsconfigPaths = tsconfigPathsPlugin({
  projects: [path.resolve("tsconfig.json")]
});
var electron_vite_config_default = defineConfig({
  main: {
    plugins: [tsconfigPaths, externalizeDepsPlugin()],
    publicDir: path.resolve("resources")
  },
  preload: {
    plugins: [tsconfigPaths, externalizeDepsPlugin()]
  },
  renderer: {
    define: {
      "process.platform": JSON.stringify(process.platform)
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss({
            config: "./src/renderer/tailwind.config.js"
          })
        ]
      }
    },
    resolve: {
      alias: {
        "@renderer": path.resolve("src/renderer/src")
      }
    },
    plugins: [tsconfigPaths, react()]
  }
});
export {
  electron_vite_config_default as default
};
