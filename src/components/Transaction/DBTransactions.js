import React, { useState, useEffect } from "react";
import axios from "axios";

const DBTransactions = () => {
	const [dbTransactions, setDBTransactions] = useState([]);

	useEffect(() => {
		try {
			const dbTransactions = axios.get("/api/data/transactions");
			setDBTransactions(dbTransactions);
		} catch (err) {
			console.log(err);
		}
	});

	const transactionsMapped = dbTransactions.map((transaction) => (
		<TransactionRowItem
			key={transaction.transaction_id}
			transaction={transaction}
		/>
	));
	return <div>{transactionMapped}</div>;
};

export default DBTransactions;
