# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official pluginimport DrawingBoard from '@/drawingBoard'

class Eraser {
// 声明一个board变量，用于存储画板
board: DrawingBoard

	// 构造函数，传入一个画板
	constructor(board: DrawingBoard) {
		// 将传入的画板赋值给board变量
		this.board = board
	}

	——cleanLine(){
		// 计算 cleanedWidth 的长度
		const asin = cleanWidth * Math.sin(Math.atan((y2 - y1) / (x2 - x1)))
		const acos = cleanWidth * Math.cos(Math.atan((y2 - y1) / (x2 - x1)))
		// 计算 cleanedWidth 的四个点的坐标
		const x3 = x1 + asin
		const y3 = y1 - acos
		const x4 = x1 - asin
		const y4 = y1 + acos
		const x5 = x2 + asin
		const y5 = y2 - acos
		const x6 = x2 - asin
		const y6 = y2 + acos
	}

}SLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked`
	or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and
	add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
