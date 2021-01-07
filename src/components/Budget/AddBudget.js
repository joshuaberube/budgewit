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

    // console.log(categories)

    const inputsMapped = inputsArr.map(({type, placeholder, name}) => (
        <input 
            type={type} 
            name={name}
            placeholder={placeholder} 
            onChange={e => setBudget({...budget, [e.target.name]: e.target.value})}
        />
    ))

    const parentCategories = categories.reduce((acc, {hierarchy}) => {
        return hierarchy.length === 1 ? [...acc, hierarchy[0]]
        // // : hierarchy.includes(acc[0]?.parentCategory) && hierarchy.length > 1 ? acc[0]?.subCategory.push(hierarchy[1])
        : acc
    }, [])

    const categoriesMapped = parentCategories.map((category, index) => <option key={`${index}:${category}`} value={category}>{category}</option>)

    const onSumbitHandler = e => {
        e.preventDefault()
        console.log(e)
    }

    return (
        <div className="w-768px bg-gray-400">
            <form onSubmit={onSumbitHandler} className="flex flex-row">
                <div className="flex flex-col">
                    {inputsMapped}
                    <select>
                        {categoriesMapped}
                    </select>
                    <button type="submit" className="bg-green-500">Create Budget</button>

                </div>
                <div>

                </div>
            </form>
        </div>
    )
}

export default AddBudget


//# An array of objects. Each object has the hierarchy, the [0] represents the parent category whereas [1], etc. represent sub categories.

//# But what if the data was structured like this: [{parentCategory: "Bank Fees", subCategories: ["Overdraft", "ATM", "Late Payment"]}]