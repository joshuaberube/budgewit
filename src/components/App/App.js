import { Route, Switch, useLocation, useRouteMatch } from "react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Auth from "../Auth/Auth";
import Header from "../Header/Header";
import PageNotFound from "../shared/PageNotFound/PageNotFound";
import Resources from "../Resources/Resources";
import Transactions from "../Transactions/Transactions";
import Bills from "../Bills/Bills";
import AddBill from "../Bills/AddBill";
import ForgotPassword from "../Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../Auth/ResetPassword/ResetPassword";
import { selectUserState } from '../../redux/slices/userSlice'
import Calculator from "../../components/Calculators/Mortgage_Calculator"
import Budget from '../Budget/Budget'
import history from "../../history"
import './App.scss'


const App = () => {
	const location = useLocation();
	const { isLoggedIn, status} = useSelector(selectUserState);
	const match = useRouteMatch("/reset/:resetPasswordToken");

	useEffect(() => {
		if (!isLoggedIn && status !== "pending" && location.pathname !== "/forgotpassword" && !match) {
			history.push("/auth");
		}
	}, [isLoggedIn, location.pathname, match, status])

	return (
		<main className="font-proxima-nova">
			{isLoggedIn && <Header/> }
			<Switch>
				<Route exact path="/"><Transactions /></Route>
				<Route path="/auth"><Auth /></Route>
				<Route path="/goals"><Calculator /></Route>
				<Route path="/resources"><Resources /></Route>
				<Route path="/budget"><Budget /></Route>
				<Route path="/bills"><Bills /></Route>
				<Route path="/addbill"><AddBill /></Route>
				<Route path='/calculator'><Calculator/></Route>
				<Route path="/forgotpassword"><ForgotPassword /></Route>
				<Route path="/reset/:resetPasswordToken"><ResetPassword /></Route>
				<Route><PageNotFound /></Route>
			</Switch>
		</main>
	)
}

export default App