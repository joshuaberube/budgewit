import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [passState, setPassState] = useState({ password: null, match: null });
  const [passwordsMatch, setPasswordsMatch] = useState(false); //if true reset password button will render
  const [resetState, setResetState] = useState(false);
  const resetPasswordToken = useParams();

  const handleButton = async (e) => {
    e.preventDefault();

    const { password } = passState;
    try {
      const response = await axios.put("/api/user/reset/:resetPasswordToken", {
        password: password,
        resetPasswordToken: resetPasswordToken,
      });
      if (response.data.success) {
        setResetState(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const { password, match } = passState;

    if (password && match) {
      setPasswordsMatch(password === match);
    }
  }, [passState]);

  return (
    <>
      {!resetState ? (
        <div className="w-768 bg-gray-300 rounded-10 flex flex-col shadow-2xl font-proxima-nova">
          <div className="mx-80 py-48">
            <div className="flex flex-row justify-between items-baseline">
              <h1 className="text-3xl text-gray-600 font-extrabold">
                Reset Your Password
              </h1>
              <Link to="/auth">
                <button className="bg-transparent cursor-pointer font-bold text-gray-600">
                  Return to Login
                </button>
              </Link>
            </div>

            <form className="flex flex-col  border-t border-gray-400 pt-16 mt-2">
              <input
                className="rounded-5  h-40 w-256 mb-16 p-12 text-sm placeholder-gray-400 text-gray-800 bg-gray-50 font-semibold tracking-wide mx-auto"
                type="password"
                name="password"
                placeholder="Insert your new password"
                onChange={(e) =>
                  setPassState({ ...passState, password: e.target.value })
                }
              />
              <input
                className="rounded-5 h-40 w-256 mb-16 p-12 text-sm placeholder-gray-400 text-gray-800 bg-gray-50 font-semibold tracking-wide mx-auto"
                type="password"
                name="passwordmatch"
                placeholder="Type in your password again"
                onChange={(e) =>
                  setPassState({ ...passState, match: e.target.value })
                }
              />
              {passwordsMatch ? (
                <button
                  className="py-8 px-12 h-40 w-256 rounded-10 bg-green-400 text-gray-50 cursor-pointer text-center mx-auto"
                  type="submit"
                  onClick={handleButton}
                >
                  Reset Password
                </button>
              ) : (
                <p  >
                  Passwords must match.
                </p>
              )}
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-between items-baseline">
              <h1 className="text-3xl text-gray-600 font-extrabold">
                Your Password Has Been Reset!
              </h1>
              <Link to="/auth">
                <button className="bg-transparent cursor-pointer font-bold text-gray-600">
                  Return to Login
                </button>
              </Link>
            </div>
      )}
    </>
  );
};

export default ResetPassword;
