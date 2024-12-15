import React from "react";
import { auth } from "../FirebaseAuth/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ProfileView = () => {
    const navigate = useNavigate()

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/')
          }).catch((error) => {
            // An error happened.
            alert(error)
          });
    }
    return (
        <div>
            <p onClick={handleSignOut}>signout</p>
        </div>
    )
}

export default ProfileView