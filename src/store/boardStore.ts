import { makeAutoObservable } from "mobx";
import DrawingBoard from "@/drawingBoard";
class BoardStore {
	board: DrawingBoard | undefined = undefined;
	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });
	}
	// 绑定画板
	setBoard(board: DrawingBoard) {
		this.board = board;
	}
}
const boardStore = new BoardStore();
export default boardStore;
