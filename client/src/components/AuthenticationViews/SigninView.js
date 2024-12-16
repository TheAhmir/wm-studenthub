import React, { useEffect, useState } from "react";
import './Auth.scss';
import { useNavigate } from "react-router-dom";
import { trackUserChanges, isAcceptableEmail, signIn } from "../FirebaseAuth/AuthMethods";

const SignInView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

const handleSignIn = async (event) => {
    event.preventDefault();

    isAcceptableEmail(email, (isValid) => {
        if (isValid) {
            signIn(email, password, (result) => {
                if (result) {
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


    useEffect(() => {
        // Call trackUserChanges and pass a callback to update state
        const unsubscribe = trackUserChanges(({/*currentuser*/}) => {
            //setUser(currentUser); // Update the user state
        });

        // Clean up the subscription when the component unmounts
        return () => unsubscribe();
    }, []);

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
