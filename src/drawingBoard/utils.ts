// 画笔素材
export interface Material {
  crayon: HTMLImageElement | null // 蜡笔
}
/**
* 获取蜡笔模版
* @param color 蜡笔底色
* @param crayon 蜡笔素材
*/
export function getCrayonPattern  (color: string, crayon: Material['crayon'])  {
 const canvas = document.createElement('canvas')
 const context = canvas.getContext('2d') as CanvasRenderingContext2D
 canvas.width = 100
 canvas.height = 100
 context.fillStyle = color
 context.fillRect(0, 0, 100, 100)
 if (crayon) {
	 context.drawImage(crayon, 0, 0, 100, 100)
 }
 return context.createPattern(canvas, 'repeat') as CanvasPattern
}
