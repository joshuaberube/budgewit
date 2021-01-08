import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const Bills = () => {
	const [bills, setBills] = useState([]);

	useEffect(() => {
		try {
			async function fetchData() {
				const response = await axios.get("/api/data/bills");
				setBills(response.data);
				console.log("response.data: ", response.data);
			}
			fetchData();
		} catch (err) {
			console.log(err);
		}
	}, []);

	return (
		<div className="w-768 bg-gray-100 p-12 rounded-10">
			{bills.map((bill, idx) => (
				<li key="idx" className="list-none">
					<div className="flex flex-row justify-between">
						{" "}
						<span>{bill.bill_name}</span>$
						{parseFloat(bill.bill_amount, 10).toFixed(2)}
						<div className="flex flex-col">
							<span>
								<b>Category</b>
							</span>

							<span>{bill.bill_category}</span>
						</div>
						<div className="flex flex-col">
							<span>
								<b>Interval</b>
							</span>
							<span>{bill.bill_interval}</span>
						</div>
						<span>{bill.bill_due.slice(0, 10)}</span>
					</div>
				</li>
			))}

			<Link to={`/addbill`}>
				<button className="bg-green-600 text-gray-50 font-sans text-xl border-radius-10">
					Add bill
				</button>
			</Link>
		</div>
	);
};
export default Bills;
