import axios from "axios";
import { useState, useEffect } from "react";
import "./editRotation.css";

interface Rotation {
	rotation_id: number;
	from_region_name: string;
	to_region_name: string;
	difficulty: number;
}

interface Region {
	region_id: number;
	region_name: string;
}

interface EditRotationProps {
	rotation: Rotation;
	onRotationUpdated: (updatedRotation: Rotation) => void;
	onCancel: () => void;
}

const EditRotation = ({
	rotation,
	onRotationUpdated,
	onCancel,
}: EditRotationProps) => {
	const [regions, setRegions] = useState<Region[]>([]);
	const [fromRegion, setFromRegion] = useState<string>(
		rotation.from_region_name,
	);
	const [toRegion, setToRegion] = useState<string>(rotation.to_region_name);
	const [difficulty, setDifficulty] = useState<number>(rotation.difficulty);

	useEffect(() => {
		const fetchRegions = async () => {
			try {
				const res = await axios.get("http://localhost:4242/api/regions/");
				setRegions(res.data);
			} catch (error) {
				console.error("Erreur lors de la récupération des régions", error);
			}
		};
		fetchRegions();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await axios.put(
				`http://localhost:4242/api/rotations/${rotation.rotation_id}`,
				{
					from_region_name: fromRegion,
					to_region_name: toRegion,
					difficulty,
				},
			);
			// On suppose que le serveur renvoie la rotation mise à jour
			const updatedRotation: Rotation = response.data;
			// On passe la rotation mise à jour au composant parent
			onRotationUpdated(updatedRotation);
		} catch (error) {
			console.error("Erreur lors de la mise à jour de la rotation :", error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="editRotationForm">
			<div>
				<label htmlFor="fromRegionSelect">Région de départ:</label>
				<select
					id="fromRegionSelect"
					value={fromRegion}
					onChange={(e) => setFromRegion(e.target.value)}
				>
					<option value="">Choisis ta région</option>
					{regions.map((region) => (
						<option key={region.region_id} value={region.region_name}>
							{region.region_name}
						</option>
					))}
				</select>
			</div>
			<div>
				<label htmlFor="toRegionSelect">Région d'arrivée:</label>
				<select
					id="toRegionSelect"
					value={toRegion}
					onChange={(e) => setToRegion(e.target.value)}
				>
					<option value="">Choisis ta région</option>
					{regions.map((region) => (
						<option key={region.region_id} value={region.region_name}>
							{region.region_name}
						</option>
					))}
				</select>
			</div>
			<div>
				<label htmlFor="difficultyInput">Difficulté:</label>
				<input
					id="difficultyInput"
					type="number"
					value={difficulty}
					onChange={(e) => setDifficulty(Number(e.target.value))}
					placeholder="Difficulté"
				/>
			</div>
			<div className="editRotationActions">
				<button type="submit">Sauvegarder</button>
				<button type="button" onClick={onCancel}>
					Annuler
				</button>
			</div>
		</form>
	);
};

export default EditRotation;
