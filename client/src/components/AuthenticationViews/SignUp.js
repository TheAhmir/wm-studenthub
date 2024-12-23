import React, { useEffect, useState } from "react";
import './Auth.scss';
import { useNavigate } from "react-router-dom";
import {isAcceptablePassword, createAccount, verifyEmail, isAcceptableEmail } from "../FirebaseAuth/AuthMethods";

const PasswordChecklist = ({items}) => {
    
    return (
        <div className="password-checklist-container">
            {items.map((item, index) => (
            <div className="password-checklist-items">
                <p>{item.isValid ? '✔️' : '❌'} {item.message}</p>
            </div>
        ))}
        </div>
    )
}

const SignUpView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordFocused, setIsPasswordFocused] = useState(false)
    const navigate = useNavigate()

    const capitalRegex = /[A-Z]/
    const lowercaseRegex = /[a-z]/
    const specialcharacterRegex = /[!@#$%^&*(),.?":{}|<>]/
    const numberRegex = /[0-9]/

    const passwordChecklistItems = [ 
        { message: <>Have at least <strong>one capital letter</strong></>, isValid: capitalRegex.test(password) }, 
        { message: <>Have at least <strong>one lowercase letter</strong></>, isValid: lowercaseRegex.test(password) }, 
        { message: <>Have at least <strong>one special character</strong></>, isValid: specialcharacterRegex.test(password) }, 
        { message: <>Have at least <strong>one number</strong></>, isValid: numberRegex.test(password) },
        { message: <>Be at least <strong>6 characters</strong></>, isValid: password.length >= 6}
    ]

const handleSignIn = async (event) => {
    event.preventDefault();

    const completeSignIn = async () => {
        isAcceptableEmail(email, (isValid) => {
            if (isValid) {
                isAcceptablePassword(password, (isValid) => {
                    if (isValid) {
                        if (confirmPassword === password) {
                            createAccount(email, password, (result) => {
                                if (result) {
                                    verifyEmail(result, (isEmailSent) => {
                                        if (isEmailSent) {
                                            alert(`Verification email has been sent to ${email}`)
                                            navigate('/')
                                        } else {
                                            alert(`Verification email could not be sent to ${email}`)
                                        }
                                    })
                                } else {
                                    alert('Failed to sign up. Try again.')
                                }
                            })
                        } else {
                            alert('The passwords entered are not the same.')
                        }
        
                    } else {
                        alert('Please provide a valid password.')
                    }
                })
            } else {
                alert('Please provide a valid email address.')
            }
        })
    };

    completeSignIn();
};


    useEffect(() => {
        // Call trackUserChanges and pass a callback to update state
        {/*const unsubscribe = trackUserChanges(({}) => {
            //setUser(currentUser); // Update the user state
        });

        // Clean up the subscription when the component unmounts
        return () => unsubscribe();*/}
    }, []);

    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleSignIn}>
                        <h1>Sign Up</h1>
                        <input
                            className="auth-item"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setIsPasswordFocused(false)}
                            required
                        />
                        <div>
                        {isPasswordFocused && <PasswordChecklist items={passwordChecklistItems}/>}
                        <input
                            className="auth-item"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}
                            required
                        />
                        </div>
                        <div className="confirm-password">
                            <input
                                className="auth-item"
                                name="confirm-password"
                                type="password"
                                placeholder="Re-enter password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            {password.length !== 0 && (
                                confirmPassword === password ?
                                    (
                                        <p>{'✔️'} Passwords match</p>
                                    ) : (
                                        <p>{'❌'} Passwords do not match</p>
                                    )
                            )}
                        </div>
                        <button className="auth-item auth-submit" type="submit">
                            Submit
                        </button>
                    </form>
        </div>
    );
};

export default SignUpView;
