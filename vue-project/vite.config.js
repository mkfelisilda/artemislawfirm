import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import path from "path";

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            vue: "vue/dist/vue.esm.js",
        },
    },
    // Add this define block to fix the error
    define: {
        "process.env": {},
    },
});
