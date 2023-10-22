import boardStore from '@/store/boardStore'
import { Form, Radio, Slider } from '@arco-design/web-react'
import { observer } from 'mobx-react'

function Brush() {
	const { board, drawType } = boardStore
	const brushes = [
		{ value: 'pencil', label: '铅笔' },
		{ value: 'crayon', label: '蜡笔' },
		{ value: 'shadow', label: '荧光' },
	]
	return (
		<Form layout='vertical'>
			{drawType !== 'eraser' ? (
				<Form.Item label='颜色'>
					<input
						style={{ width: '100%' }}
						type='color'
						onChange={(e) => {
							board?.setStrokeStyle(e.target.value)
						}}
					/>
				</Form.Item>
			) : null}
			{drawType != 'fill' ? (
				<Form.Item label='线宽'>
					<Slider
						min={1}
						max={30}
						onChange={(val) => board?.setLineWidth(val as number)}
						defaultValue={5}
					/>
				</Form.Item>
			) : null}
			{drawType === 'brush' ? (
				<Form.Item label='画笔类型'>
					<Radio.Group
						options={brushes}
						defaultValue={'pencil'}
						onChange={(val) => board?.setBrushType(val)}
						size='small'
					></Radio.Group>
				</Form.Item>
			) : null}
		</Form>
	)
}

export default observer(Brush)
