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
    <label key={input.name}>
      {/* {input.label} */}
      <input
      className="rounded-5 mb-16 bg-grey-100 h-40 w-256 p-12 text-sm placeholder-gray-400 text-gray-800 bg-gray-50 font-semibold tracking-wide"
        type={input.type}
        name={input.name}
        placeholder={input.label}
        onChange={(e) =>
          setAuthState({ ...authState, [e.target.name]: e.target.value })
        }
        pattern={input.type === "tel" ? input.pattern : null}
      />
    </label>
  ));

  return (
    <div className="bg-gray-200 h-screen w-screen">
      <div className="h-512 w-768 bg-gray-300  rounded-10 flex flex-col justify-between mx-auto shadow-2xl">
      <Link className ='p-4 ' to="/forgotpassword">
            <button className="bg-transparent cursor-pointer font-bold text-gray-600 hover:underline">
              forgot password?
            </button>
          </Link>
        <form
          className="flex flex-col  border-gray-400 pt-16 mt-2 mx-auto"
          onSubmit={(e) => {
            dispatch(login(authState));
            e.preventDefault();
          }}
        > <div className="flex flex-row">
          <div className="flex flex-col border-gray-400 pt-16 mt-2">
          {inputsMapped}
          </div>
          <h1 className="text-3xl text-gray-600 font-extrabold mx-auto my-8">budgewit</h1>
          </div>
          <div className = 'flex flex-row w-648 my-4'> 
            <input
              type="button"
              className=" bg-transparent cursor-pointer font-bold text-gray-600 mx-auto hover:underline"
              onClick={() => dispatch(changeIsLoggingIn())}
              value={
                isLoggingIn ? "Create An Account?" : "Already Have an Account?"
              }
            />
            <button className="py-8 px-12 h-48 w-256 rounded-10 bg-green-400 text-gray-50 cursor-pointer mx-auto" type="submit">
              {isLoggingIn ? "Login" : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
