import { useRef } from "react";
import "./register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            password.current.setCustomValidity("Passwords don't match")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try {
                await axios.post("auth/register", user);
                navigate("/login")
            } catch(err) {
                console.log(err);
            }
        }
    }

  return (
    <div className="login">
        <div className="login-wrapper">
            <div className="login-left">
                <h3 className="login-logo">Social Media</h3>
                <span className="login-description">
                    Connect with friends and he world around you on Social Website
                </span>
            </div>

            <div className="login-right">
                <form className="login-box" onSubmit={handleClick}>
                    <input placeholder="Username" required ref={username} className="login-input" />
                    <input placeholder="Email" type="email" required ref={email} className="login-input" />
                    <input placeholder="Password" type="password" minLength="6" required ref={password} className="login-input" />
                    <input placeholder="Password again" type="password" required ref={passwordAgain} className="login-input" />
                    <button className="login-button" type="submit">Sign up</button>
                    <Link to="/login">
                        <button className="login-register-button">Log into your Account</button>
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}
