import axios from "axios";
import { useEffect, useState } from "react";
import "./weapons.css";

interface weaponsProps {
	weapon_name: string;
	weapon_image: string;
	weapon_id: number;
	weapon_type: string;
}
function Weapons() {
	const [weapons, setWeapons] = useState<weaponsProps[]>([]);
	useEffect(() => {
		axios
			.get("http://localhost:4242/api/weapons/")
			.then((res) => setWeapons(res.data));
	}, []);
	return (
		<div className="containerWeapons">
			Bienvenue dans les armes de Wz
			<div>
				{weapons.map((weapon) => (
					<div key={weapon.weapon_id}>
						<h2>{weapon.weapon_name}</h2>
						<img
							className="Picture"
							src={weapon.weapon_image}
							alt={weapon.weapon_name}
						/>
						<h3>{weapon.weapon_type}</h3>
					</div>
				))}
			</div>
		</div>
	);
}
export default Weapons;
