import { Route, Switch, useLocation } from 'react-router'
import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from 'react-router'
import Auth from '../Auth/Auth'
import Header from '../Header/Header'
import Overview from '../Overview/Overview'
import PageNotFound from '../shared/PageNotFound/PageNotFound'
import Transactions from '../Transactions/Transactions'
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import ResetPassword from "../ResetPassword/ResetPassword";
import { selectIsLoggedIn } from '../../redux/slices/userSlice'
import { getTransactions } from '../../redux/slices/plaidSlice'
import './App.scss'

const App = () => {
	const location = useLocation()
	const isLoggedIn = useSelector(selectIsLoggedIn)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!isLoggedIn) {
			<Redirect to="/auth" />
		} else {
			dispatch(getTransactions())
		}
	}, [isLoggedIn, dispatch])

  	return (
		<>
			{location.pathname !== "/auth" ? <Header /> : null}
			<Switch>
				<Route exact path="/"> <Overview /> </Route>
				<Route path="/auth"> <Auth /> </Route>
				<Route path="/transactions"> <Transactions /> </Route>
				<Route path="/forgotpassword"><ForgotPassword /></Route>
				<Route path="/reset/:resetPasswordToken"><ResetPassword /></Route>
				<Route path="*"> <PageNotFound /> </Route>
			</Switch>
		</>
	)
}


export default App