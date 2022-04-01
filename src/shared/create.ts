import { normalizePath } from './base'

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

export const createVirtualModuleCode = async (
	options: VirtualModuleCodeOptions
) => {
	const { target, defaultLayout, importMode } = options

	const glob = `${normalizePath(target)}/**/*.vue`
	const isSync = importMode === 'sync'
	const globMethod = isSync ? 'globEager' : 'glob'

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
	
	const modules = import.meta.${globMethod}('${glob}')

	const matchRegExp = new RegExp("(?<=src/layouts/).*(?=.vue)")
	
	Object.entries(modules).forEach(([name, module]) => {
		const [key] = name.match(matchRegExp)
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

export const createVirtualLayouts = (
	importMode: 'sync' | 'async'
) => {
	if (importMode === 'sync') {
		return
	}
}
