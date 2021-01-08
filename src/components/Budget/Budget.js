import { useSelector } from 'react-redux'
import { useState, useEffect, useCallback } from "react"
import { categoriesFilteredSelector } from '../../redux/slices/plaidSlice'
import AddBudget from './AddBudget'
import axios from "axios"

const Budget = () => {
    const categories = useSelector(categoriesFilteredSelector)
    const [isAddBudget, setIsAddBudget] = useState(false)
    const [goals, setGoals] = useState([])

    const onSubmitHandler = useCallback(async (e, data) => {
        e.preventDefault()
        await axios.post("/api/data/budgets", data)
        .catch(err => console.log(err))

        setIsAddBudget(false)
    }, [])

    useEffect(() => {
        const budget = async () => {
            const goals = await axios.get("/api/data/budgets")
            setGoals(goals.data)
        }
        budget()
    }, [onSubmitHandler])

    const createBudgetButton = () => (
        <div>
            <input 
                type="button" 
                value="Create Budget" 
                onClick={() => setIsAddBudget(!isAddBudget)} 
                className="py-8 px-12 rounded-10 bg-green-400 text-gray-50 cursor-pointer"
            />
            <div className="">
                {isAddBudget ? (
                    <>
                        <AddBudget onSubmitHandler={onSubmitHandler} setIsAddBudget={setIsAddBudget} />
                        <div className="absolute w-full h-full top-0 left-0 bg-gray-800 opacity-50"></div>
                    </>
                ) : null}
            </div>

        </div>
    )

    const goalsMapped = goals.map(({budget_id, budget_title, budget_description, budget_category, budget_amount, budget_frequency, budget_current}) => {
        const percentComplete = `${(budget_current / budget_amount) * 100}%`
        return (
            <div key={`${budget_id}:${budget_title}`}>
                {budget_title}
                <div className="relative w-512 h-16 rounded-5 overflow-hidden">
                    <div className="w-full h-full bg-gray-200 absolute"></div>
                    <div className="h-full bg-green-400 absolute relative" style={{width: percentComplete}}></div>
                </div>
            </div>
        )
    })

    return (
        <div>
            {goalsMapped}
        </div>
    )
}

export default Budget