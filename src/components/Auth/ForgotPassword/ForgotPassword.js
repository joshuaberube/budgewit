import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();
    if (email === "") {
      return alert("The email field must be filled in.");
    } else {
      try {
        const response = await axios.post("/api/user/forgotpassword", {
          email,
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    alert(
      "If a user account with this email exists it will receive an email with instructions."
    );
  };

  return (
    <div className="w-768 bg-gray-300 rounded-10 flex flex-col shadow-2xl font-proxima-nova">
      <div className="mx-80 py-48">
        <div className="flex flex-row justify-between items-baseline">
          <h1 className="text-3xl text-gray-600 font-extrabold">
            Forgot Your Password?
          </h1>
          <Link to="/auth">
            <button className="bg-transparent cursor-pointer font-bold text-gray-600">
              Return to Login
            </button>
          </Link>
        </div>
        <form className="flex flex-col border-t border-gray-400 pt-16 mt-2">
          <input
            className="rounded-5 h-40 w-256 mb-16 p-12 text-sm placeholder-gray-400 text-gray-800 bg-gray-50 font-semibold tracking-wide"
            type="text"
            name="email"
            placeholder="Insert email address."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="py-8 px-12 h-40 w-256 rounded-10 bg-green-400 text-gray-50 cursor-pointer"
            onClick={sendEmail}
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
