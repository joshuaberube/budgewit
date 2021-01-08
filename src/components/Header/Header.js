import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/slices/userSlice";

const Header = () => {
	const dispatch = useDispatch()

	const navItemsArr = [
		{to: "/", name: "Transactions"},
		{to: "/goals", name: "Goals"},
		{to: "/bills", name: "Bills"},
		{to: "/budget", name: "Budget"},
		{to: "/resources", name: "Resources"}
	]

	const navItemsMapped = navItemsArr.map(({to, name}, index)=> (
		<NavLink key={`${index}:${name}`} exact to={to} activeClassName="border-b-2 border-green-400 py-19" className="text-gray-600 font-semibold">{name}</NavLink>
	))
	return (
		<header className="h-64 flex flex-row justify-between items-center mx-128">
			<h1 className="text-green-500 text-5xl font-bold">budgewit</h1>
			<nav className="flex flex-row justify-between items-center w-512">
				{navItemsMapped}
				<NavLink to="/auth" className="text-gray-600 font-semibold">
					<button type="button" onClick={() => dispatch(logout())}>
						Logout
					</button>
				</NavLink>
			</nav>
		</header>
	)
}

export default Header