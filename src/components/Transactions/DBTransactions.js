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
					{transaction.date.slice(0, 10)}
					<b>Amt: </b>
					{parseFloat(transaction.amount, 10).toFixed(2)}
					<b>Transaction Category: </b>
					{transaction.category}
					<b>Merchant Name: </b>
					{transaction.merchant_name}
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
