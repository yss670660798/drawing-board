import Event from "./event";

class DrawingBoard {
	canvas: HTMLCanvasElement; // 画布
	ctx: CanvasRenderingContext2D; // 画布上下文
	dpr: number = 1;
	brushType: string = "pencil"; // 画笔类型 默认铅笔
	isMouseDown: boolean = false; // 鼠标是否按下
	isDrawing: boolean = false; // 是否正在绘制
	startPosition: { x: number; y: number } = { x: 0, y: 0 }; // 绘制起始点
	event: Event; // 事件
	lineWidth: number = 1; // 线宽
	constructor(canvas: HTMLCanvasElement) {
		this.dpr = window.devicePixelRatio || 1;
		this.canvas = canvas;
		this.event = new Event(this);
		// @ts-ignore
		this.ctx = canvas.getContext("2d");
		this.init();
	}

	init() {
		this.setCanvasSize();
	}

	// 设置画布宽度
	setCanvasSize(width?: number, height?: number) {
		this.canvas.width = width || document.body.clientWidth;
		this.canvas.height = height || document.body.clientHeight;
	}

	// 设置画笔类型
	setBrushType(type: string) {
		this.brushType = type;
	}
	// 设置起始点
	setStartPosition(x: number, y: number) {
		this.startPosition = { x, y };
	}

	// 设置鼠标是否按下
	setIsMouseDown(isMouseDown: boolean) {
		this.isMouseDown = isMouseDown;
	}
	// 设置是否正在绘制
	setIsDrawing(isDrawing: boolean) {
		this.isDrawing = isDrawing;
	}
	// 绘制
	draw(x: number, y: number) {
		this.ctx.lineCap = "round";
		this.ctx.lineJoin = "round";
		this.ctx.strokeStyle = "#000";
		if (this.isDrawing === false) {
			this.setIsDrawing(true);
			this.ctx.beginPath();
			this.ctx.moveTo(x, y);
		}
		this.ctx.lineTo(x, y);
		this.ctx.stroke();
	}

	// 清空画板
	clear() {
		this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

export default DrawingBoard;
