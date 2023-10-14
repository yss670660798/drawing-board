import { makeAutoObservable } from "mobx";
import DrawingBoard from "@/drawingBoard";
class BoardStore {
	board: DrawingBoard | undefined = undefined;
	showLeftPanel: boolean = false;
	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });
	}
	// 绑定画板
	setBoard(board: DrawingBoard) {
		this.board = board;
	}

	// 切换左侧面板
	toggleLeftPanel(visible?: boolean) {
		this.showLeftPanel = visible ?? !this.showLeftPanel;
	}
}
const boardStore = new BoardStore();
export default boardStore;
