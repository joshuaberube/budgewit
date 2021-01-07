import { useSelector } from 'react-redux'
import { useState } from "react"

const AddBudget = () => {
    const [budget, setBudget] = useState({name: "", description: "", category: "", amount: 0})
    const categories = useSelector(state => state.plaid.categories)

    const inputsArr = [
        {type: "text", placeholder: "Name", name: "name"},
        {type: "text", placeholder: "Description", name: "description"},
        {type: "number", placeholder: "Amount", name: "amount"}
    ]

    const radioArr = [
        {title: "MONTHLY", desc: "Starts the first day of the month", value: "monthly", checked: "checked"},
        {title: "QUARTERLY", desc: "Follows the US Quarters", value: "quarterly"},
        {title: "YEARLY", desc: "Starts the first day of the year", value: "yearly"},
        {title: "ONCE", desc: "Starts the first day of the next month", value: "once"}
    ]

    const inputsMapped = inputsArr.map(({type, placeholder, name}) => (
        <input 
            type={type} 
            name={name}
            placeholder={placeholder} 
            onChange={e => setBudget({...budget, [e.target.name]: e.target.value})}
            className="rounded-5px mb-16px h-40px w-256 p-12 text-sm text-gray-400 bg-gray-50"
        />
    ))

    const radioMapped = radioArr.map(({title, desc, value, checked}) => (
        <label>
            {title}
            <input 
                type="radio"
                value={value}
                name="budget"
                checked={checked}
            />
        </label>
    ))

    const parentCategories = categories.reduce((acc, {hierarchy}) => (
        hierarchy.length === 1 ? [...acc, hierarchy[0]]
        : acc
    ), [])

    const categoriesMapped = parentCategories.map((category, index) => (
        <option key={`${index}:${category}`} value={category}>
            {category}
        </option>
    ))

    const onSumbitHandler = e => {
        e.preventDefault()
        console.log(e)
    }

    return (
        <div className="w-screen h-screen absolute top-0 left-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div className="w-768px bg-gray-300 rounded-10px flex flex-col shadow-2xl">
                <div className="mx-64px py-48px">
                    <div className="flex flex-row justify-between items-baseline">
                        <h1 className="text-4xl text-gray-800">Create A Budget</h1>
                        <input type="reset" value="Cancel" className="bg-transparent cursor-pointer" />
                    </div>
                    <form onSubmit={onSumbitHandler} className="flex flex-row border-t-2 border-gray-400 pt-16px mt-2">
                        <div className="flex flex-col">
                            {inputsMapped}
                            <select className="mb-16px rounded-5px h-40px w-256 pl-12 cursor-pointer text-sm bg-gray-50">
                                <option value="" disabled selected>Select Category</option>
                                {categoriesMapped}
                            </select>
                            <button type="submit" className="bg-green-500 rounded-5px h-40px w-256 text-gray-50">Create Budget</button>
                        </div>
                        <div className="pl-32px">
                            {radioMapped}
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default AddBudget


//# An array of objects. Each object has the hierarchy, the [0] represents the parent category whereas [1], etc. represent sub categories.

//# But what if the data was structured like this: [{parentCategory: "Bank Fees", subCategories: ["Overdraft", "ATM", "Late Payment"]}]