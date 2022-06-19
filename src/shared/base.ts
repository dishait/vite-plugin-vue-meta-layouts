import { posix } from 'path'
import { getPackageInfo } from 'local-pkg'

export const normalizePath = (path: string): string => {
	path = path.startsWith('/') ? path : '/' + path
	return posix.normalize(path)
}

export const isVite2 = async () => {
	const info = await getPackageInfo('vite')
	if (info) {
		return /.?2/.test(info.version)
	}
	return false
}
