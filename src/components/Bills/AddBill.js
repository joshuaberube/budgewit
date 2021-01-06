import React, { useState } from "react";
import axios from "axios";

const AddBill = () => {
	const [bill_name, setName] = useState("");
	const [bill_amount, setAmount] = useState(0);
	const [bill_status, setStatus] = useState(false);

	const [bill_category, setCategory] = useState("");

	const [bill_interval, setInterval] = useState(0);

	const [bill_due, setDue] = useState("");

	const handleSubmit = (evt) => {
		evt.preventDefault();
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
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Bill name:
				<input
					type="text"
					value={bill_name}
					onChange={(e) => setName(e.target.value)}
				/>
			</label>
			<label>
				Bill amount:
				<input
					type="number"
					value={bill_amount}
					onChange={(e) => setAmount(e.target.value)}
				/>
			</label>

			<label>
				Status:
				<select>
					<option value="true">true</option>
					<option value={bill_status}>false</option>
					onChange={(e) => setStatus(e.target.value)}
				</select>
			</label>
			<label>
				Bill Category:
				<input
					type="text"
					value={bill_category}
					onChange={(e) => setCategory(e.target.value)}
				/>
			</label>
			<label>
				Bill interval:
				<input
					type="number"
					value={bill_interval}
					onChange={(e) => setInterval(e.target.value)}
				/>
			</label>
			<label>
				Bill due:
				<input
					type="date"
					value={bill_due}
					onChange={(e) => setDue(e.target.value)}
				/>
			</label>
			<input type="submit" value="Submit" />
		</form>
	);
};
export default AddBill;
