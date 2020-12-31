
import { Route, Switch } from 'react-router'
import Auth from '../Auth/Auth'
import Header from '../Header/Header'
import './App.scss'

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/auth"> <Auth /> </Route>

				<Route exact path="/">
					<Overview />
				</Route>
			</Switch>
		</>
	);
};

export default App;
