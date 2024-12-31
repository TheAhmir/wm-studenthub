import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { signOutUser, trackUserChanges } from "../FirebaseAuth/AuthMethods";
import { useNavigate } from "react-router-dom";
import AlertButton from "../Other/alertButton";
import './ProfileView.scss'

const ProfileView = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [editStage, setEditStage] = useState('not-editable');
    const [isDeletingAccount, setDeletingAccount] = useState(false);

    const changeEditStage = () => {
        if (editStage === 'not-editable') {
            setEditStage('editable')
            return
        }
        if (editStage === 'editable') {
            setEditStage('not-editable')
            return
        }
    }

    const handleSignOut = () => {
        signOutUser((result) => {
            if (result) {
                navigate('/')
            } else {
                alert('There was an error signing out.')
            }
        })
    }

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = trackUserChanges(setUser);
    
        // Clean up subscription on unmount
        return () => unsubscribe();
      }, []);

    return (
        <div className="profile-page">
            <div className="header">
                <div className="title">
                    <h1>My Profile</h1>
                    <button onClick={() => changeEditStage()}><CiEdit className="edit-button"/></button>
                </div>

                <p className="signout" onClick={handleSignOut}>signout</p>
            </div>
            <div className="content-container">
                <div className="column">
                <div className="user-info">
                <p className="label">Display Name</p>
                {editStage === 'not-editable' && (
                    <div className="not-editable">
                        <p>{user?.displayName}</p>
                    </div>
                )}
                {editStage === 'editable' && (
                    <input className="editable"
                    placeholder={user?.displayName}/>
                )}
            </div>
            <div className="user-info">
                <p className="label">Email</p>
                {editStage === 'not-editable' && (
                    <div className="not-editable">
                        <p>{user?.email}</p>
                    </div>
                )}
                {editStage === 'editable' && (
                    <input className="editable"
                    placeholder={user?.email}/>
                )}
            </div>
            <div className="user-info">
                <p className="label">Phone Number</p>
                {editStage === 'not-editable' && (
                    <div className="not-editable">
                        <p>{user?.phoneNumber ?? 'No available Phone Number'}</p>
                    </div>
                )}
                {editStage === 'editable' && (
                    <input className="editable"
                    placeholder={user?.phoneNumber ?? 'Ex. 800-8135'}/>
                )}
            </div>
                </div>
            
            <div className="column column2">
            <div className="centerer">
                <p>I want to reset my password</p>
                <button onClick={() => setDeletingAccount(true)}>
                    <p>Delete My Account</p>
                </button>
            </div>
            </div>
            </div>

            {isDeletingAccount && (
                <div className="delete-alert-container">
                    <div className="delete-placement">
                    <AlertButton
                type="warning"
                component={
                    <div className="place-in-front">
                        <p><strong>Warning:</strong> Are you sure your want to delete your account?</p>

                        <div className="delete-buttons">
                            <p onClick={() => setDeletingAccount(false)}>NO</p>
                            <p>YES</p>
                        </div>
                    </div>
                }
                />
                </div>
                </div>
            )}
        </div>
    )
}

export default ProfileView