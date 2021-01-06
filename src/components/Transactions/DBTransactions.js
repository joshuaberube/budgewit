import React, { useState, useEffect } from "react";
import AddTransactions from "./AddTransactions";
import axios from "axios";

const DBTransactions = () => {
	const [dbTransactions, setDBTransactions] = useState([]);

	useEffect(async () => {
		try {
			const response = await axios.get("/api/data/transactions");
			console.log("response", response);
			setDBTransactions(response.data);
		} catch (err) {
			console.log(err);
		}
	});

	return (
		<div>
			{dbTransactions.map((transaction, index) => (
				<div key={index}>
					{" "}
					{transaction.transaction_date.slice(0, 10)} <b>Amount:</b> $
					{parseFloat(transaction.transaction_amount, 10).toFixed(2)}
					<b> category: </b>
					{transaction.transaction_category} title:{" "}
					{transaction.transaction_title} <b>description:</b>{" "}
					{transaction.transaction_desc}
				</div>
			))}
			<AddTransactions />
		</div>
	);
};

export default DBTransactions;
