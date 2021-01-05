
import { NavLink } from "react-router-dom"


const Header = () => {
    return (
        <header>
            <nav>
                <NavLink to="/">Overview</NavLink>
                <NavLink to="/transactions">Transactions</NavLink>
                <NavLink to="/goals">Goals</NavLink>  //*this piece is combined with the Calculations piece*//
                <NavLink to="/bills">Bills</NavLink>
                <NavLink to="/budget">Budget</NavLink>
                <NavLink to="/resources">Resources</NavLink>
            </nav>
        </header>
    )
}

export default Header