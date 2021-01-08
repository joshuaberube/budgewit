import { useSelector } from "react-redux"
import { selectAccounts } from "../../../redux/slices/plaidSlice"
import Account from "./Account/Account"

const ChangeAccount = () => {
    const accounts = useSelector(selectAccounts)

    const accountsMapped = accounts.map((account, index) => (
        <Account key={index} account={account} />
    ))

    return (
        <div>
            {accountsMapped}
        </div>
    )
}

export default ChangeAccount