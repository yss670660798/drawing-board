import { observer } from 'mobx-react'
import s from './index.module.scss'
import Icon from '../icon'
import boardStore from '@/store/boardStore'
import { Tooltip } from '@arco-design/web-react'
import clx from 'classnames'
function Header() {
	const { toggleLeftPanel, canRevoke, canRestore, board } = boardStore
	return (
		<div className={s.header}>
			<Tooltip content='画笔设置'>
				<span className={s.headerItem} onClick={() => toggleLeftPanel(true)}>
					<Icon iconName='huabi' className={s.icon} />
				</span>
			</Tooltip>
			<Tooltip content='撤销'>
				<span
					className={clx(s.headerItem, { [s.disabled]: !canRevoke })}
					onClick={() => board?.revoke()}
				>
					<Icon iconName='chexiao' className={s.icon} />
				</span>
			</Tooltip>
			<Tooltip content='恢复'>
				<span
					className={clx(s.headerItem, { [s.disabled]: !canRestore })}
					onClick={() => board?.restore()}
				>
					<Icon iconName='fanchexiao' className={s.icon} />
				</span>
			</Tooltip>
		</div>
	)
}

export default observer(Header)
