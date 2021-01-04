import { Route, Switch } from "react-router";
import Auth from "../Auth/Auth";
import Overview from "../Overview/Overview";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import ResetPassword from "../ResetPassword/ResetPassword";
// import Transactions from '../Transaction/Transaction'
// import Calculators from '../Calculators/Calculators'
import Header from "../Header/Header";
import "./App.scss";

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/auth">{" "}<Auth />{" "}</Route>
        <Route path="/forgotpassword"><ForgotPassword /></Route>
        <Route path="/reset/:resetPasswordToken"><ResetPassword /></Route>
        <Route exact path="/"><Overview /></Route>
      </Switch>
    </>
  );
};

export default App;
