import React, { useEffect, useState } from "react";
import './Auth.scss';
import { useNavigate } from "react-router-dom";
import {isAcceptableEmail, signInUser } from "../FirebaseAuth/AuthMethods";

const SignInView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

const handleSignIn = async (event) => {
    event.preventDefault();

    isAcceptableEmail(email, (isValid) => {
        if (isValid) {
            signInUser(email, password, (user) => {
                if (user) {
                    navigate('/')
                } else {
                    alert('Failed to sign in. Try again.')
                }
            })
        } else {
            alert('Please provide a valid email address.')
        }
    })
};


    

    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleSignIn}>
                        <h1>Sign In</h1>
                        <input
                            className="auth-item"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            
                        />
                        <input
                            className="auth-item"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button className="auth-item auth-submit" type="submit">
                            Submit
                        </button>
                        <div className="other-actions">
                            <a href="/auth/forgot-password">Forgot password?</a>
                        </div>
                    </form>
        </div>
    );
};

export default SignInView;
