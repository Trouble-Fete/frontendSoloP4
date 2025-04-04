import { Outlet } from "react-router-dom";
import Navbar from "./componants/navbar";
import Footer from "./componants/Footer";

function App() {
	return (
		<>
			<main>
				<Navbar />
				<Outlet />
				<Footer />
			</main>
		</>
	);
}

export default App;
