import "./App.css";
import Board from "@/components/board";
import Header from "./components/header";
import LeftPanel from "./components/leftPanel";
function App() {
	return (
		<>
			<Header />
			<LeftPanel />
			<Board />
		</>
	);
}

export default App;
