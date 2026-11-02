import path from 'node:path'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, lazyPlugins } from 'vite-plus'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	staged: {
		'*': 'vp check --fix',
	},
	fmt: {
		printWidth: 80,
		useTabs: true,
		tabWidth: 2,
		semi: false,
		singleQuote: true,
		jsxSingleQuote: true,
		trailingComma: 'es5',
		bracketSpacing: true,
		bracketSameLine: false,
		arrowParens: 'always',
		quoteProps: 'as-needed',
	},
	lint: {
		jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
		rules: {
			'vite-plus/prefer-vite-plus-imports': 'error',
		},
		options: { typeAware: true, typeCheck: true },
	},
	plugins: lazyPlugins(() => [tailwindcss(), reactRouter(), tsconfigPaths()]),
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './app'),
		},
	},
})
