import { useDispatch, useSelector } from "react-redux";
import {useState} from 'react'
import { getTransactions, transactionsFilteredSelector } from "../../redux/slices/plaidSlice";
import AddTransactions from "./AddTransactions/AddTransactions";
// import PlaidBankLink from '../PlaidBankLink/PlaidBankLink';
import ChangeAccount from "./ChangeAccount/ChangeAccount";
import TransactionRowItem from "./TransactionRowItem";
import axios from "axios";

const Transactions = () => {
    const transactions = useSelector(transactionsFilteredSelector)
    const [isAddTransaction, setIsAddTransaction] = useState(false)
    const dispatch = useDispatch()

    const deleteTransaction = async id => {
        await axios.delete(`/api/data/transactions/${id}`)
        .catch(err => console.log(err))

        dispatch(getTransactions())
    }

    const transactionsMapped = transactions.map(transaction => (
        <TransactionRowItem
            key={transaction.transaction_id}
            transaction={transaction}
            deleteTransaction={deleteTransaction}
        />
    ))

    

    return (
        <div className="bg-gray-200 p-64">
            <div className="flex flex-row">
                <ChangeAccount/>
                <div className="mx-auto pr-210">
                    <div className="mb-12">
                        <input
                            type="button"
                            value="Create Transaction"
                            onClick={() => setIsAddTransaction(!isAddTransaction)}
                            className="py-8 px-12 rounded-10 bg-green-500 text-gray-50 cursor-pointer"
                        />
                        <div className="">
                            {isAddTransaction ? (
                                <>
                                    <AddTransactions setIsAddTransaction={setIsAddTransaction} />
                                    <div className="absolute w-full h-full top-0 left-0 bg-gray-800 opacity-50"></div>
                                </>
                            ) : null}
                        </div>                            
                    </div>
                    <div className="w-768 bg-gray-300 rounded-10 shadow-2xl">
                        <div className="mx-8 px-32 py-8 flex justify-between font-bold text-gray-500">
                            <span>Name</span>
                            <div className="flex flex-row">
                                <div className="w-128 text-center">Type</div>
                                <div className="w-128 text-right">Amount</div>
                            </div>
                        </div>
                        <ul className="bg-gray-50 rounded-b-10">
                            {transactionsMapped}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
                                                 
export default Transactions
