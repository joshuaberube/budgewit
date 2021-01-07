import { useSelector } from "react-redux"
import { transactionsFilteredSelector } from "../../redux/slices/plaidSlice"
import ChangeAccount from "./ChangeAccount/ChangeAccount"
import TransactionRowItem from "./TransactionRowItem"

const Transactions = () => {
    const transactions = useSelector(transactionsFilteredSelector)

    const transactionsMapped = transactions.map(transaction => <TransactionRowItem key={transaction.transaction_id} transaction={transaction} />)

    return (
        <div className="bg-gray-50">
            <ChangeAccount />
            <div className="w-768 bg-gray-300 p-12 rounded-10">
                <ul className="bg-gray-50 rounded-10">
                    {transactionsMapped}
                </ul>
            </div>
        </div>
    )
}

export default Transactions