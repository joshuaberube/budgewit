import { useSelector } from 'react-redux'
import { categoriesFilteredSelector } from '../../redux/slices/plaidSlice'
import AddBudget from './AddBudget'

const Budget = () => {
    const categories = useSelector(categoriesFilteredSelector)

    return (
        <div>Budget
            <AddBudget />
        </div>

    )
}

export default Budget