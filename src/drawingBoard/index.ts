import boardStore from '@/store/boardStore'
import Brush from './brush'
import Element from './element'
import {
	BrushType,
	DrawData,
	DrawType,
	Material,
	Point,
} from '@/drawingBoard/types.ts'
import Eraser from '@/drawingBoard/eraser'
import { getUuid } from '@/utils'
import crayonImgAsset from '@/assets/images/crayon-bg.png'
import Fill from '@/drawingBoard/fill'

interface BoardOptions {
	container: HTMLDivElement | string
}

class DrawingBoard {
	readonly $container: HTMLDivElement // 画布容器
	readonly canvas: HTMLCanvasElement // 画布
	readonly ctx: CanvasRenderingContext2D // 画布上下文

	readonly dpr: number = 1
	private isDrawing: boolean = false // 是否正在绘制
	private _brush: Brush
	private _eraser: Eraser
	private _stroke: Element
	private _fill: Fill
	private _drawType: DrawType = 'brush'
	private isMouseDown: boolean = false
	private points: Point[] = []

	private _brushType: BrushType = 'pencil'
	private _lineWidth: number = 5 // 线宽
	private _strokeStyle: string = '#000' // 线条颜色
	private material: Material = {
		crayon: null,
	}

	get drawType() {
		return this._drawType
	}

	constructor(options: BoardOptions) {
		const { container } = options
		if (!container) {
			throw Error('container is not exist')
		}
		this.dpr = window.devicePixelRatio || 1
		if (typeof container === 'string') {
			this.$container = document.querySelector(container) as HTMLDivElement
		}
		if (container instanceof HTMLDivElement) {
			this.$container = container
		}

		// @ts-ignore
		if (!this.$container) {
			throw Error('container is not exist')
		}

		this.canvas = document.createElement('canvas')
		this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d')
		this.$container.appendChild(this.canvas)
		// 初始化画笔
		this._brush = new Brush()
		this._eraser = new Eraser()
		this._stroke = new Element(this.$container, this._lineWidth)
		this._fill = new Fill(this)
		this.init()
		this.loadMaterial()
	}

	init() {
		this.setCursor('pencil')
		this.setCanvasSize()
		this.ctx.imageSmoothingEnabled = true
		this.clear()
		this._registerEvents()
	}

	private _registerEvents(): void {
		this.canvas.addEventListener('mousedown', this.mouseDown.bind(this))
		this.canvas.addEventListener('mousemove', this.mouseMove.bind(this))
		this.canvas.addEventListener('mouseup', this.mouseUp.bind(this))
		this.canvas.addEventListener('contextmenu', this.contextMenu.bind(this))
	}

	contextMenu(e: MouseEvent) {
		e.preventDefault()
	}

	// 鼠标松开
	private mouseUp(e: MouseEvent) {
		// 不是左键不执行
		if (e.button !== 0) return
		this._stroke.setStrokeBg('transparent')
		this.isMouseDown = false
		this.addHistory({
			id: getUuid(),
			type: this._drawType,
			points: this.points,
			style: {
				lineWidth: this._lineWidth,
				brushType: this._brushType,
				strokeStyle: this._strokeStyle,
				material: this.material,
			},
			time: new Date().getTime(),
		})
		this.points = []
	}

	// 鼠标移动
	private mouseMove(e: MouseEvent): void {
		const { clientX, clientY, target } = e
		this._stroke.strokeMove(clientX, clientY)
		if (!this.isMouseDown) return
		this.points.push({ x: clientX, y: clientY })
		this.drawHistory()
	}

	// 鼠标按下
	private mouseDown = (e: MouseEvent): void => {
		// 不是左键不执行逻辑
		if (e.button !== 0) {
			e.preventDefault()
			return
		}
		const { offsetX, offsetY } = e
		this.points.push({ x: offsetX, y: offsetY })
		// 填充模式
		if (this._drawType === 'fill') {
			return
		}
		// @ts-ignore
		this.isMouseDown = true
		if (this._drawType === 'brush') {
			this._stroke.setStrokeBg(this._strokeStyle)
		}
	}

	changeDrawType(type: DrawType): void {
		const { setDrawType } = boardStore
		this._drawType = type
		let opacity: number = 0
		switch (type) {
			// @ts-ignore
			case 'eraser':
				opacity = 1
			// eslint-disable-next-line no-fallthrough
			case 'fill':
				this._stroke.setStrokeOpacity(opacity)
				this.setCursor(type)
				break
		}
		setDrawType(type)
	}

	// 设置画笔类型
	setBrushType(type: BrushType): void {
		const { setDrawType } = boardStore
		this._drawType = 'brush'
		this._brushType = type
		setDrawType('brush')
		this._stroke.setStrokeOpacity(1)
		this.setCursor(type)
	}

	// 设置线宽
	setLineWidth(lineWidth: number) {
		this._lineWidth = lineWidth
		this._stroke.setStrokeSize(lineWidth)
	}

	// 设置线条颜色
	setStrokeStyle(strokeStyle: string) {
		this._strokeStyle = strokeStyle
	}

	// 设置鼠标样式
	setCursor(cursor: string): void {
		this.$container.style.setProperty('--cursor', `var(--cursor-${cursor})`)
	}

	// 设置画布宽度
	setCanvasSize(width?: number, height?: number) {
		const w = width || document.body.clientWidth
		const h = height || document.body.clientHeight
		this.canvas.width = w
		this.canvas.height = h
		this.canvas.style.position = 'reactive'
		this.canvas.style.width = `${w}px`
		this.canvas.style.height = `${h}px`
		this.canvas.style.zIndex = '5'
	}

	// 清空画板
	clear() {
		this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.ctx.save()
		this.ctx.fillStyle = '#fff'
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
		this.ctx.restore()
	}

	// 添加历史记录
	addHistory(data: DrawData) {
		const { pushData } = boardStore
		pushData(data)
		this.drawHistory()
	}

	// 绘制历史数据
	drawHistory() {
		this.clear()
		const { drawData } = boardStore
		const data = [...drawData]
		// 鼠标按下表示还在绘制中，加入当前需要绘制的点
		if (this.isMouseDown) {
			data.push({
				id: getUuid(),
				type: this._drawType,
				points: [...this.points],
				style: {
					lineWidth: this._lineWidth,
					brushType: this._brushType,
					strokeStyle: this._strokeStyle,
					material: this.material,
				},
				time: new Date().getTime(),
			})
		}
		data.forEach(({ points, style, type }) => {
			switch (type) {
				case 'brush':
					this._brush.draw(this.ctx, { points, style })
					break
				case 'eraser':
					this._eraser.cleanLine(this.ctx, { points, style })
					break
				case 'fill':
					this._fill._fill(points[0], style.strokeStyle)
			}
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

	private loadMaterial() {
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
