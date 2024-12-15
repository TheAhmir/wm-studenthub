import React, { useEffect, useState } from "react";
import './Auth.scss';
import { useNavigate } from "react-router-dom";
import { auth } from "../FirebaseAuth/firebase";
import { trackUserChanges } from "../FirebaseAuth/AuthMethods";
import { onAuthStateChanged, createUserWithEmailAndPassword, validatePassword, sendEmailVerification} from "firebase/auth";


const SignUpView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [isVerificationSent, setIsVerificationSent] = useState(false);

const handleSignIn = async (event) => {
    event.preventDefault();

    const completeSignIn = async () => {
        try {
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please provide a valid email address.');
                return;
            }

            const status = await validatePassword(auth, password);

            if (!status.isValid) {
                alert('Invalid password.')
                return
            } else {
                alert('creating account')
            }

            createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    
    sendEmailVerification(user)
  .then(() => {
    // Email verification sent!
    setIsVerificationSent(true)
    // ...
  });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });




        } catch (error) {

        }
    };

    completeSignIn();
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
            {user ? (<div>
                {
                isVerificationSent ? ( auth.currentUser.emailVerified ? (
                    <p>User email {user.email} has been verified.</p>) : <p>Verification email sent to {user.email}</p>) 
                    : (
                     auth.currentUser.emailVerified ? (
                     <p>User email: {user.email} has been verified.</p>) : ( <p>Signed in as: {user.email}</p> ))
                     }
                     <a href="/">Home</a>
                     </div> 
            ) : (
                <>
                    <form className="auth-form" onSubmit={handleSignIn}>
                        <h1>Sign Up</h1>
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
                    </form>
                </>
            )}
        </div>
    );
};

export default SignUpView;
