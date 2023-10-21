import { DrawStyle, Point } from '@/drawingBoard/types.ts'
import { getCrayonPattern } from '@/drawingBoard/utils.ts'

class Brush {
	draw(
		ctx: CanvasRenderingContext2D,
		{ points, style }: { points: Point[]; style: DrawStyle },
	): void {
		const { lineWidth, strokeStyle, material, brushType } = style
		ctx.save()
		ctx.lineCap = 'round'
		ctx.lineJoin = 'round'
		ctx.lineWidth = lineWidth
		ctx.globalCompositeOperation = 'multiply'
		switch (brushType) {
			// case "pencil":
			// 	this.drawPencil(x, y);
			// 	break;
			// case "eraser":
			// 	this.drawEraser(x, y);
			// 	break;
			case 'crayon':
				ctx.strokeStyle = getCrayonPattern(strokeStyle, material.crayon)
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
}

export default Brush
