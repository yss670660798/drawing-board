import { observer } from "mobx-react";
import s from "./index.module.scss";
import Icon from "../icon";
import boardStore from "@/store/boardStore";
function Header() {
	const { toggleLeftPanel } = boardStore;
	return (
		<div className={s.header}>
			<span className={s.headerItem} onClick={() => toggleLeftPanel(true)}>
				<Icon iconName="huabi" className={s.icon} />
			</span>
		</div>
	);
}

export default observer(Header);
