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
}

export const createVirtualModuleCode = async (
	options: VirtualModuleCodeOptions
) => {
	const { target, defaultLayout } = options
<<<<<<< HEAD

	const glob = `${normalizePath(target)}/**/*.vue`

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

	const modules = import.meta.globEager('${glob}')
	
	const matchRegExp = new RegExp("(?<=src/layouts/).*(?=.vue)")
	Object.entries(modules).forEach(([name, module]) => {
		const [key] = name.match(matchRegExp)
		layouts[key] = module.default
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
=======
	return `
	export const useMetaLayouts = (router) => {

		export const layouts = import.meta.globEager('${target}/*.vue').map(layout => layout.default)

		const resolvedRoutes = router.options.routes.map(route => {
			return { 
			  path: route.path,
			  component: layouts[route.meta?.layout || '${defaultLayout}'],
			  children: [ {...route, path: ''} ]
			}
		})

		router.options.routes = resolvedRoutes
		return {
			layouts,
			resolvedRoutes
		}
	}`
>>>>>>> d6bcf7a6132315f2cf7b7f16b3cc5d47d56cb093
}
