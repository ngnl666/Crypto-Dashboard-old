/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { loadEnv, ConfigEnv, UserConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'path';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const env = loadEnv(mode, process.cwd());

	return {
		resolve: {
			alias: {
				'@': resolve(__dirname, './src'),
				'/images': 'src/assets/images',
				publicPath: '/src/assets/appIcon',
			},
		},
		server: {
			host: '0.0.0.0',
			port: Number(env.VITE_PORT),
			open: true,
		},
		test: {
			globals: true,
			environment: 'jsdom',
			include: ['**/*.spec.ts'],
		},
		plugins: [
			Vue(),
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
				imports: [
					'vue',
					'vue-router',
					'vitest',
					{
						'@vue/test-utils': ['mount', 'shallowMount'],
					},
				],
				resolvers: [ElementPlusResolver()],
				dts: resolve('./src', 'auto-imports.d.ts'),
			}),

			Components({
				exclude: [/\$/, /\.vue\?vu.vuee/], // manually import
				types: [
					{
						from: 'vue-router',
						names: ['RouterLink', 'RouterView'],
					},
				],
				resolvers: [IconsResolver({ prefix: false, enabledCollections: ['ep'] }), ElementPlusResolver()],
				dts: resolve('./src', 'components.d.ts'),
			}),

			Icons({
				autoInstall: true,
			}),
		],
	};
});
