import { posix } from 'path'

export const normalizePath = (path: string): string => {
	path = path.startsWith('/') ? path : '/' + path
	return posix.normalize(path)
}
