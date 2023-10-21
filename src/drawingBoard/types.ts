// 坐标点
export interface Point {
	x: number
	y: number
}

export type DrawType = 'brush' | 'fill' | 'eraser'

export interface Material {
	crayon: HTMLImageElement | null // 蜡笔
}

// 绘制的样式
export interface DrawStyle {
	lineWidth: number
	brushType: string
	strokeStyle: string
	material: Material
}

export type BrushType = 'pencil' | 'crayon' | 'shadow'

export interface DrawData {
	id: string
	type: DrawType
	points: Point[]
	style: DrawStyle
	time?: number
}
