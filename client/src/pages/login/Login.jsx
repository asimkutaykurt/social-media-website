import "./login.css";
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material"
import { Link } from "react-router-dom";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext);


    const handleClick = (e) => {
        e.preventDefault();
        loginCall(
            { email: email.current.value, password: password.current.value },
            dispatch
            );
    }

    console.log(user);
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
                    <input placeholder="Email" type="email" className="login-input" ref={email} required />
                    <input placeholder="Password" type="password" className="login-input" ref={password} required minLength="6" />
                    <button className="login-button" type="submit" disabled={isFetching}>{isFetching ? <CircularProgress color="secondary" size="30px" /> : "Login"}</button>
                    <span className="login-forgot">Forgot Password?</span>
                    <Link to="/register">
                        <button className="login-register-button">{isFetching ? <CircularProgress size="30px" /> : "Create New Account"}</button>
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}
