import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import AddRotation from "../componants/AddRotation";
import EditRotation from "../componants/EditRotation";
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
	// Pour gérer l'édition d'une rotation, on stocke son id
	const [editingRotationId, setEditingRotationId] = useState<number | null>(
		null,
	);

	const fetchRotations = useCallback(() => {
		axios
			.get("http://localhost:4242/api/rotations/")
			.then((res) => setRotations(res.data))
			.catch((err) => console.error(err));
	}, []);

	useEffect(() => {
		fetchRotations();
	}, [fetchRotations]);

	// Callback qui met à jour la rotation modifiée dans l'état local
	const handleRotationUpdated = (updatedRotation: RotationsProps) => {
		setRotations((prevRotations) =>
			prevRotations.map((r) =>
				r.rotation_id === updatedRotation.rotation_id ? updatedRotation : r,
			),
		);
		setEditingRotationId(null);
	};

	const handleEditClick = (id: number) => {
		setEditingRotationId(id);
	};

	const handleCancelEdit = () => {
		setEditingRotationId(null);
	};

	return (
		<div className="containerGeneralRotation">
			<h2>
				Bienvenue dans les rotations, tu peux créer tes rotations et estimer la
				difficulté de cette dernière :
			</h2>
			<div className="titleRotation">
				<h2>Région de départ</h2>
				<h2>Région d'arrivée</h2>
				<h2>Difficulté</h2>
				<h2>Actions</h2>
			</div>
			<div>
				{rotations.map((rotation) => (
					<div className="rotation" key={rotation.rotation_id}>
						<h2>{rotation.from_region_name}</h2>
						<h2>{rotation.to_region_name}</h2>
						<h2>{rotation.difficulty}</h2>
						<button
							type="button"
							onClick={() => handleEditClick(rotation.rotation_id)}
							className="buttonEdit"
						>
							Modifier
						</button>
						{editingRotationId === rotation.rotation_id && (
							<EditRotation
								rotation={rotation}
								onRotationUpdated={handleRotationUpdated}
								onCancel={handleCancelEdit}
							/>
						)}
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
