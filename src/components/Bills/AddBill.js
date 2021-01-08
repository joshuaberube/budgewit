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
		<div className="container max-h-full flex flex-col items-center content-center bg-gray-300 borderRadius-10 ">
			<h1 className="font-sans font-bold text-4xl box-border">Add Bill</h1>
			<form
				className="flex flex-col content-center border-solid border-4 border-light-blue-1200 bg-green-300 rounded-md w-1/2"
				onSubmit={handleSubmit}
			>
				<label className="text-gray-300 text-2xl">Bill Name</label>
				<input
					className="bg-gray-50 text-2xl"
					type="text"
					placeholder="Bill Name"
					value={bill_name}
					onChange={(e) => setName(e.target.value)}
				/>
				<label className="text-gray-300 text-2xl">Bill Amount</label>
				<input
					className="bg-gray-50 text-2xl"
					type="number"
					placeholder="Bill Amount"
					value={bill_amount}
					onChange={(e) => setAmount(e.target.value)}
				/>
				<label className="text-gray-300 text-2xl">Bill pending?</label>
				<select className="text-2xl">
					<option value="true">true</option>
					<option value={bill_status}>false</option>
					onChange={(e) => setStatus(e.target.value)}
				</select>
				<label className="text-gray-300 text-2xl">Bill Category</label>
				<input
					type="text"
					value={bill_category}
					placeholder="Bill Category"
					onChange={(e) => setCategory(e.target.value)}
				/>
				<label className="text-gray-300 text-2xl">Bill Interval</label>
				<input
					className="bg-gray-50 text-2xl"
					type="number"
					value={bill_interval}
					placeholder="Bill Interval"
					onChange={(e) => setInterval(e.target.value)}
				/>
				<label className="text-gray-300 text-2xl"> Bill Due Date</label>
				<input
					className="bg-gray-50 text-2xl"
					type="date"
					value={bill_due}
					placeholder="Bill Due"
					onChange={(e) => setDue(e.target.value)}
				/>

				<input
					className="bg-green-600 text-gray-50 font-sans text-3xl border-radius-10"
					type="submit"
					value="Submit"
				/>
			</form>
		</div>
	);
};
export default AddBill;
