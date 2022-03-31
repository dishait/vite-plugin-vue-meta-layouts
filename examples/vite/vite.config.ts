import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'

export default defineConfig({
	plugins: [Vue(), Inspect()]
})
