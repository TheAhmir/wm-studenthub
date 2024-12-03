import React from "react";
import './Auth.scss';

const SigninView = () => {
    return (
        <div className="auth-page">
            <form className="auth-form">
                <h1>Sign In</h1>
                <input className="auth-item" name="email" type="email"  placeholder="Email" required/>
                <input className="auth-item" name="password" type="password" placeholder="Password" required/>
                <button className="auth-item auth-submit" type="'submit">Submit</button>
                <div className="other-actions">
                    <a href="/forgot-password">Forgot password?</a>
                    <a href="/signup">Signup</a>
                </div>
            </form>
        </div>
    )
}

export default SigninView