import { Point } from '@/drawingBoard/types.ts'
import DrawingBoard from '@/drawingBoard'
import { convertColorToRGBA } from '@/utils'

class Fill {
	board: DrawingBoard

	constructor(board: DrawingBoard) {
		this.board = board
	}

	_fill({ x, y }: Point, color: string) {
		const imageData = this.board.ctx.getImageData(
			0,
			0,
			this.board.canvas.width,
			this.board.canvas.height,
		)
		const currColor = this.getColor(x, y, imageData)
		const targetColor = convertColorToRGBA(color)
		// console.log(currColor, targetColor)
		this.changeColor(x, y, imageData, targetColor, currColor)
		this.board.ctx.putImageData(imageData, 0, 0)
	}

	private changeColor(
		x: number,
		y: number,
		imageData: ImageData,
		targetColor: number[],
		currColor: number[],
	) {
		const stack: number[][] = [[x, y]]
		while (stack.length > 0) {
			// @ts-ignore
			const [sx, sy] = stack.pop()
			const i = this.point2Index(sx, sy)
			const c = this.getColor(sx, sy, imageData)
			if (
				sx < 0 ||
				sx >= this.board.canvas.width ||
				sy < 0 ||
				sy >= this.board.canvas.height
			) {
				continue
			}
			const diff1 = this.diff(c, targetColor)
			const diff2 = this.diff(c, currColor)
			if (diff1 === 0 || diff2 > 50) {
				continue
			}
			imageData.data.set(targetColor, i)
			stack.push([sx + 1, sy], [sx - 1, y], [sx, sy + 1], [sx, sy - 1])
		}
	}

	private diff(c1: number[], c2: number[]) {
		return (
			Math.abs(c1[0] - c2[0]) +
			Math.abs(c1[1] - c2[1]) +
			Math.abs(c1[2] - c2[2])
		)
	}

	private point2Index(x: number, y: number) {
		return (y * this.board.canvas.width + x) * 4
	}

	private getColor(x: number, y: number, imgData: ImageData) {
		const index = this.point2Index(x, y)
		return [
			imgData.data[index],
			imgData.data[index + 1],
			imgData.data[index + 2],
			imgData.data[index + 3],
		]
	}
}

export default Fill
