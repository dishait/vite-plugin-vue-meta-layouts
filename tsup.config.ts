import { defineConfig } from 'tsup'

export default defineConfig({
	dts: true,
	clean: true,
	minify: true,
	splitting: true,
	outDir: 'dist',
	format: ['cjs', 'esm'],
	entry: ['src/index.ts'],
	noExternal: ['slash']
})
