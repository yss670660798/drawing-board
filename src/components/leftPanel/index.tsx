import { observer } from "mobx-react";
import s from "./index.module.scss";
import clx from "classnames";
import boardStore from "@/store/boardStore";
import Icon from "../icon";
function LeftPanel() {
	const { showLeftPanel, toggleLeftPanel } = boardStore;
	return (
		<div className={clx(s.leftPanel, { [s.show]: showLeftPanel })}>
			<div className={s.title}>
				<span className={s.name}>画笔设置</span>
				<span className={s.close} onClick={() => toggleLeftPanel(false)}>
					<Icon iconName="guanbi" />
				</span>
			</div>
			<div className={s.panelContent}></div>
		</div>
	);
}

export default observer(LeftPanel);
