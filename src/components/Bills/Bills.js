import { useState, useEffect } from "react";
import axios from "axios";
import AddBill from "./AddBill";

const Bills = () => {
	const [bills, setBills] = useState([])
	const [isAddBill, setIsAddBill] = useState(false)

	useEffect(() => {
		try {
			const fetchBills = async () => {
				const response = await axios.get("/api/data/bills");
				setBills(response.data);
			}
			fetchBills()
		} catch (err) {
			console.log(err)
		}
	}, [])

	const addBillButton = () => (
		<div className="mb-12 w-96 mx-auto">
			<input
				type="button"
				value="Add Bill"
				onClick={() => setIsAddBill(!isAddBill)}
				className="py-8 px-12 rounded-10 bg-green-500 text-gray-50 cursor-pointer"
			/>
			<div className="">
				{isAddBill ? (
					<>
						<AddBill setIsAddBill={setIsAddBill} />
						<div className="absolute w-full h-full top-0 left-0 bg-gray-800 opacity-50"></div>
					</>
				) : null}
			</div>                            
		</div>
	)

	return (
		<div className="mx-auto">
			{addBillButton()}
			<div className="w-768 bg-gray-300 rounded-10 mx-auto">
				<ul className="">
					<li className="list-none px-24 h-32 pt-4">
						<div className="flex flex-row">
							<div className="w-256">Title</div>
							<div className="w-256">Price</div>
							<div className="w-256 ml-32">Category</div>
							<div className="w-256 text-center">Due Date</div>
						</div>
					</li>

					{bills.map((bill, idx) => {
						const newDate = new Date(bill.bill_due)
						const options = {day: "numeric", year: "numeric", month: "long"}
    					const formattedDate = newDate.toLocaleString('en-us', options)

						return (
							<li key={idx} className="list-none bg-gray-50 rounded-b-10 px-24 h-32 pt-4">
								<div className="flex flex-row justify-between items-center">
									<span>{bill.bill_name}</span>
									<span>${bill.bill_amount.toFixed(2)}</span>
									<span>{bill.bill_category}</span>
									<span>{formattedDate}</span>
								</div>
							</li>
						)
					})}
				</ul>
			</div>
			
		</div>
	)
}

export default Bills