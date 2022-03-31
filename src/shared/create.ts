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
}
