import { useEffect, useState } from "react";

const TicketForm = () => {
	const formreset = {
		name: "",
		language: "",
		urgency: "",
		updates: false,
		description: "",
	}

	const [datiform, setDatiform] = useState(formreset)

	//	//Metodo per aggiornare gli state collegati ai campi del form
	function handleForm(event) {
		// console.log(`Nome campo: "${nomecampo}" - Tipocampo ${tipoCampo} - Valore: ${nuovovalore}`);
		// ***********************+
		const nomecampo = event.target.name
		const tipoCampo = event.target.type
		const OggettoAggiornato = { ...datiform }
		// *************************
		// 


		if (tipoCampo == "checkbox") {
			OggettoAggiornato[nomecampo] = event.target.checked
		} else {
			OggettoAggiornato[nomecampo] = event.target.value

		}
		setDatiform(OggettoAggiornato)

		console.log(OggettoAggiornato)
	}
	//Preparo lo state con un array vuoto (la lista dei todo) per portarmi i dati o loggeto della api in questo caso 
	const [todoList, setTodoList] = useState([]);

	useEffect(GetForms, [])
	//metodo per evitare il loop o evitare andare in controlllo al  infinito il form
	function GetForms() {
		const url = "https://6b004fe47fc363ccff0a083d.mockapi.io/forms"

		fetch(url)
			.then(response => {
				if (!response.ok) { throw new Error("Chiamata non ok"); }
				return response.json();
			})
			.then(data => {
				console.log(data);
				setTodoList(data);
			})
			.catch(error => {
				console.error("qualcosa è andato storto");
			});
	}

	function InviaRichiesta() {

		const url = "https://6b004fe47fc363ccff0a083d.mockapi.io/forms"
		const config = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(datiform)
		};

		fetch(url, config)
			.then(response => {
				if (!response.ok) { throw new Error("Chiamata non ok"); }
				return response.json();
			})
			.then(data => {
				console.log("Risultato aggiunta: ", data);
				setDatiform(formreset); //reset del form
			})
			.catch(error => {
				console.error("qualcosa è andato storto");
			});


		// const stamparichiesta = [
		// 	datiform
		// ]//questo è per salvare i dati compilati dai input 
		// console.log(stamparichiesta) // questo mi serve per vedere i dati salvati ed stampati in console

		// setDatiform({
		// 	name: "",
		// 	language: "",
		// 	urgency: "",
		// 	updates: false,
		// 	description: "",
		// });// questo per ressetare il form 
		// ********************

	}
	// ********************+

	return (
		<div className="container mt-4">
			<h2>Richiesta apertura Ticket</h2>
			<div>
				<button onClick={GetForms} type="submit" className="btn btn-primary">Ricupera  richieste</button>
				{todoList.length
					? <ul>{todoList.map((todoItem, i) => <li key={i}>{todoItem.name} - {todoItem.language} - {todoItem.urgency} - {todoItem.updates} - {todoItem.description}</li>)}</ul>
					: <p>La lista al momento è vuota</p>
				}
			</div>

			<div className="p-4 border rounded bg-light">
				{/* Nome */}
				<div className="mb-3">
					<label className="form-label">Nome</label>
					<input value={datiform.name} onChange={handleForm} type="text" name="name" className="form-control" required />
				</div>

				{/* Selezione linguaggio */}
				<div className="mb-3">
					<label className="form-label">Linguaggio di programmazione</label>
					<select value={datiform.language} onChange={handleForm} name="language" className="form-select" >
						<option value="HTML">HTML</option>
						<option value="CSS">CSS</option>
						<option value="JS">JavaScript</option>
						<option value="React">React</option>
						<option value="Express">Express</option>
						<option value="SQL">SQL</option>
					</select>
				</div>

				{/* Radio Urgenza */}
				<div className="mb-3">
					<label className="form-label">Livello di urgenza</label>
					<div>
						<div className="form-check">
							<input checked={datiform.urgency === "low"} type="radio" name="urgency" value="low" onChange={handleForm} id="urgencyLow" className="form-check-input" />
							<label className="form-check-label" htmlFor="urgencyLow">Bassa</label>
						</div>
						<div className="form-check">
							<input checked={datiform.urgency === "medium"} type="radio" name="urgency" value="medium" onChange={handleForm} id="urgencyMedium" className="form-check-input" />
							<label className="form-check-label" htmlFor="urgencyMedium">Media</label>
						</div>
						<div className="form-check">
							<input checked={datiform.urgency === "high"} type="radio" name="urgency" value="high" onChange={handleForm} id="urgencyHigh" className="form-check-input" />
							<label className="form-check-label" htmlFor="urgencyHigh">Alta</label>
						</div>
					</div>
				</div>

				{/* Checkbox aggiornamenti */}
				<div className="mb-3 form-check">
					<input checked={datiform.updates} onChange={handleForm} type="checkbox" name="updates" id="updates" className="form-check-input" />
					<label className="form-check-label" htmlFor="updates">Ricevi aggiornamenti sulla richiesta</label>
				</div>

				{/* Descrizione problema */}
				<div className="mb-3">
					<label className="form-label">Descrizione del problema</label>
					<textarea value={datiform.description} onChange={handleForm} name="description" className="form-control" rows="4" required />
				</div>

				{/* Pulsante di invio */}
				<button onClick={InviaRichiesta} type="submit" className="btn btn-primary">Invia richiesta</button>
			</div>
		</div>
	);
};

export default TicketForm;