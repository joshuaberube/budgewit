const TransactionRowItem = ({transaction: {amount, category, date, iso_currency_code, merchant_name, pending}}) => {
    const newDate = new Date(date)
    const options = {day: "numeric", year: "numeric", month: "long"}
    const formattedDate = newDate.toLocaleString('en-us', options)

    return (
        <li className="w-768 bg-gray-50 flex flex-row justify-between p-8">
            <div className="flex flex-col">
                <span>{merchant_name}</span>
                <span>{formattedDate}</span>
            </div>
            <div>
                <span>{category[0]}</span>
                {pending ? <span>pending</span> : null}
                <span>${amount.toFixed(2)}</span>
            </div>
        </li>
    )
}

export default TransactionRowItem