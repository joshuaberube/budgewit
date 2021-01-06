import React, { useState, useEffect } from "react";
import AddBill from "./AddBill";
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
					<b>Amt: </b>
					{bill.bill_amount}
					<b>Bill Category: </b>
					{bill.bill_category}
					<b>Bill Interval: </b>
					{bill.bill_interval}
					<b>Bill Due: </b>
					{bill.bill_due.slice(0, 10)}
				</div>
			))}
			<AddBill />
		</div>
	);
};
export default Bills;
