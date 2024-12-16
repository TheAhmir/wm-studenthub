import React, { useEffect, useState } from "react";
import { auth } from "../FirebaseAuth/firebase";
import { sendPasswordResetEmail, confirmPasswordReset, updatePassword, signOut } from "firebase/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signInUser } from "../FirebaseAuth/AuthMethods";

const ForgotPasswordView = () => {
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isPasswordChanged, setIsPasswordChanged] = useState(false);
    const [view, setView] = useState('email');

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const handleGotEmail = () => {
        setView('password-reset');
    };

    const handleResetPasswordWithOldPassword = () => {
        signInUser(email, oldPassword, (user) => {
            if (user) {
                updatePassword(user, newPassword);
                setIsPasswordChanged(true);
                
                navigate('/')
            } else {
                alert('Could not sign in. Email or password must be incorrect.')
            }
        });
    };

    const handleDontKnowOldPassword = () => {
        const actionCodeSettings = {
            url: `${process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL}/auth/forgot-password?email=${email}`,
            handleCodeInApp: true
        };

        sendPasswordResetEmail(auth, email, actionCodeSettings)
            .then(() => {
                console.log('Password reset email sent');
            })
            .catch((error) => {
                console.error('Error sending password reset email', error);
            });
    };

    useEffect(() => {
        const oobCode = searchParams.get('oobCode') ?? null;

        if (oobCode) {
            setView('missing-old-password');
        }
    }, [searchParams]);

    const displayView = () => {
        switch (view) {
            case 'email':
                return (
                    <div className="auth-page">
                        <form className="auth-form" onSubmit={(e) => { e.preventDefault(); handleGotEmail(); }}>
                            <h1>Account Email</h1>
                            <input
                                className="auth-item"
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button className="auth-item auth-submit" type="submit">
                                Submit
                            </button>
                        </form>
                    </div>
                );
            case 'password-reset':
                return (
                    <div className="auth-page">
                        <form className="auth-form" onSubmit={(e) => { e.preventDefault(); handleResetPasswordWithOldPassword(); }}>
                            <h1>Update Password</h1>
                            <input
                                className="auth-item"
                                name="old-password"
                                type="password"
                                placeholder="Old Password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                            />
                            <input
                                className="auth-item"
                                name="new-password"
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <button className="auth-item auth-submit" type="submit">
                                Submit
                            </button>
                            <p>or</p>
                            <p>Get email to change password</p>
                        </form>
                    </div>
                );
            case 'missing-old-password':
                return (
                    <div className="auth-page">
                        <form className="auth-form" onSubmit={(e) => { e.preventDefault(); handleDontKnowOldPassword(); }}>
                            <h1>Account Email</h1>
                            <input
                                className="auth-item"
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button className="auth-item auth-submit" type="submit">
                                Submit
                            </button>
                        </form>
                    </div>
                );
            default:
                return null;
        }
    };

    return displayView();
};

export default ForgotPasswordView;
