import Event from './event'
import { getCrayonPattern, Material } from './utils'
import crayonImgAsset from '../assets/crayon.png'
import boardStore from '@/store/boardStore'
import { getUuid } from '@/utils'

export interface Point {
	x: number
	y: number
}

export interface DrawStyle {
	lineWidth: number
	brushType: string
	strokeStyle: string
}

class DrawingBoard {
	canvas: HTMLCanvasElement // 画布
	drawCanvas: HTMLCanvasElement // 画布
	ctx: CanvasRenderingContext2D // 画布上下文
	drawCtx: CanvasRenderingContext2D // 画布上下文
	dpr: number = 1
	brushType: string = 'pencil' // 画笔类型 默认铅笔
	isMouseDown: boolean = false // 鼠标是否按下
	isDrawing: boolean = false // 是否正在绘制
	startPosition: Point = { x: 0, y: 0 } // 绘制起始点
	event: Event // 事件
	lineWidth: number = 5 // 线宽
	strokeStyle: string = '#000' // 线条颜色
	lastPosition: Point = { x: 0, y: 0 } // 上一个点
	material: Material = {
		crayon: null,
	}
	points: Point[] = []

	constructor(canvas: HTMLCanvasElement) {
		this.dpr = window.devicePixelRatio || 1
		this.canvas = canvas
		this.ctx = <CanvasRenderingContext2D>canvas.getContext('2d')
		const c = document.createElement('canvas')
		this.drawCanvas = c
		this.drawCtx = <CanvasRenderingContext2D>c.getContext('2d')
		this.canvas.parentNode?.appendChild(this.drawCanvas)
		this.event = new Event(this)

		this.init()
		this.loadMaterial()
	}

	init() {
		this.setCanvasSize()
	}

	addPoint(point: Point) {
		this.points.push(point)
	}

	clearPoints() {
		this.points = []
	}

	// 设置画布宽度
	setCanvasSize(width?: number, height?: number) {
		const w = width || document.body.clientWidth
		const h = height || document.body.clientHeight
		this.canvas.width = w
		this.canvas.height = h
		this.drawCanvas.width = w
		this.drawCanvas.height = h
		this.drawCanvas.style.position = 'absolute'
		this.drawCanvas.style.top = '0'
		this.drawCanvas.style.left = '0'
		this.drawCanvas.style.zIndex = '-1'
		// this.ctx.scale(this.dpr, this.dpr)
	}

	setDrawCanvasStyle(style: Partial<CSSStyleDeclaration>) {
		for (const key in style) {
			// @ts-ignore
			this.drawCanvas.style[key] = style[key]
		}
	}

	// 设置画笔类型
	setBrushType(type: string) {
		this.brushType = type
	}

	// 设置起始点
	setStartPosition(x: number, y: number) {
		this.startPosition = { x, y }
	}

	// 设置鼠标是否按下
	setIsMouseDown(isMouseDown: boolean) {
		this.isMouseDown = isMouseDown
	}

	// 设置是否正在绘制
	setIsDrawing(isDrawing: boolean) {
		this.isDrawing = isDrawing
	}

	// 设置线宽
	setLineWidth(lineWidth: number) {
		this.lineWidth = lineWidth
	}

	// 设置线条颜色
	setStrokeStyle(strokeStyle: string) {
		this.strokeStyle = strokeStyle
	}

	drawContent() {
		this.setIsDrawing(true)
		this.clearDrawCanvas()
		this.draw(this.drawCtx, {
			points: this.points,
			style: {
				lineWidth: this.lineWidth,
				brushType: this.brushType,
				strokeStyle: this.strokeStyle,
			},
		})
	}

	// 绘制
	draw(
		ctx: CanvasRenderingContext2D,
		{ points, style }: { points: Point[]; style: DrawStyle },
	) {
		const { lineWidth, brushType, strokeStyle } = style
		ctx.save()
		ctx.lineCap = 'round'
		ctx.lineJoin = 'round'
		ctx.lineWidth = lineWidth
		switch (brushType) {
			// case "pencil":
			// 	this.drawPencil(x, y);
			// 	break;
			// case "eraser":
			// 	this.drawEraser(x, y);
			// 	break;
			case 'crayon':
				ctx.strokeStyle = getCrayonPattern(strokeStyle, this.material.crayon)
				break
			case 'shadow':
				ctx.shadowBlur = lineWidth
				ctx.shadowColor = strokeStyle
				ctx.strokeStyle = strokeStyle
				break
			default:
				ctx.strokeStyle = strokeStyle
				break
		}

		ctx.beginPath()
		const firstPoint = points[0]
		ctx.moveTo(firstPoint.x, firstPoint.y)
		for (let i = 1; i < points.length; i++) {
			ctx.quadraticCurveTo(
				(points[i - 1].x + points[i].x) / 2,
				(points[i - 1].y + points[i].y) / 2,
				points[i].x,
				points[i].y,
			)
		}

		ctx.stroke()
		ctx.restore()
	}

	// 清空画板
	clear() {
		this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}

	clearDrawCanvas() {
		this.drawCtx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}

	// 添加历史记录
	addHistory() {
		const { pushData } = boardStore
		pushData({
			id: getUuid(),
			points: this.points,
			style: {
				lineWidth: this.lineWidth,
				brushType: this.brushType,
				strokeStyle: this.strokeStyle,
			},
		})
	}

	// 绘制历史数据
	drawHistory() {
		this.clear()
		const { drawData } = boardStore
		drawData.forEach(({ points, style }) => {
			this.draw(this.ctx, { points, style })
		})
	}

	// 撤销
	revoke() {
		const { revoke } = boardStore
		revoke()
		this.drawHistory()
	}

	// 恢复
	restore() {
		const { restore } = boardStore
		restore()
		this.drawHistory()
	}

	loadMaterial() {
		return new Promise<void>((resolve) => {
			const crayonImg = new Image()
			crayonImg.src = crayonImgAsset
			crayonImg.onload = () => {
				this.material.crayon = crayonImg
				resolve()
			}
		})
	}
}

export default DrawingBoard
