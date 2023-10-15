import DrawingBoard from '@/drawingBoard'
import s from './index.module.scss'
import { useRef, useEffect } from 'react'
import boardStore from '@/store/boardStore'
import { observer } from 'mobx-react'
function Index() {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const wrapRef = useRef<HTMLDivElement>(null)
	const { setBoard, board } = boardStore
	// 初始化画板
	useEffect(() => {
		if (!canvasRef.current) return
		const board = new DrawingBoard(canvasRef.current)
		setBoard(board)
	}, [])

	// 画板大小随窗口变化
	// useEffect(() => {
	// 	const resize = new ResizeObserver((entries) => {
	// 		const { width, height } = (entries[0] && entries[0].contentRect) || {};
	// 		board?.setCanvasSize(width, height);
	// 	});
	// 	if (board) {
	// 		resize.observe(document.body);
	// 	}

	// 	return () => {
	// 		resize.unobserve(document.body);
	// 	};
	// }, [board]);
	return (
		<div className={s.board} ref={wrapRef}>
			<canvas ref={canvasRef}></canvas>
		</div>
	)
}

export default observer(Index)
