import React, { useState } from "react";
import axios from "axios";

const AddTransactions = () => {
	const [transaction_amount, setAmount] = useState(0);
	const [transaction_category, setCategory] = useState("");

	const [transaction_date, setDate] = useState("");
	const [iso_currency_code, setCurrencyCode] = useState("USD");
	const [pending, setPending] = useState(false);
	const [transaction_title, setTitle] = useState("");
	const [transaction_desc, setDescription] = useState("");

	const handleSubmit = (evt) => {
		evt.preventDefault();
		console.log("displaying amount from handlesubmit:", transaction_amount);
		try {
			let response = axios.post("/api/data/transactions", {
				transaction_amount,
				transaction_category,
				transaction_date,
				iso_currency_code,
				pending,
				transaction_title,
				transaction_desc,
			});
			console.log(response);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Amount:
				<input
					type="number"
					value={transaction_amount}
					onChange={(e) => setAmount(e.target.value)}
				/>
			</label>
			<label>
				Category:
				<input
					type="text"
					value={transaction_category}
					onChange={(e) => setCategory(e.target.value)}
				/>
			</label>
			<label>
				Date:
				<input
					type="date"
					value={transaction_date}
					onChange={(e) => setDate(e.target.value)}
				/>
			</label>
			<label>
				Currency Code:
				<input
					type="text"
					value={iso_currency_code}
					onChange={(e) => setCurrencyCode(e.target.value)}
				/>
			</label>
			<label>
				Status (pending):
				<select>
					<option value="true">true</option>
					<option value={pending}>false</option>
					onChange={(e) => setPending(e.target.value)}
				</select>
			</label>
			<label>
				Transaction Title:
				<input
					type="text"
					value={transaction_title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</label>
			<label>
				Transaction Description:
				<input
					type="text"
					value={transaction_desc}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</label>
			<input type="submit" value="Submit" />
		</form>
	);
};
export default AddTransactions;
