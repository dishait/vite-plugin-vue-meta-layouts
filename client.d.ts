declare module 'virtual:meta-layouts' {
<<<<<<< HEAD
	import type {
		Router,
		RouteRecordRaw,
		RouteRecordNormalized
	} from 'vue-router'

	export const setupLayouts: (
		routes: RouteRecordRaw[]
	) => RouteRecordRaw[]

	export const createGetRoutes: (
		router: Router,
		/**
		 * @default false
		 */
		withLayout?: boolean
	) => () => RouteRecordNormalized[]
=======
	import type { Router } from 'vue-router'
	export const useMetaLayouts: (router: Router) => void
>>>>>>> d6bcf7a6132315f2cf7b7f16b3cc5d47d56cb093
}
