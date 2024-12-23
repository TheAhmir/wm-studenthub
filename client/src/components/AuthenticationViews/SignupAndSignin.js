import React from "react";
import SignUpView from "./SignUp";
import SignInView from "./SignIn";

import './SignupAndSignin.scss';

const SignupAndSignin = () => {
    return (
        <div className="signin-signup-page">
            <div className="fitting-div">
                <div className="cool-container">
                    <SignUpView />
                    <div className="divider-element">
                        <div class="vertical-divider"></div>
                        <p>or</p>
                        <div class="vertical-divider"></div>
                    </div>
                    <SignInView />
                </div>
            </div>
        </div>
    )
}

export default SignupAndSignin;