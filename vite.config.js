// https://vitejs.dev/config/
import { defineConfig } from 'vite'
import { splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
//SEE: https://vitejs.dev/config/server-options.html#server-https

const BasePath= (process.env.GITHUB_REPOSITORY||'').replace(/^[^\/]*/,'') 

import { VitePWA } from 'vite-plugin-pwa';
import { comlink } from 'vite-plugin-comlink'

function manualChunks(id) {
	console.log("manualChunks",id);
	if (id.includes('node_modules')) {
		return (
			id.includes('prime') ? 'vendor-prime' :
			id.includes('lezer') ? 'vendor-lezer' :
			id.includes('mirror') ? 'vendor-mirror' :
			id.includes('git') ? 'vendor-git' :
			'vendor'
		)
	}
}


// https://vitejs.dev/config/
export default defineConfig({
	base: BasePath,
	worker: {
		plugins: () => ([
			nodePolyfills(),
			comlink(),
		])
	},
	plugins: [
		basicSsl(), 
		react(),  
		nodePolyfills(),
		comlink(),
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
	build: {
		rollupOptions: { output: { manualChunks }},
	},
})
