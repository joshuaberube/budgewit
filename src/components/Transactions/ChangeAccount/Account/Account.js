import { useDispatch, useSelector } from "react-redux"
import { changeSelectedAccount } from "../../../../redux/slices/plaidSlice"

const Account = ({account: {account_id, balances: {current}, name, subtype}}) => {
    const dispatch = useDispatch()
    const selectedAccount = useSelector(state => state.plaid.selectedAccount)

    return (
        <button type="button" onClick={() => dispatch(changeSelectedAccount(account_id))} className="bg-gray-50 flex flex-col rounded-10 h-92 mb-16 focus:outline-none">
            <div className={`flex flex-col m-8 w-full h-full justify-between ${selectedAccount === account_id ? "border-l-2 border-green-500 ml-8" : "ml-10"}`}>
                <div className="flex flex-col justify-start text-left w-192 pl-8">
                    <h3 className="font-extrabold text-gray-600">{name}</h3>
                    <h5 className="text-sm font-medium text-gray-400">{subtype}</h5>
                </div>
                <div className="flex justify-end font-extrabold text-xl text-gray-700 w-192">
                    ${current.toFixed(2)}
                </div>
            </div>
        </button>
    )
}

export default Account