import { Route, Switch, useLocation, useRouteMatch } from "react-router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Auth from "../Auth/Auth";
import Header from "../Header/Header";
import Overview from "../Overview/Overview";
import PageNotFound from "../shared/PageNotFound/PageNotFound";
import Resources from "../Resources/Resources";
import Transactions from "../Transactions/Transactions";
import AddTransactions from "../Transactions/AddTransactions";
import DBTransactions from "../Transactions/DBTransactions";
import Bills from "../Bills/Bills";
import AddBill from "../Bills/AddBill";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import ResetPassword from "../ResetPassword/ResetPassword";
import { selectUserState } from "../../redux/slices/userSlice";
import { getTransactions } from "../../redux/slices/plaidSlice";
import Budget from "../Budget/Budget";
import history from "../../history";
import "./App.scss";

const App = () => {
	const location = useLocation();
	const {
		isLoggedIn,
		user: { api_key },
		status,
	} = useSelector(selectUserState);
	const dispatch = useDispatch();
	const match = useRouteMatch("/reset/:resetPasswordToken");

	useEffect(() => {
		if (isLoggedIn && api_key) {
			dispatch(getTransactions());
		} else if (
			!isLoggedIn &&
			status !== "pending" &&
			location.pathname !== "/forgotpassword" &&
			!match
		) {
			history.push("/auth");
		}
	}, [isLoggedIn, dispatch, location.pathname, match, api_key, status]);

	return (
		<>
			{location.pathname !== "/auth" ? <Header /> : null}
			<Switch>
				<Route exact path="/">
					<Overview />
				</Route>
				<Route path="/auth">
					<Auth />
				</Route>
				<Route path="/transactions">
					<Transactions />
				</Route>
				<Route path="/apptransactions">
					<DBTransactions />
				</Route>
				<Route path="/addtransactions">
					<AddTransactions />
				</Route>
				<Route path="/resources">
					<Resources />
				</Route>
				<Route path="/budget">
					<Budget />
				</Route>
				<Route path="/bills">
					<Bills />
				</Route>
				<Route path="/addbill">
					<AddBill />
				</Route>
				<Route path="/forgotpassword">
					<ForgotPassword />
				</Route>
				<Route path="/reset/:resetPasswordToken">
					<ResetPassword />
				</Route>
				<Route>
					<PageNotFound />
				</Route>
			</Switch>
		</>
	);
};

export default App;
