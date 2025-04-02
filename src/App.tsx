import { Outlet } from "react-router-dom";
import Navbar from "./componants/navbar";

function App() {
	return (
		<>
			<main>
				<Navbar />
				<Outlet />
			</main>
		</>
	);
}

export default App;
