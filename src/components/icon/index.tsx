import clx from "classnames";
interface IconProps {
	iconName: string;
	className?: string;
}
function Icon({ iconName, className = "" }: IconProps) {
	return <i className={clx("iconfont", `da-${iconName}`, className)}></i>;
}

export default Icon;
