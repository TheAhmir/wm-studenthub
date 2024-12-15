import React, { useState } from "react";

const ForgotPasswordView = () => {
    const [email, setEmail] = useState('');

    const handleSubmitEmailVerification = () => {

    }
    
    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleSubmitEmailVerification}>
                <h1>Verify Email</h1>
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
    )
}

export default ForgotPasswordView