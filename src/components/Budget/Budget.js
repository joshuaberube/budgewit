import { useState, useEffect, useCallback } from "react"
import AddBudget from './AddBudget/AddBudget'
import axios from "axios"
import BudgetRowItem from './BudgetRowItem/BudgetRowItem'

const Budget = () => {
    const [isAddBudget, setIsAddBudget] = useState(false)
    const [goals, setGoals] = useState([])

    const onSubmitHandler = async (e, data) => {
        e.preventDefault()
        await axios.post("/api/data/budgets", data)
        .catch(err => console.log(err))

        setIsAddBudget(false)
    }

    const deleteBudget = async id => {
        await axios.delete(`/api/data/budgets/${id}`)
        .catch(err => console.log(err))
    }

    useEffect(() => {
        const budget = async () => {
            const goals = await axios.get("/api/data/budgets")
            setGoals(goals.data)
        }
        budget()
    }, [onSubmitHandler, deleteBudget])


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

    const goalsMapped = goals.map(goal => <BudgetRowItem key={goal.budget_id} goal={goal} deleteBudget={deleteBudget} />)

    return (
        <div className="mx-auto mt-64 w-768">
            <div className="mb-16">
                {createBudgetButton()}
            </div>
            <div className="bg-gray-50 rounded-10 p-16">
                {goalsMapped}
            </div>
        </div>
    )
}

export default Budget