import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@styles': path.resolve(__dirname, './src/styles'),
			'@components': path.resolve(__dirname, './src/components'),
			'@db': path.resolve(__dirname, './src/db'),
			'@services': path.resolve(__dirname, './src/services'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@models': path.resolve(__dirname, './src/models'),
			'@assets': path.resolve(__dirname, './src/assets'),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "${path.resolve(__dirname, './src/styles/variables.scss')}";`,
			},
		},
	},
	plugins: [
		react(),
		svgr({
			include: "**/*.svg?react",
		}),
	],
});
