import React, { useContext, useState, useEffect } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [nuevoDonante, setNuevoDonante] = useState({
		nombre: "",
		apellido: "",
		cedula: ""
	});
	useEffect(
		() => {
			actions.featchCargarDonantes();
		},
		[actions.featchCargarDonantes]
	);
	return (
		<div className="container">
			<div className="row">
				{/* mostrar donantes */}
				{store.donantes.map(donante => {
					return (
						<div key={donante.id} className="card" style={{ width: "18rem" }}>
							<img src="..." className="card-img-top" alt="..." />
							<div className="card-body">
								<h5 className="card-title">{donante.cedula}</h5>
								<p className="card-text">{donante.nombre_completo}</p>
								<a href="#" className="btn btn-primary">
									Go somewhere
								</a>
							</div>
						</div>
					);
				})}
			</div>

			<div className="row my-4">
				{/* agregar donantes */}
				{/* nombre */}
				<div className="col-4">
					<label htmlFor="nombre">{"Nombre"}</label>
					<input
						name="nombre"
						type="text"
						value={nuevoDonante.nombre}
						onChange={e =>
							setNuevoDonante({
								...nuevoDonante,
								nombre: e.target.value
							})
						}
					/>
				</div>
				{/* apellido */}
				<div className="col-4">
					<label htmlFor="apellido">{"Apellido"}</label>
					<input
						name="apellido"
						type="text"
						value={nuevoDonante.apellido}
						onChange={e =>
							setNuevoDonante({
								...nuevoDonante,
								apellido: e.target.value
							})
						}
					/>
				</div>
				{/* cedula */}
				<div className="col-4">
					<label htmlFor="cedula">{"Cedula"}</label>
					<input
						name="cedula"
						type="text"
						value={nuevoDonante.cedula}
						onChange={e =>
							setNuevoDonante({
								...nuevoDonante,
								cedula: e.target.value
							})
						}
					/>
				</div>
			</div>
			<button
				className="btn btn-primary"
				onClick={async e => {
					let success = await actions.featchCrearDonante(nuevoDonante);
					if (success) {
						setNuevoDonante({
							nombre: "",
							apellido: "",
							cedula: ""
						});
					} else {
						alert(`Hubo un problema`);
					}
				}}>
				Agregar
			</button>
		</div>
	);
};
