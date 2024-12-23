import React from "react";
import { signOutUser } from "../FirebaseAuth/AuthMethods";
import { useNavigate } from "react-router-dom";

const ProfileView = () => {
    const navigate = useNavigate()

    const handleSignOut = () => {
        signOutUser((result) => {
            if (result) {
                navigate('/')
            } else {
                alert('There was an error signing out.')
            }
        })
    }
    return (
        <div>
            <p onClick={handleSignOut}>signout</p>
        </div>
    )
}

export default ProfileView