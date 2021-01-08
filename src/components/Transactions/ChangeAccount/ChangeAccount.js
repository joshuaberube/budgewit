import { useSelector } from "react-redux"
import Account from "./Account/Account"

const ChangeAccount = () => {
    const accounts = useSelector(state => state.plaid.accounts)
    const firstTwoAccounts = accounts.slice(0, 2)
    const creditCardAcc = accounts[3]
    const allAccounts = {account_id: "all", balances: {current: 0}, name: "All Accounts", subtype: "combined"}

    const hackyFix = [allAccounts, ...firstTwoAccounts, creditCardAcc]

    const accountsMapped = hackyFix.map((account, index) => (
        <Account key={index} account={account} />
    ))

    return (
        <div>
            {accountsMapped}
        </div>
    )
}

export default ChangeAccount