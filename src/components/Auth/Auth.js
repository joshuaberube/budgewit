import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeIsLoggingIn,
  login,
  selectIsLoggingIn,
} from "../../redux/slices/userSlice";
import { Link } from "react-router-dom";

const inputsArr = [
  // login inputs
  { label: "Email", type: "text", name: "email" },
  { label: "Password", type: "password", name: "password" },

  // register inputs
  { label: "First Name", type: "text", name: "firstName" },
  { label: "Last Name", type: "text", name: "lastName" },
  {
    label: "Phone Number",
    type: "tel",
    name: "phoneNum",
    pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
  },
];

const Auth = () => {
  const [authState, setAuthState] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNum: "",
  });
  const isLoggingIn = useSelector(selectIsLoggingIn);
  const dispatch = useDispatch();

  //checks whether the state is logging in, and if it is, it takes only the email and password components
  const inputsCheck = isLoggingIn ? inputsArr.slice(0, 2) : inputsArr;

  //maps over inputsArr to provide a label and an input
  const inputsMapped = inputsCheck.map((input) => (
      <input
        key={input.name}
        className="rounded-5 mb-16 bg-grey-100 h-40 w-256 p-12 text-sm placeholder-gray-400 text-gray-800 bg-gray-50 font-semibold tracking-wide mx-auto"
        type={input.type}
        name={input.name}
        placeholder={input.label}
        onChange={(e) =>
          setAuthState({ ...authState, [e.target.name]: e.target.value })
        }
        pattern={input.type === "tel" ? input.pattern : null}
      />
  ))

  return (
    <div className="bg-gray-200 h-screen w-screen pt-64">
      <div className="w-512 bg-gray-300 rounded-10 flex flex-col justify-between mx-auto shadow-2xl p-8">
        <h1 className="text-5xl text-gray-600 font-extrabold ml-16 my-8">budgewit</h1>
        <form
          className="flex flex-col  border-gray-400 pt-16 mt-2 mx-auto"
          onSubmit={(e) => {
            dispatch(login(authState));
            e.preventDefault();
          }}
        > 
          <div className="flex flex-row">
            <div className="flex flex-col border-gray-400 pt-16 mt-2 mx-auto">
              {inputsMapped}
            </div>
          </div>
          <div className = 'flex flex-col w-648 my-4'>
            <button className="py-8 px-12 h-40 w-256 rounded-10 bg-green-400 font-bold text-gray-50 cursor-pointer mx-auto mb-12" type="submit">
              {isLoggingIn ? "Login" : "Create Account"}
            </button>
            <div className="flex flex-row items-center justify-between">
              <input
                type="button"
                className=" bg-transparent cursor-pointer font-semibold text-gray-600 mx-auto hover:underline text-sm leading-none mr-8"
                onClick={() => dispatch(changeIsLoggingIn())}
                value={isLoggingIn ? "Create An Account?" : "Already Have an Account?"}
              />
              <span>|</span>
              <Link className='leading-none ml-8' to="/forgotpassword">
                <button type="button" className="bg-transparent cursor-pointer font-semibold text-gray-600 text-sm hover:underline ">
                  Forgot Password?
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
