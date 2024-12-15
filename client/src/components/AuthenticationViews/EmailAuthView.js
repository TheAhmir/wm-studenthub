import React, { useEffect, useState } from "react";
import './Auth.scss';
import { useNavigate } from "react-router-dom";
import { auth } from "../FirebaseAuth/firebase";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

const EmailAuthView = () => {
    const [email, setEmail] = useState('');
    //const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

const handleSignIn = async (event) => {
    event.preventDefault();

    // Check if we're on localhost
    const isLocalhost = window.location.hostname === 'localhost';

    // Validate the email input
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please provide a valid email address.');
        return;
    }

    // Firebase action code settings
    const actionCodeSettings = {
        url: isLocalhost 
            ? `http://localhost:3000/?email=${email}` 
            : `https://your-production-url.com/`,
        handleCodeInApp: true,
    };

    try {
        // Initialize Firebase auth
        const auth = getAuth();

        // Send the sign-in link to the provided email
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);

        // Store the email locally for later use
        window.localStorage.setItem('emailForSignIn', email);

        alert('Sign-in link sent! Check your email.');
    } catch (error) {
        console.error('Error sending sign-in link:', error.message);
        alert('Failed to send sign-in link. Please try again.');
    }
};

    return (
        <div className="auth-page">
            {user ? (
                <p>Signed in as: {user.email}</p>
            ) : (
                <>
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
                        {/*<input
                            className="auth-item"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />*/}
                        <button className="auth-item auth-submit" type="submit">
                            Submit
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

export default EmailAuthView;
