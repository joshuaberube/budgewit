import { useDispatch, useSelector } from "react-redux"
import { changeSelectedAccount } from "../../../redux/slices/plaidSlice"
const ChangeAccount = () => {
    const accounts = useSelector(state => state.plaid.accounts)
    const dispatch = useDispatch()

    const accountsMapped = accounts.map(({account_id, balances, name, subtype}, index) => (
        <label key={account_id}>
            <div>
                {name}
            </div>
            <input 
                type="radio" 
                name="account" 
                value={account_id} 
                onChange={e => dispatch(changeSelectedAccount(e.target.value))}
            />
        </label>
    ))
    return (
        <div>
            <label>
                All Accounts
                <input 
                    type="radio" 
                    name="account" 
                    value="all" 
                    onChange={e => dispatch(changeSelectedAccount(e.target.value))}/>
            </label>
            {accountsMapped}
        </div>
    )
}

export default ChangeAccount