import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

import Home from "./pages/home.tsx";
import Regions from "./pages/Regions.tsx";
import ReactDOM from "react-dom/client";

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
		],
	},
]);
const rootElement = document.getElementById("root");
if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
