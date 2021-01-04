import React, { useState, useEffect } from "react";
import axios from "axios";

const Transactions = () => {
	const [dbTransactions, setDBTransactions] = useState([]);

	useEffect(() => {
		try {
			const dbTransactions = axios.get("/api/data/transactions");
			console.log("dbTransactions: ", dbTransactions);
		} catch (err) {}
	});
	return <div></div>;
};

export default Transactions;
