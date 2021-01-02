import axios from 'axios';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';




const ResetPassword = () => {

const [passState, setPassState] = useState({password: null, match: null})
const [passwordsMatch, setPasswordsMatch] = useState(false) //if true reset password button will render
const [resetState, setResetState] = useState(false)
const resetPasswordToken = (window.location.href.split('/')).pop()  // grab token from url.


const handleButton = async () => {
    e.preventDefault();
   const {password} = passState 
   try {
    const response = await axios.put("/api/user/reset/:resetPasswordToken", { password: password, resetPasswordToken: resetPasswordToken });
    response.data.success ? setResetState(true) : null
  } catch (error) {
    console.log(error);
  }
  
}

useEffect(() => {
  const {password, match} = passState  

  if(password && match){
      setPasswordsMatch(password === match)
    }
}, [passState])

  return(
    <>
    {!resetState ? (
      <>
      <h1>Password Reset Form</h1>
      <form className="">
        <input
          type="password"
          name="password"
          placeholder="Insert your new password"
          value={passState.password}
          onChange={(e) => setPassState({...passState, password: e.target.value})}
        ></input>
         <input 
          type="password"
          name="passwordmatch"
          placeholder="Type in your password again"
          value={passState.match}
          onChange={(e) => setPassState({...passState, match: e.target.value})}
        ></input>
        {passwordsMatch ? <button type="submit" onClick = {handleButton} >Reset Password</button> : <p>Passwords must match.</p>}
      </form>
      </>
    ) : (
      <>
      <h1>Your password has been reset!</h1>

      <Link to="/auth">Return to Login</Link>
      </>
    )
    }
    </>
  )
    
}

export default ResetPassword