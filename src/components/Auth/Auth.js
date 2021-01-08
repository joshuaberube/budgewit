import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeIsLoggingIn, login, selectIsLoggingIn } from "../../redux/slices/userSlice";
import { Link } from 'react-router-dom';

const inputsArr = [
  // login inputs
  {label: "Email", type: "text", name: "email"},
  {label: "Password", type: "password", name: "password"},

  // register inputs
  {label: "First Name", type: "text", name: "firstName"},
  {label: "Last Name", type: "text", name: "lastName"},
  {label: "Phone Number", type: "tel", name: "phoneNum", pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}"} 
]

const Auth = () => {
    const [authState, setAuthState] = useState({email: "", password: "", firstName: "", lastName: "", phoneNum: ""})
    const isLoggingIn = useSelector(selectIsLoggingIn)
    const dispatch = useDispatch()

    //checks whether the state is logging in, and if it is, it takes only the email and password components
    const inputsCheck = isLoggingIn ? inputsArr.slice(0, 2) : inputsArr

    //maps over inputsArr to provide a label and an input
    const inputsMapped = inputsCheck.map(input => (
      <label key={input.name}>
        {input.label}
        <input 
          type={input.type} 
          name={input.name} 
          onChange={e => setAuthState({...authState, [e.target.name]: e.target.value})}
          pattern={input.type === "tel" ? input.pattern : null}
        />
      </label>
    ))

    return (
      <div className="bg-gray-200 h-screen w-screen">
        <form onSubmit={e => { dispatch(login(authState)); e.preventDefault() }}>
          {inputsMapped}
          <div>
            <input 
              type="button" 
              onClick={() => dispatch(changeIsLoggingIn())} 
              value={isLoggingIn ? "Create An Account?" : "Already Have an Account?"}
            />
            <button type="submit">{isLoggingIn ? "Login" : "Create Account"}</button>
          </div>
        </form>
        <Link to="/forgotpassword">Forgot your password?</Link>  
      </div>
    )
}

export default Auth