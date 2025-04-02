import axios from "axios";
import { useEffect, useState } from "react";
import "./rotations.css";

interface rotationsProps {
	rotation_id: number;
	from_region_name: string;
	to_region_name: string;
	difficulty: number;
}
function Rotations() {
	const [rotations, setRotations] = useState<rotationsProps[]>([]);
	useEffect(() => {
		axios
			.get("http://localhost:4242/api/rotations/")
			.then((res) => setRotations(res.data));
	}, []);
	return (
		<>
			Bienvenue dans les rotations, tu peux creer tes rotations et estimer la
			difficulté de cette derniere:
			<div className="titleRotation">
				<h2>Région de départ:</h2>
				<p>à</p>
				<h2>Région d'arrivée</h2>
				<h2>Difficulté</h2>
			</div>
			<div>
				{rotations.map((rotations) => (
					<div className="rotation" key={rotations.rotation_id}>
						<h2>{rotations.from_region_name}</h2>
						<p>à</p>
						<h2>{rotations.to_region_name}</h2>
						<h3>{rotations.difficulty}</h3>
					</div>
				))}
			</div>
			<button className="buttonRotation" type="button">
				Ajouter une rotation
			</button>
		</>
	);
}
export default Rotations;
