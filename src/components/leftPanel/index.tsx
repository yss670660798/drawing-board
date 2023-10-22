import { observer } from 'mobx-react'
import s from './index.module.scss'
import clx from 'classnames'
import boardStore from '@/store/boardStore'
import Icon from '../icon'
import Brush from './brush'

const drawTypeName = {
	brush: '画笔',
	fill: '填充',
	eraser: '橡皮擦',
}

function LeftPanel() {
	const { showLeftPanel, toggleLeftPanel, drawType } = boardStore
	return (
		<div className={clx(s.leftPanel, { [s.show]: showLeftPanel })}>
			<div className={s.title}>
				<span className={s.name}>{drawTypeName[drawType]}设置</span>
				<span className={s.close} onClick={() => toggleLeftPanel(false)}>
					<Icon iconName='guanbi' />
				</span>
			</div>
			<div className={s.panelContent}>{showLeftPanel ? <Brush /> : null}</div>
		</div>
	)
}

export default observer(LeftPanel)
