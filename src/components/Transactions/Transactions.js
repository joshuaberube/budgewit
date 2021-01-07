import { useSelector } from "react-redux"
import { transactionsFilteredSelector } from "../../redux/slices/plaidSlice"
import ChangeAccount from "./ChangeAccount/ChangeAccount"
import TransactionRowItem from "./TransactionRowItem"

const Transactions = () => {
    const transactions = useSelector(transactionsFilteredSelector)

    const transactionsMapped = transactions.map(transaction => <TransactionRowItem key={transaction.transaction_id} transaction={transaction} />)
    // const test = transactions.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
    // console.log(test)
    // console.log(transactions)
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