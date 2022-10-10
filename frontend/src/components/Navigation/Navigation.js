import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from './ProfileButton'
import './Navigation.css'
import LoginFormModal from '../LoginFormModal/LoginFormModal'
import SignupFormModal from "../SingupFormModal/SignupFormModal";

function Navigation() {
    const sessionUser = useSelector(state => state.session.user)

    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        )
    } else {
        sessionLinks = (
            <div>
                {/* <NavLink to='/login'>Log In</NavLink>
                <NavLink to='/signup'>Sign Up</NavLink> */}
                <LoginFormModal />
                <SignupFormModal />
            </div>
        )
    }

    return (
        <ul>
            <li>
                <NavLink to='/'>Home</NavLink> 
                {sessionLinks}
            </li>
        </ul>
    )
}

export default Navigation;