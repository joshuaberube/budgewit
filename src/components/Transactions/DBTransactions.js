import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
					{parseFloat(transaction.transaction_amount, 10).toFixed(2)}
					<b>Transaction Category: </b>
					{transaction.transaction_category}
					<b>Transaction Title: </b>
					{transaction.transaction_title}
					<b>Transaction Description: </b>
					{transaction.transaction_desc}
				</div>
			))}
			<Link to={`/addtransactions`}>
				<button className="bg-green-600 text-white font-sans text-xl">
					Add transaction
				</button>
			</Link>
		</div>
	);
};
export default DBTransactions;
