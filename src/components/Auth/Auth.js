import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Auth = (props) => {
  const [toggle, setToggle] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post("/api/login", { email, password });
      props.loginUser(user.data);
      history.push("/Dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post("/api/register", { email, password, firstName, lastName, phoneNumber });
      props.loginUser(user.data);
      history.push("/Dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="">
        <img src="" alt="" />
        <h1>{toggle ? "Login " : "Register"}</h1>
        <input
          name="login"
          placeholder="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="password"
          placeholder="password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {toggle ? ( null ) : (
          <>
            <input
              name="firstName"
              placeholder="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              name="lastName"
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              name="phoneNumber"
              placeholder="Phone Number"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </>
        )}

        {toggle ? (
          <div className="">
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
          <div className="">
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
    </>
  );
};

export default Auth;
