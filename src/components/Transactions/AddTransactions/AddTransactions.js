import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import CategoriesDropdown from "../../shared/CategoriesDropdown/CategoriesDropdown"
import { getTransactions } from "../../../redux/slices/plaidSlice"

const AddTransactions = ({setIsAddTransaction}) => {
	const [amount, setAmount] = useState(0)
	const [account_id, setAccountId] = useState("")
	const [category, setCategory] = useState()
	const [date, setDate] = useState("")
	const [merchant_name, setMerchantName] = useState("")
	
	const accounts = useSelector(state => state.plaid.accounts)
	const dispatch = useDispatch()
	const ref = useRef(null)
	
	useEffect(() => {
        const handleClickOutside = e => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsAddTransaction(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref, setIsAddTransaction])

	const onSubmitHandler = e => {
		e.preventDefault()
		const fetchData = async () => {
			try {
				await axios.post("/api/data/transactions", {
					amount,
					account_id,
					category: `{"${category}"}`,
					date,
					iso_currency_code: "USD",
					merchant_name
				})
				dispatch(getTransactions())
				setIsAddTransaction(false)
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


	const inputsArr = [
		{type: "text", placeholder: "Title", setState: setMerchantName},
		{type: "date", placeholder: "Transaction date", setState: setDate},
		{type: "number", placeholder: "Amount", setState: setAmount}
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
                    <h1 className="text-3xl text-gray-600 font-extrabold">Add A Transaction</h1>
                    <input type="reset" value="Cancel" onClick={() => setIsAddTransaction(false)} className="bg-transparent cursor-pointer font-bold text-gray-600" />
                </div>
                <form onSubmit={onSubmitHandler} className="flex flex-row border-t border-gray-400 pt-16 mt-2">
                    <div className="flex flex-col mx-auto">
                        {inputsMapped}
                        <CategoriesDropdown setState={e => setCategory(e.target.value)} />
						<select onChange={e => setAccountId(e.target.value)} className="mb-16 rounded-5 h-40 w-256 pl-12 cursor-pointer text-sm bg-gray-50 font-semibold tracking-wide">
							<option value="" disabled>Select Account</option>
							{accountsMapped}
						</select>
                        <button type="submit" className="bg-green-500 rounded-5 h-40 w-256 text-gray-50">Add Transaction</button>
                    </div>
                </form>
            </div>
        </div>
	)
}
export default AddTransactions;
