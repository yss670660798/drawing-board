import Event from './event'
import { Material, getCrayonPattern } from './utils'
import crayonImgAsset from '../assets/crayon.png'
class DrawingBoard {
	canvas: HTMLCanvasElement // 画布
	ctx: CanvasRenderingContext2D // 画布上下文
	dpr: number = 1
	brushType: string = 'pencil' // 画笔类型 默认铅笔
	isMouseDown: boolean = false // 鼠标是否按下
	isDrawing: boolean = false // 是否正在绘制
	startPosition: { x: number; y: number } = { x: 0, y: 0 } // 绘制起始点
	event: Event // 事件
	lineWidth: number = 20 // 线宽
	strokeStyle: string = '#000' // 线条颜色
	lastPosition: { x: number; y: number } = { x: 0, y: 0 } // 上一个点
	material: Material = {
		crayon: null,
	}
	constructor(canvas: HTMLCanvasElement) {
		this.dpr = window.devicePixelRatio || 1
		this.canvas = canvas
		this.event = new Event(this)
		// @ts-ignore
		this.ctx = canvas.getContext('2d')
		this.ctx.imageSmoothingEnabled = true
		this.init()
		this.loadMaterial()
	}

	init() {
		this.setCanvasSize()
	}

	// 设置画布宽度
	setCanvasSize(width?: number, height?: number) {
		this.canvas.width = width || document.body.clientWidth
		this.canvas.height = height || document.body.clientHeight
		// this.ctx.scale(this.dpr, this.dpr)
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
	// 绘制
	draw(x: number, y: number) {
		this.ctx.save()
		this.ctx.lineCap = 'round'
		this.ctx.lineJoin = 'round'
		this.ctx.lineWidth = this.lineWidth
		switch (this.brushType) {
			// case "pencil":
			// 	this.drawPencil(x, y);
			// 	break;
			// case "eraser":
			// 	this.drawEraser(x, y);
			// 	break;
			case 'crayon':
				this.ctx.strokeStyle = getCrayonPattern(
					this.strokeStyle,
					this.material.crayon,
				)
				break
			case 'shadow':
				this.ctx.shadowColor = this.strokeStyle
				this.ctx.strokeStyle = this.strokeStyle
				break
			default:
				this.ctx.strokeStyle = this.strokeStyle
				break
		}

		if (this.isDrawing === false) {
			this.setIsDrawing(true)
			this.ctx.beginPath()
		}
		this.ctx.moveTo(x, y)
		// if(this.lastPosition.x===0 && this.lastPosition.y===0){
		this.ctx.lineTo(x, y)

		// }else{
		// this.ctx.quadraticCurveTo(x, y)
		// }

		this.ctx.stroke()
		if (this.brushType === 'shadow') {
			this.ctx.shadowBlur = this.lineWidth
		}
	}

	// 清空画板
	clear() {
		this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}

	loadMaterial() {
		return new Promise<void>((resolve) => {
			const crayonImg = new Image()
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			crayonImg.src = crayonImgAsset
			crayonImg.onload = () => {
				this.material.crayon = crayonImg
				resolve()
			}
		})
	}
}

export default DrawingBoard
