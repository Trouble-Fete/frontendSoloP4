import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
	return (
		<ul className="navLink">
			<Link to="/">
				<li>Accueil</li>
			</Link>
			<Link to="/regions">
				<li>Spots</li>
			</Link>
			<Link to="/weapons">
				<li>Armes</li>
			</Link>
			<Link to="/rotations">
				<li>Rotations</li>
			</Link>
		</ul>
	);
}
export default Navbar;
