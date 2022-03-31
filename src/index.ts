import type { Plugin } from 'vite'
import {
	createPluginName,
	createVirtualModuleID,
	createVirtualModuleCode
} from './shared/create'

interface Options {
	/**
	 * @default "src/layouts"
	 */
	target?: string
	/**
	 * @default "default"
	 */
	defaultLayout?: string
}

const useName = createPluginName(false)

const usePlugin = (options?: Partial<Options>): Plugin => {
	const {
		target = 'src/layouts',
		defaultLayout = 'default'
	} = options || {}

	const { virtualModuleId, resolvedVirtualModuleId } =
		createVirtualModuleID('meta-layouts')
	return {
		name: useName('vue-meta-layouts'),
		resolveId(id) {
			if (id === virtualModuleId) {
				return resolvedVirtualModuleId
			}
		},
<<<<<<< HEAD
		load(id) {
=======
		load(code, id) {
>>>>>>> d6bcf7a6132315f2cf7b7f16b3cc5d47d56cb093
			if (id === resolvedVirtualModuleId) {
				return createVirtualModuleCode({
					target,
					defaultLayout
				})
			}
		}
	}
}

export default usePlugin
