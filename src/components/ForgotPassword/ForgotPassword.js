import axios from 'axios';
import { useState } from "react";

const ForgotPassword = () => {
const [email, setEmail] = useState('')


const sendEmail = async (e) => {
    e.preventDefault();
    if (email = '') {return alert('The email field must be filled in.')} 
    else {
        try {
            const response = await axios.post('api/user/forgotpassword', {email})  
            console.log(response.data)
    } catch (error) {
        console.error(error.response.data)
    }
    }
}

    return (
        <>
        <h1>Password Reset Form</h1>
        <form className = '' onSubmit = {sendEmail}>
            <input type='text' name='email' placeholder='Insert email address here to reset your password.' value={email} onChange={() => setEmail()}></input>
            <button>Reset Password</button>
        </form>

        </>
)}

export default ForgotPassword