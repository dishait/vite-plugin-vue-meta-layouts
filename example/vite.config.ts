import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import Pages from 'vite-plugin-pages'
import MetaLayouts from 'vite-plugin-vue-meta-layouts'

export default defineConfig({
	plugins: [Vue(), Inspect(), MetaLayouts(), Pages()]
})
