import { useSelector } from 'react-redux'
import { useState } from "react"
import { categoriesFilteredSelector } from '../../redux/slices/plaidSlice'
import AddBudget from './AddBudget'

const Budget = () => {
    const categories = useSelector(categoriesFilteredSelector)
    const [isAddBudget, setIsAddBudget] = useState(false)

    return (
        <div>
            <input 
                type="button" 
                value="Create Budget" 
                onClick={() => setIsAddBudget(!isAddBudget)} 
                className="py-8 px-12 rounded-10px bg-green-400 text-gray-50 cursor-pointer"
            />
            <div className="">
                {isAddBudget ? <AddBudget setIsAddBudget={setIsAddBudget} /> : null}

            </div>
        </div>

    )
}

export default Budget