import { DrawData, Point } from '@/drawingBoard/types.ts'

class Eraser {
	private erase(
		ctx: CanvasRenderingContext2D,
		point: Point,
		width: number = 1,
	) {
		const { x, y } = point
		ctx.save()
		ctx.globalCompositeOperation = 'destination-out'
		ctx.beginPath()
		ctx.arc(x, y, width / 2, 0, 2 * Math.PI)
		ctx.fill()
		ctx.restore()
	}

	cleanLine(ctx: CanvasRenderingContext2D, info: Partial<DrawData>) {
		const { points, style } = info
		if (!points?.length) {
			return
		}
		if (points.length === 1) {
			this.erase(ctx, points[0], style?.lineWidth)
		}

		for (let i = 1; i < points.length; i++) {
			const { x: currX, y: currY } = points[i]
			const { x: prevX, y: prevY } = points[i - 1]
			const dx = currX - prevX
			const dy = currY - prevY
			const dist = Math.sqrt(dx * dx + dy * dy)
			for (let i = 1; i < dist; i++) {
				const x = prevX + (dx * i) / dist
				const y = prevY + (dy * i) / dist
				this.erase(ctx, { x, y }, style?.lineWidth)
			}
		}
	}
}

export default Eraser
