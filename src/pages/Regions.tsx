import axios from "axios";
import { useEffect, useState } from "react";
import "./Regions.css";

interface RegionsProps {
	region_name: string;
	region_image: string;
	region_id: number;
}
function Regions() {
	const [regions, setRegions] = useState<RegionsProps[]>([]);
	useEffect(() => {
		axios
			.get("http://localhost:4242/api/regions/")
			.then((res) => setRegions(res.data));
	}, []);
	return (
		<div className="containerRegions">
			Bienvenue dans les spots de Verdansk
			<div>
				{regions.map((region) => (
					<div key={region.region_id}>
						<h2>{region.region_name}</h2>
						<img
							className="Picture"
							src={region.region_image}
							alt={region.region_name}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
export default Regions;
