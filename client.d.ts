declare module 'virtual:meta-layouts' {
	import type { Router } from 'vue-router'
	export const useMetaLayouts: (router: Router) => void
}
