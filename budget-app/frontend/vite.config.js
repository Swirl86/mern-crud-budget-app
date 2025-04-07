import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@table": path.resolve(__dirname, "./src/components/table"),
            "@utils": path.resolve(__dirname, "./src/utils"),
            "@services": path.resolve(__dirname, "./src/services"),
            "@hooks": path.resolve(__dirname, "./src/hooks/useBudgetData"),
        },
    },
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
});
