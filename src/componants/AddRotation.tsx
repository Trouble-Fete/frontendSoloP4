import axios from "axios";
import { useEffect, useState } from "react";
import "./AddRotation.css";

interface Region {
	region_id: number;
	region_name: string;
	region_image: string;
}

interface AddRotationProps {
	onRotationAdded: () => void;
}

function AddRotation({ onRotationAdded }: AddRotationProps) {
	const [regions, setRegions] = useState<Region[]>([]);
	const [formData, setFormData] = useState({
		from_region: "",
		to_region: "",
		difficulty: 3,
	});

	useEffect(() => {
		axios
			.get("http://localhost:4242/api/regions/")
			.then((res) => setRegions(res.data))
			.catch((err) => console.error(err));
	}, []);

	const handleChange = (
		e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const fromRegion = regions.find(
			(r) => r.region_id === Number(formData.from_region),
		);
		const toRegion = regions.find(
			(r) => r.region_id === Number(formData.to_region),
		);

		if (!fromRegion || !toRegion) {
			alert("Selectionnes des régions valides.");
			return;
		}

		const payload = {
			from_region_name: fromRegion.region_name,
			to_region_name: toRegion.region_name,
			difficulty: Number(formData.difficulty),
		};

		try {
			const response = await axios.post(
				"http://localhost:4242/api/rotations/",
				payload,
				{
					headers: { "Content-Type": "application/json" },
				},
			);
			console.log("Rotation ajoutée", response.data);
			onRotationAdded();
		} catch (error) {
			console.error("Erreur lors de l'ajout de la rotation", error);
		}
	};

	return (
		<form className="formRotation" onSubmit={handleSubmit}>
			<label className="optionRegion">
				<p className="optionRegion">Région de départ:</p>
				<select
					className="optionRegion"
					name="from_region"
					value={formData.from_region}
					onChange={handleChange}
				>
					<option className="optionRegion" value="">
						Choisis ta région
					</option>
					{regions.map((region) => (
						<option
							className="optionRegion"
							key={region.region_id}
							value={region.region_id}
						>
							{region.region_name}
						</option>
					))}
				</select>
			</label>
			<br />
			<label className="optionRegion">
				<p className="optionRegion">Région d'arrivée:</p>
				<select
					className="optionRegion"
					name="to_region"
					value={formData.to_region}
					onChange={handleChange}
				>
					<option className="optionRegion" value="">
						Choisis ta région
					</option>
					{regions.map((region) => (
						<option
							className="optionRegion"
							key={region.region_id}
							value={region.region_id}
						>
							{region.region_name}
						</option>
					))}
				</select>
			</label>
			<br />
			<label className="optionRegion">
				<p className="optionRegion">Difficulté (1-5):</p>
				<input
					className="optionRegion"
					name="difficulty"
					type="number"
					value={formData.difficulty}
					onChange={handleChange}
					min="1"
					max="5"
				/>
			</label>
			<br />
			<button className="ajoutBoutton" type="submit">
				Ajouter la Rotation
			</button>
		</form>
	);
}

export default AddRotation;
