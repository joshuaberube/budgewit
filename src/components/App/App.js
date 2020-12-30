import { Route, Switch } from 'react-router'
import Auth from '../Auth/Auth'
import './App.scss'

const App = () => {
  return (
    <div>
      <Switch>
      <Route Exact path = '/'> <Overview/> </Route>
      <Route path="/auth"> <Auth /> </Route>
    

      </Switch>
    </div>
  )
}

export default App