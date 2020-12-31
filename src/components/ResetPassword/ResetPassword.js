import axios from 'axios';
import {useState, useEffect} from 'react';


const ResetPassword = () => {

const [passState, setPassState] = useState({password: null, match: null})
const [passwordsMatch, setPasswordsMatch] = useState(false)


useEffect(() => {
  const {password, match} = passState  

  if(password && match){
      setPasswordsMatch(password === match)
    }
}, [passState])

  return(
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
        {passwordsMatch ? <button>Reset Password</button> : <p>Passwords must match.</p>}
      </form>
    </>
  )
    
}

export default ResetPassword