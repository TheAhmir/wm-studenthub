import React from "react";
import './Auth.scss';

const SignupView = () => {
    return (
        <div className="auth-page">
            <form className="auth-form">
                <h1>Sign Up</h1>
                <input className="auth-item" name="email" type="email"  placeholder="Email" required/>
                <input className="auth-item" name="password" type="password" placeholder="Password" required/>
                <input className="auth-item" name="password-confirm" type="password" placeholder="Confirm Password" required/>
                <button className="auth-item auth-submit" type="'submit">Submit</button>
            </form>
        </div>
    )
}

export default SignupView