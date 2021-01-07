import { useSelector } from "react-redux";
import {useState} from 'react'
import { transactionsFilteredSelector } from "../../redux/slices/plaidSlice";
import AddTransactions from "./AddTransactions";
import ChangeAccount from "./ChangeAccount/ChangeAccount";
import TransactionRowItem from "./TransactionRowItem";

const Transactions = () => {
  const transactions = useSelector(transactionsFilteredSelector);
  const [isAddTransaction, setIsAddTransaction] = useState(false);
  const transactionsMapped = transactions.map((transaction) => (
    <TransactionRowItem
      key={transaction.transaction_id}
      transaction={transaction}
    />
  ));

  return (
    <>
      <div className="bg-gray-50">
        <ChangeAccount />
        <div className="w-768 bg-gray-300 p-12 rounded-10">
          <ul className="bg-gray-50 rounded-10">{transactionsMapped}</ul>
        </div>
      </div>
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
    </>
  );
};

export default Transactions;
