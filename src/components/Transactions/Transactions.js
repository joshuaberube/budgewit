import { useSelector } from "react-redux";
import {useState} from 'react'
import { transactionsFilteredSelector } from "../../redux/slices/plaidSlice";
import AddTransactions from "./AddTransactions/AddTransactions";
import ChangeAccount from "./ChangeAccount/ChangeAccount";
import TransactionRowItem from "./TransactionRowItem";

const Transactions = () => {
  const transactions = useSelector(transactionsFilteredSelector)
  const [isAddTransaction, setIsAddTransaction] = useState(false)

  const transactionsMapped = transactions.map(transaction => (
    <TransactionRowItem
      key={transaction.transaction_id}
      transaction={transaction}
    />
  ))

    return (
        <div className="bg-gray-200">
            <ChangeAccount />
            <div>
                <input
                    type="button"
                    value="Create Transaction"
                    onClick={() => setIsAddTransaction(!isAddTransaction)}
                    className="py-8 px-12 rounded-10 bg-green-400 text-gray-50 cursor-pointer"
                />
                <div className="">
                    {isAddTransaction ? (
                        <AddTransactions setIsAddTransaction={setIsAddTransaction} />
                    ) : null}
                </div>                            
            </div>
            <div className="w-768 bg-gray-300 rounded-10 shadow-3xl mx-auto mb-48">
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
    )
}
                                                 
export default Transactions
