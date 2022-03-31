exports.useJson = origin => {
	const json = JSON.parse(origin)
	const useString = () => JSON.stringify(json, null, 2)

	return {
		json,
		useString
	}
}

exports.useName = origin => `vite-plugin-${origin}`
