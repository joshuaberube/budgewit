import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom"
import axios from "axios";

const Auth = (props) => {
  const [toggle, setToggle] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");


  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  const login = async (e) => {
    e.preventDefault();
    try {
        const user = await axios.post('/api/login', { email, password })
        props.loginUser(user.data)
        history.push('/Dashboard')
    }
    catch (err) {
        console.log(err)
    }
};

const register = async (e) => {
    e.preventDefault();
    try {
        const user = await axios.post('/api/register', {email, password})
        props.loginUser(user.data)
        history.push('/Dashboard')
    }
    catch (err) {
        console.log(err)
    }
};

  return (
    <div className="auth-major">
      <div className="auth-box">
        <img src="logo.png" alt ='' />
        <h1>{toggle ? "Login " : "Register"}</h1>
        <input
          name="email"
          placeholder="email"
          type="email"
          value={emailInput}
          onChange={handleEmailInput}
        />
        <input
          name="password"
          placeholder="password"
          type="password"
          value={passwordInput}
          onChange={handlePasswordInput}
        />
        {toggle ? (
          <div className="login-button">
            <button onClick={login}>Login</button>
            <button
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Register
            </button>
          </div>
        ) : (
          <div className="login-button">
            <button onClick={register}>Register</button>
            <button
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { loginUser })(Auth)