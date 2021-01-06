import { useState, useEffect } from "react";
import axios from "axios";

const Transactions = () => {
	const [dbTransactions, setDBTransactions] = useState([]);

	useEffect(async () => {
		try {
			const response = await axios.get("/api/data/transactions");
			setDBTransactions(response.data);
			console.log(response.data);
		} catch (err) {
      console.log(err)
    }
	}, [])
	return <div></div>
}

export default Transactions
