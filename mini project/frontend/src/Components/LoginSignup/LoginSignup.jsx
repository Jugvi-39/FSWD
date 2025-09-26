import React from "react";
import './LoginSignup.css';

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'

const LoginSignup = () => {
    return (
        <div classname = 'container'>
            <div classname = 'header'>
                <div classname = 'text'>Sign Up</div>
                <div classname = 'underline'></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={user_icon} alt="" />
                    <input type = 'text' />
                </div>
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type = 'email' />
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type = 'password' />
                </div>
            </div>
            <div className="forgot-password">Lost Passrowd? <span>Click Here!</span>
            </div>
            <div classname = "submit-container">
                <div className="submit">Sign Up</div>
                <div className="submit">Login</div>
            </div>
        </div>
    )
}

export default LoginSignup