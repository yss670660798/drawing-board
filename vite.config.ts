import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { vitePluginForArco } from '@arco-plugins/vite-react'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		vitePluginForArco({
			style: 'css', // 样式按需加载
		})
		
	],
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
});
