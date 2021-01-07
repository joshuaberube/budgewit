const TransactionRowItem = ({transaction: {amount, category, date, iso_currency_code, merchant_name, pending}}) => {
    const newDate = new Date(date)
    const options = {day: "numeric", year: "numeric", month: "long"}
    const formattedDate = newDate.toLocaleString('en-us', options)

    // console.log(amount.includes("-"))
    const test = Math.sign(amount) === -1
    //hover:rounded-10 hover:shadow-lg hover:z-10 hover:bg-gray-50
    return (
        <li className="flex flex-row justify-between items-center py-8 px-32 mx-8">
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
                <div className={`font-bold text-xl w-128 text-right ${test ? "text-green-500" : ""}`}>
                    ${test ? Math.abs(amount) : amount.toFixed(2)}
                </div>
            </div>
        </li>
    )
}

export default TransactionRowItem