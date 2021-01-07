import { useSelector } from "react-redux"
import { transactionsFilteredSelector } from "../../redux/slices/plaidSlice"
import ChangeAccount from "./ChangeAccount/ChangeAccount"
import TransactionRowItem from "./TransactionRowItem"

const Transactions = () => {
    const transactions = useSelector(transactionsFilteredSelector)

    const transactionsMapped = transactions.map(transaction => <TransactionRowItem key={transaction.transaction_id} transaction={transaction} />)

    return (
        <div className="bg-gray-200">
            <ChangeAccount />
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