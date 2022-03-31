const { useJson, useName } = require('./shared/normalize')

/**
 *  初始化插件
 * @param {import('plop').NodePlopAPI} plop
 */
const init = plop => {
	plop.setGenerator('controller', {
		description: '初始化插件',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: '请输入您想创建的插件名'
			},
			{
				type: 'input',
				name: 'description',
				message: '请输入该插件的描述'
			},
			{
				type: 'confirm',
				default: false,
				name: 'reusable',
				message: '该插件是否可以重复调用'
			},
			{
				type: 'input',
				name: 'authorName',
				message: '请输入您的姓名'
			},
			{
				type: 'input',
				name: 'reopAuthorName',
				message: '请输入仓库所有者名'
			},
			{
				type: 'input',
				name: 'email',
				email: '请输入您的邮箱'
			}
		],
		actions: [
			// 初始化源码插件名称
			{
				type: 'modify',
				path: '../src/index.ts',
				pattern: /useName\((.+)\)/,
				template: `useName('{{name}}')`
			},
			// 初始化插件可复用性
			{
				type: 'modify',
				path: '../src/index.ts',
				pattern: /createPluginName\(\)/,
				template: `createPluginName({{reusable}})`
			},
			// 初始化包信息
			{
				type: 'modify',
				path: '../package.json',
				transform(data, input) {
					const { json, useString } = useJson(data)
					let {
						name,
						email,
						authorName,
						description,
						reopAuthorName
					} = input

					name = useName(name)

					json.name = name

					json.description = description

					json.repository.url = `git+https://github.com/${reopAuthorName}/${name}.git`

					json.author = {
						email,
						name: authorName,
						url: `https://github.com/${authorName}`
					}

					json.bugs = {
						email,
						url: `https://github.com/${reopAuthorName}/${name}/issues`
					}

					return useString()
				}
			},
			// 初始化工作区依赖
			{
				type: 'modify',
				path: '../examples/vite/package.json',
				transform(data, { name }) {
					const { json, useString } = useJson(data)
					const { devDependencies } = json
					delete devDependencies['vite-plugin-name']

					name = useName(name)
					devDependencies[name] = 'workspace:*'

					return useString()
				}
			},
			// 初始化 README 介绍
			{
				type: 'modify',
				path: '../README.md',
				transform(data, { name, description, authorName }) {
					data = data.replace(
						'vite-plugin-template',
						`vite-plugin-${name}`
					)
					data = data.replace(
						'开箱即用的 vite 插件模板',
						description
					)

					data = data.replace('name', `[${authorName}](https://github.com/${authorName})`)

					return data
				}
			},
			// 初始化协议所有者
			{
				type: 'modify',
				path: '../LICENSE',
				pattern: /name/,
				template: `{{authorName}}`
			}
		]
	})
}

module.exports = init
