// https://vitejs.dev/config/
import { defineConfig } from 'vite'
import { splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
//SEE: https://vitejs.dev/config/server-options.html#server-https

const BasePath= (process.env.GITHUB_REPOSITORY||'').replace(/^[^\/]*/,'') 

import { VitePWA } from 'vite-plugin-pwa';
import { comlink } from 'vite-plugin-comlink'

// https://vitejs.dev/config/
export default defineConfig({
	base: BasePath,
	worker: {
		plugins: () => ([
			comlink()
		])
	},
	plugins: [
		react(),  
		comlink(),
		basicSsl(), 
		splitVendorChunkPlugin(),
		VitePWA({
			registerType: 'prompt',
			injectRegister: false,

			pwaAssets: {
				disabled: false,
				config: true,
			},

			manifest: {
				name: 'pwa-tut0',
				short_name: 'pwa-tut0',
				description: 'pwa tutorial',
				theme_color: '#000000',
			},

			workbox: {
				globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
				cleanupOutdatedCaches: true,
				clientsClaim: true,
			},

			devOptions: {
				enabled: false,
				navigateFallback: 'index.html',
				suppressWarnings: true,
				type: 'module',
			},
	})],
})
