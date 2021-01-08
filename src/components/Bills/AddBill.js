import { useRef, useState, useEffect } from "react"
import axios from "axios";
import CategoriesDropdown from "../shared/CategoriesDropdown/CategoriesDropdown";

const AddBill = ({setIsAddBill}) => {
	const [bill_name, setName] = useState("");
	const [bill_amount, setAmount] = useState(0);
	// const [bill_status, setStatus] = useState(false);

	const [bill_category, setCategory] = useState("");
	// const [bill_interval, setInterval] = useState(0);
	const [bill_due, setDue] = useState("");
	
	const ref = useRef(null)

	useEffect(() => {
        const handleClickOutside = e => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsAddBill(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [ref, setIsAddBill])
	

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			await axios.post("/api/data/bills", {
				bill_name,
				bill_amount,
				bill_category,
				bill_due
			})
			setIsAddBill(false)
		} catch (err) {
			console.log(err)
		}
	}

	const inputsArr = [
		{type: "text", placeholder: "Title", setState: setName},
		{type: "number", placeholder: "Amount", setState: setAmount},
		{type: "date", placeholder: "Due Date", setState: setDue}
	]


	const inputsMapped = inputsArr.map(({type, placeholder, setState}, index) => (
        <input
            key={index}
            type={type} 
            placeholder={placeholder} 
            onChange={e => setState(e.target.value)}
            className="rounded-5 mb-16 h-40 w-256 p-12 text-sm placeholder-gray-400 text-gray-800 bg-gray-50 font-semibold tracking-wide"
        />
	))
	
	return (
		<div ref={ref} className="w-768 bg-gray-300 rounded-10 flex flex-col shadow-2xl absolute z-50">
            <div className="px-80 py-48">
                <div className="flex flex-row justify-between items-baseline">
                    <h1 className="text-3xl text-gray-600 font-extrabold">Add A Bill</h1>
                    <input type="reset" value="Cancel" onClick={() => setIsAddBill(false)} className="bg-transparent cursor-pointer font-bold text-gray-600" />
                </div>
				<form className="flex flex-row border-t border-gray-400 pt-16 mt-2" onSubmit={handleSubmit}>
					<div className="flex flex-col mx-auto">
						{inputsMapped}
						<CategoriesDropdown setState={e => setCategory(e.target.value)} />
						<button type="submit" className="bg-green-500 rounded-5 h-40 w-256 text-gray-50">Add Bill</button>
					</div>
				</form>
			</div>
        </div>
	)
}

export default AddBill;
