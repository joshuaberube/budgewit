import { Route, Switch } from "react-router"
import Auth from "../Auth/Auth"
import Overview from '../Overview/Overview'
import "./App.scss"

const App = () => {
	return (
		<div>
			<Switch>
				<Route path="/auth">
					<Auth />
				</Route>
				<Route exact path="/">
					<Overview />
				</Route>
			</Switch>
		</div>
	);
};

export default App;