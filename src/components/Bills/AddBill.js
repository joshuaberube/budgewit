import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const AddBill = () => {
	let history = useHistory();
	const [bill_name, setName] = useState("");
	const [bill_amount, setAmount] = useState(0);
	const [bill_status, setStatus] = useState(false);

	const [bill_category, setCategory] = useState("");

	const [bill_interval, setInterval] = useState(0);

	const [bill_due, setDue] = useState("");

	// const handleSubmit = (evt) => {
	// 	evt.preventDefault();
	// 	try {
	// 		let response = axios.post("/api/data/bills", {
	// 			bill_name,
	// 			bill_amount,
	// 			bill_status,
	// 			bill_category,
	// 			bill_interval,
	// 			bill_due,
	// 		});
	// 		console.log(response);
	// 		history.push("/bills");
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	const handleSubmit = (evt) => {
		evt.preventDefault();
		async function fetchData() {
			try {
				let response = axios.post("/api/data/bills", {
					bill_name,
					bill_amount,
					bill_status,
					bill_category,
					bill_interval,
					bill_due,
				});
				console.log(response);
				history.push("/bills");
			} catch (err) {
				console.log(err);
			}
		}
		fetchData();
	};

	return (
		<div className="flex flex-col items-center content-center bg-grey-300 ">
			<h1 className="font-sans text-xl">Add Bill</h1>
			<form
				className="flex flex-col content-center border-solid border-4 border-light-blue-1200 bg-green-300 rounded-md w-1/2"
				onSubmit={handleSubmit}
			>
				<input
					className="bg-white"
					type="text"
					placeholder="Bill Name"
					value={bill_name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					className="bg-white"
					type="number"
					placeholder="Bill Amount"
					value={bill_amount}
					onChange={(e) => setAmount(e.target.value)}
				/>

				<select>
					<option value="true">true</option>
					<option value={bill_status}>false</option>
					onChange={(e) => setStatus(e.target.value)}
				</select>

				<input
					type="text"
					value={bill_category}
					placeholder="Bill Category"
					onChange={(e) => setCategory(e.target.value)}
				/>

				<input
					className="bg-white"
					type="number"
					value={bill_interval}
					placeholder="Bill Interval"
					onChange={(e) => setInterval(e.target.value)}
				/>

				<input
					className="bg-white"
					type="date"
					value={bill_due}
					placeholder="Bill Due"
					onChange={(e) => setDue(e.target.value)}
				/>

				<input
					className="bg-green-600 text-white font-sans text-xl"
					type="submit"
					value="Submit"
				/>
			</form>
		</div>
	);
};
export default AddBill;
