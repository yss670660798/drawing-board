import { observer } from 'mobx-react'
import s from './index.module.scss'
import Icon from '../icon'
import boardStore from '@/store/boardStore'
import { Tooltip } from '@arco-design/web-react'
function Header() {
	const { toggleLeftPanel } = boardStore
	return (
		<div className={s.header}>
			<Tooltip content='画笔设置'>
				<span className={s.headerItem} onClick={() => toggleLeftPanel(true)}>
					<Icon iconName='huabi' className={s.icon} />
				</span>
			</Tooltip>
		</div>
	)
}

export default observer(Header)
