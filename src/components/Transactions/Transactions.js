import { useSelector } from "react-redux"
import { transactionsFilteredSelector } from "../../redux/slices/plaidSlice"
import ChangeAccount from "./ChangeAccount/ChangeAccount"
import TransactionRowItem from "./TransactionRowItem"

const Transactions = () => {
    const transactions = useSelector(transactionsFilteredSelector)

    const transactionsMapped = transactions.map(transaction => <TransactionRowItem key={transaction.transaction_id} transaction={transaction} />)

    return (
        <div>
            <ChangeAccount />
            <ul>
                {transactionsMapped}
            </ul>
        </div>
    )
}

export default Transactions