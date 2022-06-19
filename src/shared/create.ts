import { isVite2, normalizePath } from './base'

export const createPluginName = (
	reusable: boolean = false
) => {
	let i = 0
	return (name: string) => {
		const base = `vite-plugin-${name}`
		return reusable ? `${base}:${i++}` : base
	}
}

export const createVirtualModuleID = (name: string) => {
	const virtualModuleId = `virtual:${name}`
	const resolvedVirtualModuleId = '\0' + virtualModuleId
	return {
		virtualModuleId,
		resolvedVirtualModuleId
	}
}

interface VirtualModuleCodeOptions {
	target: string
	defaultLayout: string
	importMode: 'sync' | 'async'
}

const createVirtualGlob = async (
	target: string,
	isSync: boolean
) => {
	const g = `${target}/**/*.vue`
	if (await isVite2()) {
		return isSync
			? `import.meta.globEager(${g})`
			: `import.meta.glob(${g})`
	}
	return `import.meta.glob(${g}, { eager: ${isSync} })`
}

export const createVirtualModuleCode = async (
	options: VirtualModuleCodeOptions
) => {
	const { target, defaultLayout, importMode } = options

	const normalizedTarget = normalizePath(target)

	const isSync = importMode === 'sync'

	return `
export const createGetRoutes = (router, withLayout = false) => {
	const routes = router.getRoutes()
	if (withLayout) {
		return routes
	}
	return () => routes.filter(route => !route.meta.isLayout)
}

export const setupLayouts = routes => {
	const layouts = {}

	const modules = ${await createVirtualGlob(
		normalizedTarget,
		isSync
	)}
	
	Object.entries(modules).forEach(([name, module]) => {
		
		let key = name.replace("${normalizedTarget}/", '').replace('.vue', '')
		layouts[key] = ${isSync ? 'module.default' : 'module'}
	})
	
	return routes.map(route => {
		return { 
			path: route.path,
			component: layouts[route.meta?.layout || '${defaultLayout}'],
			children: [ {...route, path: ''} ],
			meta: {
				isLayout: true
			}
		}
	})
}`
}
