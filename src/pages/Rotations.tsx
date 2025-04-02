import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import AddRotation from "../componants/AddRotation";
import "./rotations.css";

interface RotationsProps {
	rotation_id: number;
	from_region_name: string;
	to_region_name: string;
	difficulty: number;
}

function Rotations() {
	const [rotations, setRotations] = useState<RotationsProps[]>([]);
	const [showAddRotation, setShowAddRotation] = useState<boolean>(false);

	const fetchRotations = useCallback(() => {
		axios
			.get("http://localhost:4242/api/rotations/")
			.then((res) => setRotations(res.data))
			.catch((err) => console.error(err));
	}, []);

	useEffect(() => {
		fetchRotations();
	}, [fetchRotations]);

	return (
		<div className="containerGeneralRotation">
			<h2>
				Bienvenue dans les rotations, tu peux créer tes rotations et estimer la
				difficulté de cette dernière:
			</h2>
			<div className="titleRotation">
				<h2>Région de départ:</h2>
				<h2>Région d'arrivée</h2>
				<h2>Difficulté</h2>
			</div>
			<div>
				{rotations.map((rotation) => (
					<div className="rotation" key={rotation.rotation_id}>
						<h2>{rotation.from_region_name}</h2>
						<h2>{rotation.to_region_name}</h2>
						<h2>{rotation.difficulty}</h2>
					</div>
				))}
			</div>
			<div className="containerButton">
				<button
					className="buttonRotation"
					type="button"
					onClick={() => setShowAddRotation(!showAddRotation)}
				>
					Ajouter une rotation
				</button>
			</div>
			{showAddRotation && <AddRotation onRotationAdded={fetchRotations} />}
		</div>
	);
}

export default Rotations;
