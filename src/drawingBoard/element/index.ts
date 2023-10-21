class Element {
	stroke: HTMLDivElement

	constructor(container: HTMLDivElement, size: number) {
		this.stroke = document.createElement('div')
		this.stroke.style.position = 'absolute'
		this.stroke.style.border = '1px solid #e0e0e0'
		this.stroke.style.borderRadius = '50%'
		this.stroke.style.width = `${size}px`
		this.stroke.style.height = `${size}px`
		// this.stroke.style.zIndex = '8'
		this.stroke.style.transform = 'translate(-50%, -50%)'
		this.stroke.style.pointerEvents = 'none'
		container.appendChild(this.stroke)
	}

	strokeMove(x: number, y: number) {
		this.stroke.style.left = `${x}px`
		this.stroke.style.top = `${y}px`
	}

	setStrokeBg(color: string) {
		this.stroke.style.background = color
	}

	setStrokeSize(size: number) {
		this.stroke.style.width = `${size}px`
		this.stroke.style.height = `${size}px`
	}

	setStrokeOpacity(opacity: number = 0) {
		this.stroke.style.opacity = `${opacity}`
	}
}

export default Element
