import { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { useHistory } from "react-router"
import CategoriesDropdown from "../../shared/CategoriesDropdown/CategoriesDropdown"

const AddTransactions = ({setIsAddTransaction}) => {
	const history = useHistory()
	const [amount, setAmount] = useState(0)
	const [account_id, setAccountId] = useState("")
	const [category, setCategory] = useState()
	const accounts = useSelector(state => state.plaid.accounts)
	const ref = useRef(null)
	const [date, setDate] = useState("")
	const [iso_currency_code, setCurrencyCode] = useState("USD")
	const [merchant_name, setMerchantName] = useState("")
	
	useEffect(() => {
        const handleClickOutside = e => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsAddTransaction(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref, setIsAddTransaction])

	const handleSubmit = (evt) => {
		evt.preventDefault()
		async function fetchData() {
			try {
				await axios.post("/api/data/transactions", {
					amount,
					account_id,
					category: `{"${category}"}`,
					date,
					iso_currency_code,
					merchant_name,
				})
				history.push("/apptransactions")
			} catch (err) {
				console.log(err)
			}
		}
		fetchData()
	}

	const accountsMapped = accounts.map(({ account_id, name }) => (
		<option key={account_id} value={account_id}>
			{name}
		</option>
	))

	return (
		<div className="container max-h-full flex flex-col items-center content-center bg-gray-300 borderRadius-10 ">
			<h1 className="font-sans text-xl">Add Transaction</h1>
			<form
				className="flex flex-col border-solid border-4 border-light-blue-1200 bg-gray-300 rounded-md w-1/2"
				onSubmit={handleSubmit}
			>
				<label>Amount</label>
				<input
					className="bg-white"
					type="number"
					placeholder="Amount"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
				/>
				<label>Account</label>
				<select accountsMapped onChange={(e) => setAccountId(e.target.value)}>
					<option value="" disabled>
						Select Account
					</option>
					{accountsMapped}
				</select>

				<label>Categories</label>
				<CategoriesDropdown setState={(e) => setCategory(e.target.value)} />
				<label>Date</label>
				<input
					className="bg-white"
					type="date"
					placeholder="Date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
				/>
				<label>ISO Currency Code</label>
				<input
					className="bg-white"
					type="text"
					placeholder="Currency Code"
					value={iso_currency_code}
					onChange={(e) => setCurrencyCode(e.target.value)}
				/>
				<label>Merchant Name</label>
				<input
					className="bg-white"
					type="text"
					placeholder="Transaction Merchant Name"
					value={merchant_name}
					onChange={(e) => setMerchantName(e.target.value)}
				/>

				<input
					className="bg-green-600 text-white font-sans text-xl"
					type="submit"
					value="Submit"
				/>
			</form>
		</div>
	);
};
export default AddTransactions;