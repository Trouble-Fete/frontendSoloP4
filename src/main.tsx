import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

import Home from "./pages/Home.tsx";
import Regions from "./pages/Regions.tsx";
import ReactDOM from "react-dom/client";
import Weapons from "./pages/Weapons.tsx";
import Rotations from "./pages/Rotations.tsx";

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/regions",
				element: <Regions />,
			},
			{
				path: "/weapons",
				element: <Weapons />,
			},
			{
				path: "/rotations",
				element: <Rotations />,
			},
		],
	},
]);
const rootElement = document.getElementById("root");
if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
