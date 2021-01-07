import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Bills = () => {
	const [bills, setBills] = useState([]);

	useEffect(async () => {
		try {
			const response = await axios.get("/api/data/bills");
			setBills(response.data);
			console.log(response.data);
		} catch (err) {}
	}, []);

	return (
		<div>
			{bills.map((bill, index) => (
				<div key={index}>
					{bill.bill_name}
					<b>Amt: </b>S{parseFloat(bill.bill_amount, 2).toFixed(2)}
					<b>Bill Category: </b>
					{bill.bill_category}
					<b>Bill Interval: </b>
					{bill.bill_interval}
					<b>Bill Due: </b>
					{bill.bill_due.slice(0, 10)}
				</div>
			))}
			<Link to={`/addbill`}>
				<button className="bg-green-600 text-white font-sans text-xl">
					Add bill
				</button>
			</Link>
		</div>
	);
};
export default Bills;
