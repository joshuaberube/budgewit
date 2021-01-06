import React, { useState, useEffect } from "react";
import AddTransactions from "./AddTransactions";
import axios from "axios";

const DBTransactions = () => {
	const [dbTransactions, setDBTransactions] = useState([]);

	useEffect(async () => {
		try {
			const response = await axios.get("/api/data/transactions");
			setDBTransactions(response.data);
			console.log(response.data);
		} catch (err) {}
	}, []);

	return (
		<div>
			{dbTransactions.map((transaction, index) => (
				<div key={index}>
					{transaction.transaction_date.slice(0, 10)}
					<b>Amt: </b>
					{transaction.transaction_amount}
					<b>Transaction Category: </b>
					{transaction.transaction_category}
					<b>Transaction Title: </b>
					{transaction.transaction_title}
					<b>Transaction Description: </b>
					{transaction.transaction_desc}
				</div>
			))}
			<AddTransactions />
		</div>
	);
};
export default DBTransactions;
