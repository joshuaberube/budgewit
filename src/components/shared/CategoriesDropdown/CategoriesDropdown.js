import { useSelector } from 'react-redux'
import { categoriesOptionSelector } from '../../../redux/slices/plaidSlice'

const CategoriesDropdown = ({setState}) => {
    const categories = useSelector(categoriesOptionSelector)

    const categoriesMapped = categories.map(category => (
        <option key={category} value={category}>{category}</option>
    ))

    return (
        <select 
            name="category" 
            required
            defaultValue=""
            onChange={setState}
            className="mb-16 rounded-5 h-40 w-256 pl-12 cursor-pointer text-sm bg-gray-50 font-semibold tracking-wide" 
        >
            <option value="" disabled>Select Category</option>
            {categoriesMapped}
        </select>
    )
}

export default CategoriesDropdown