import DrawingBoard from '.'

const events: string[] = [
	'mousedown',
	'mousemove',
	'mouseup',
	'mouseleave',
	'touchstart',
	'touchmove',
	'touchend',
	'touchcancel',
]
class Event {
	board: DrawingBoard
	handleListeners: { [key: string]: () => void } = {}
	constructor(board: DrawingBoard) {
		this.board = board
		this.init()
	}

	init() {
		this._registerEvent()
	}

	// 注册事件
	_registerEvent() {
		events.forEach((event: string) => {
			if (event in this) {
				// @ts-ignore
				this.board.drawCanvas.parentNode.addEventListener(
					event,
					// @ts-ignore
					this[event].bind(this),
				)
			}
		})
	}

	// 鼠标按下
	mousedown(e: MouseEvent) {
		const { offsetX, offsetY } = e
		this.board.addPoint({ x: offsetX, y: offsetY })
		this.board.setStartPosition(offsetX, offsetY)
		this.board.setIsMouseDown(true)
		this.board.setDrawCanvasStyle({ zIndex: '10' })
	}

	// 鼠标移动
	mousemove(e: MouseEvent) {
		if (!this.board.isMouseDown) return
		const { offsetX, offsetY } = e
		this.board.addPoint({ x: offsetX, y: offsetY })
		this.board.drawContent()
	}

	// 鼠标抬起
	mouseup(e: MouseEvent) {
		this.board.setIsMouseDown(false)
		this.board.setStartPosition(0, 0)
		if (this.board.isDrawing) {
			this.board.setIsDrawing(false)
			this.board.addHistory()
			this.board.clearPoints()
			this.board.clearDrawCanvas()
			this.board.drawHistory()
			this.board.setDrawCanvasStyle({ zIndex: '-1' })
		}
	}
}

export default Event
