import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/App'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { getUserSession } from './redux/slices/userSlice'
import store from './redux/store'
import history from "./history"
import "./index.css"

store.dispatch(getUserSession())

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router history={history}>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById("app")
)