import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const AddTransactions = () => {
	let history = useHistory();
	const [transaction_amount, setAmount] = useState(0);
	const [transaction_category, setCategory] = useState([]);

	const [transaction_date, setDate] = useState("");
	const [iso_currency_code, setCurrencyCode] = useState("USD");
	const [pending, setPending] = useState(false);
	const [transaction_title, setTitle] = useState("");
	const [transaction_desc, setDescription] = useState("");

	const handleSubmit = (evt) => {
		evt.preventDefault();
		async function fetchData() {
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
				history.push("/apptransactions");
			} catch (err) {
				console.log(err);
			}
		}
		fetchData();
	};

	return (
		<div className="flex flex-col items-center bg-grey-300">
			<h1 className="font-sans text-xl">Add Transaction</h1>
			<form
				className="flex flex-col border-solid border-4 border-light-blue-1200 bg-gray-300 rounded-md w-1/2"
				onSubmit={handleSubmit}
			>
				<input
					className="bg-white"
					type="number"
					placeholder="Amount"
					value={transaction_amount}
					onChange={(e) => setAmount(e.target.value)}
				/>

				<input
					className="bg-white"
					type="text"
					placeholder="Category"
					value={[transaction_category]}
					onChange={(e) => setCategory(e.target.value)}
				/>

				<input
					className="bg-white"
					type="date"
					placeholder="Date"
					value={transaction_date}
					onChange={(e) => setDate(e.target.value)}
				/>
				<input
					className="bg-white"
					type="text"
					placeholder="Currency Code"
					value={iso_currency_code}
					onChange={(e) => setCurrencyCode(e.target.value)}
				/>

				<select>
					<option value="true">true</option>
					<option value={pending}>false</option>
					onChange={(e) => setPending(e.target.value)}
				</select>
				<input
					className="bg-white"
					type="text"
					placeholder="Transaction Title"
					value={transaction_title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<input
					className="bg-white"
					type="text"
					placeholder="Transaction Description"
					value={transaction_desc}
					onChange={(e) => setDescription(e.target.value)}
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
export default AddTransactions;
