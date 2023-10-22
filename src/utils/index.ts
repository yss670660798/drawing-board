import { v4 as uuidv4 } from 'uuid'

export function getUuid() {
	return uuidv4()
}

export function convertColorToRGBA(color: string) {
	if (color.length === 4) {
		// 如果颜色格式是 #fff，则需要将两位数的十六进制颜色转换为三位数的十六进制颜色
		const r = parseInt(color.slice(1, 2), 16) * 17
		const g = parseInt(color.slice(2, 3), 16) * 17
		const b = parseInt(color.slice(3, 4), 16) * 17
		return [r, g, b, 255]
	}
	const r = parseInt(color.slice(1, 3), 16)
	const g = parseInt(color.slice(3, 5), 16)
	const b = parseInt(color.slice(5, 7), 16)
	return [r, g, b, 255]
}
