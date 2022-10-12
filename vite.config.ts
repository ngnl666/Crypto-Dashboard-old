import { defineConfig } from 'vitest/config';
import { loadEnv, ConfigEnv, UserConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'path';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const env = loadEnv(mode, process.cwd());

	return {
		resolve: {
			alias: {
				'@': resolve(__dirname, './src'),
				'/images': 'src/assets/images',
			},
		},
		server: {
			host: '0.0.0.0',
			port: env.VITE_PORT,
			open: true,
		},
		test: {
			globals: true,
		},
		plugins: [
			vue(),
			visualizer(),
			createHtmlPlugin({
				inject: {
					data: {
						title: env.VITE_GLOB_APP_TITLE,
					},
				},
			}),
			AutoImport({
				include: [
					/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
					/\.vue$/,
					/\.vue\?vue/, // .vue
				],
				imports: ['vue', 'vue-router', 'vitest'],
				dts: true,
				resolvers: [ElementPlusResolver()],
			}),
			Components({
				exclude: [/\$/, /\.vue\?vu.vuee/], // manually import
				types: [
					{
						from: 'vue-router',
						names: ['RouterLink', 'RouterView'],
					},
				],
				dts: true,
				resolvers: [ElementPlusResolver()],
			}),
		],
	};
});
