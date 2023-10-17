import { makeAutoObservable } from 'mobx'
import DrawingBoard, { DrawStyle, Point } from '@/drawingBoard'

interface DrawData {
	id: string
	points: Point[]
	style: DrawStyle
}
class BoardStore {
	board: DrawingBoard | undefined = undefined
	showLeftPanel: boolean = false
	drawData: DrawData[] = []
	revokeData: DrawData[] = []
	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
	}
	// 撤销
	get canRevoke() {
		return this.drawData.length > 0
	}
	revoke() {
		if (this.canRevoke) {
			const data = this.drawData.pop()
			if (data) {
				this.revokeData.push(data)
			}
		}
	}
	// 回复
	get canRestore() {
		return this.revokeData.length > 0
	}
	restore() {
		if (this.canRestore) {
			const data = this.revokeData.pop()
			if (data) {
				this.drawData.push(data)
			}
		}
	}
	// 绑定画板
	setBoard(board: DrawingBoard) {
		this.board = board
	}

	// 切换左侧面板
	toggleLeftPanel(visible?: boolean) {
		this.showLeftPanel = visible ?? !this.showLeftPanel
	}

	// 保存绘制数据
	pushData(data: DrawData) {
		this.drawData.push(data)
	}
	clearData() {
		this.drawData = []
	}
}
const boardStore = new BoardStore()
export default boardStore
