const TransactionRowItem = ({transaction: {transaction_id, amount, category, date, iso_currency_code, merchant_name, pending, user_id}, deleteTransaction}) => {
    const newDate = new Date(date)
    const options = {day: "numeric", year: "numeric", month: "long"}
    const formattedDate = newDate.toLocaleString('en-us', options)

    const isNegative = Math.sign(amount) === -1

    return (
        <li className="group flex flex-row justify-between items-center py-8 px-32 mx-8 relative">
            {user_id ? (
                <span 
                    className="flex absolute right-4 top-4 bg-red-400 rounded-50% w-24 h-24 justify-center 
                    items-center text-red-100 opacity-0 group-hover:opacity-100 cursor-pointer"
                    onClick={() => deleteTransaction(transaction_id)}
                >X</span> 
            ) : null}
            <div className="flex flex-col">
                <span className="text-xl">
                    {category[0] === "Transfer" ? "Transfer" 
                    : category[0] === "Payment" ? "Payment" 
                    : merchant_name}
                </span>
                <span className="text-sm text-gray-400">{formattedDate}</span>
            </div>
            <div className="flex flex-row">
                <span className="text-center w-128">{category[0]}</span>
                {pending ? <span>pending</span> : null}
                <div className={`font-bold text-xl w-128 text-right ${isNegative ? "text-green-500" : ""}`}>
                    ${isNegative ? Math.abs(amount) : amount.toFixed(2)}
                </div>
            </div>
        </li>
    )
}

export default TransactionRowItem