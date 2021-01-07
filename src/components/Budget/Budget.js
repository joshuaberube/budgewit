import { useSelector } from 'react-redux'
import { useState, useEffect } from "react"
import { categoriesFilteredSelector } from '../../redux/slices/plaidSlice'
import AddBudget from './AddBudget'
import axios from "axios"

const Budget = () => {
    const categories = useSelector(categoriesFilteredSelector)
    const [isAddBudget, setIsAddBudget] = useState(false)
    const [goals, setGoals] = useState([])

    useEffect(() => {
        const budget = async () => {
            const goals = await axios.get("/api/data/budgets")
            setGoals(goals.data)
        }
        budget()
    }, [])

    return (
        <div>
            <input 
                type="button" 
                value="Create Budget" 
                onClick={() => setIsAddBudget(!isAddBudget)} 
                className="py-8 px-12 rounded-10 bg-green-400 text-gray-50 cursor-pointer"
            />
            <div className="">
                {isAddBudget ? <AddBudget setIsAddBudget={setIsAddBudget} /> : null}

            </div>
        </div>

    )
}

export default Budget