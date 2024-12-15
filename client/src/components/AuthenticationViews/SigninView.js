import React, { useEffect, useState } from "react";
import './Auth.scss';
import { useNavigate } from "react-router-dom";
import { auth } from "../FirebaseAuth/firebase";
import { trackUserChanges } from "../FirebaseAuth/AuthMethods";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const SigninView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

const handleSignIn = async (event) => {
    event.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please provide a valid email address.');
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    navigate('/')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });

    
};


    useEffect(() => {
        // Call trackUserChanges and pass a callback to update state
        const unsubscribe = trackUserChanges((currentUser) => {
            setUser(currentUser); // Update the user state
        });

        // Clean up the subscription when the component unmounts
        return () => unsubscribe();
    }, []);

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
                            <a href="/auth/signup">Signup</a>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default SigninView;
