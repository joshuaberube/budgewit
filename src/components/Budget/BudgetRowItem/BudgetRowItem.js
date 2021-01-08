import { useSelector } from 'react-redux'

const BudgetRowItem = ({goal: {budget_id, budget_title, budget_description, budget_category, budget_amount, budget_frequency, budget_current}, deleteBudget}) => {
    const transactions = useSelector(state => state.plaid.transactions)

    const today = new Date()
    const budgetTransactions = transactions.filter(({category, date}) => {
        const transactionDate = new Date(date)
        return category[0] === budget_category && transactionDate.getMonth() === today.getMonth()
    })

    const budgetCurrent = budgetTransactions.reduce((acc, cur) => acc += cur.amount, 0)

    const percentComplete = (budgetCurrent / budget_amount) * 100

    const barColor = percentComplete >= 100 ? "red-400" 
    : percentComplete >= 75 ? "orange-400" 
    : percentComplete >= 50 ? "yellow-400" 
    : "green-400"

    return (
        <div className="group my-32 w-100 mx-auto relative">
            <div className="flex justify-between items-end">
                <span 
                    className="flex absolute right-4 top-4 bg-red-400 rounded-50% w-24 h-24 justify-center 
                    items-center text-red-100 opacity-0 group-hover:opacity-100 cursor-pointer"
                    onClick={() => deleteBudget(budget_id)}
                >X</span> 
                <span className="font-bold text-lg w-192">
                    {budget_title}
                    <p className="font-regular text-sm text-gray-400">{budget_description}</p>
                </span>
                <div className="flex">
                    <span className="font-regular text-md text-gray-400 text-center w-128">
                        {budget_category}
                    </span>
                    <div className="w-128 text-right">
                        <span className={`text-${barColor} font-semibold`}>{`$${budgetCurrent}`} </span>
                        / 
                        <span className="text-xl font-bold"> {`$${budget_amount}`}</span>
                    </div>
                </div>
            </div>
            <div className="relative h-16 rounded-5 overflow-hidden">
                <div className="w-full h-full bg-gray-200 absolute"></div>
                <div className={`h-full absolute relative bg-${barColor}`} style={{width: `${percentComplete}%`}}></div>
            </div>
        </div>
    )
}

export default BudgetRowItem