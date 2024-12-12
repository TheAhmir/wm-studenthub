import React, { useEffect, useState } from "react";
import './Auth.scss';
import { useNavigate } from "react-router-dom";
import { auth } from "../FirebaseAuth/firebase";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";

const SigninView = () => {
    const [email, setEmail] = useState('');
    //const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleSignIn = async (event) => {
        event.preventDefault();

        if (!email.endsWith('@wm.edu')) {
            alert('Please use a William & Mary email.')
            return;
        }
        else {
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({
                login_hint:email
            })
            const result = await signInWithPopup(auth, provider);
            if (result) {
                navigate('/')
            }
        }
    };

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User is logged in");
                setUser(user); // Set the signed-in user
            } else {
                console.log("User is not logged in");
                setUser(null); // Clear user if not signed in
            }
        });

        // Clean up subscription on unmount
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
                        <div className="other-actions">
                            <a href="/forgot-password">Forgot password?</a>
                            {/*<a href="/signup">Signup</a>*/}
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default SigninView;
