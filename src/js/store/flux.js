const baseAPIUrl = "https://3000-f625a86c-85d7-43ad-8e74-b69b3909485c.ws-us02.gitpod.io";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			donantes: [
				{
					id: 1,
					cedula: 16310293,
					nombre: "Oscar",
					apellido: "Marino",
					nombre_completo: "Oscar Marino"
				},
				{
					id: 2,
					cedula: 155555,
					nombre: "Yas",
					apellido: "Valenzuela",
					nombre_completo: "Yas valen"
				}
			],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			featchCargarDonantes: async () => {
				let response = await fetch(`${baseAPIUrl}/donantes`);
				if (response.ok) {
					let donantes = await response.json();
					setStore({
						donantes: donantes
					});
					return true;
				} else {
					console.log(`get response failure: ${response.status}`);
					setStore({
						donantes: []
					});
					return false;
				}
			},
			featchCrearDonante: async nuevoDonante => {
				try {
					let response = await fetch(`${baseAPIUrl}/donantes`, {
						method: "POST",
						body: JSON.stringify(nuevoDonante),
						headers: {
							"Content-Type": "application/json"
						}
					});
					if (response.ok) {
						// hacer fecth por que se creo donante y hay que refrescar la lista
						return getActions().featchCargarDonantes();
					} else {
						setStore({
							dontantes: []
						});
						console.log(`post response failure: ${response.status}`);
						return false;
					}
				} catch (error) {
					console.log(`paso esto; ${error}`);
					return false;
				}
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
