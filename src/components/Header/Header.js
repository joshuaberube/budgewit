import { Link, NavLink } from "react-router-dom"
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/slices/userSlice"

const Header = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn)

    return (
        <header>
            <nav>
                <NavLink to="/">Overview</NavLink>
                <NavLink to="/transactions">Transactions</NavLink>
                <NavLink to="/goals">Goals</NavLink>
                <NavLink to="/bills">Bills</NavLink>
                <NavLink to="/budgets">Budgets</NavLink>
                <NavLink to="/calculations">Calculations</NavLink>
                <NavLink to="/resources">Resources</NavLink>
            </nav>
            <div>
                {isLoggedIn ? (
                    //Profile
                    <>
                    </>
                ) : (
                    <Link to="/auth">Login/Sign in</Link>
                )}
            </div>
        </header>
    )
}

export default Header