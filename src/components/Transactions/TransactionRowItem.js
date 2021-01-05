const TransactionRowItem = ({transaction: {amount, category, date, iso_currency_code, merchant_name, pending}}) => {
    const newDate = new Date(date)
    const options = {day: "numeric", year: "numeric", month: "long"}
    const formattedDate = newDate.toLocaleString('en-us', options)

    return (
        <li>
            <span>{merchant_name}</span>
            <span>{formattedDate}</span>
            <span>{category[0]}</span>
            {pending ? <span>pending</span> : null}
            <span>${amount}</span>
        </li>
    )
}

export default TransactionRowItem