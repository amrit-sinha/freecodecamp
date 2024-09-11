import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { setCredentials } from "../redux/authSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signup, setSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const apiRoute = "https://freecodecamp-backend-esbl.onrender.com";
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setValidEmail(validateEmail(newEmail));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setValidPassword(newPassword.length > 5);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (validEmail && validPassword) {
      try {
        const res = await axios.post(`${apiRoute}/api/auth/signin`, {
          email,
          password,
        });
        dispatch(setCredentials({ token: res.data.token }));
        alert("Login successful");
        navigate("/learn");
      } catch (err) {
        console.log(err);
        alert(err);
      }
    } else {
      alert("Please correct the errors before submitting");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (validEmail && validPassword) {
      try {
        const res = await axios.post(`${apiRoute}/api/auth/signup`, {
          name,
          email,
          password,
        });
        dispatch(setCredentials({ token: res.data.token }));
        alert("Registration successful");
        navigate("/learn");
      } catch (err) {
        alert(err);
      }
    } else {
      alert("Please correct the errors before submitting");
    }
  };

  const handleGoogleSignIn = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { name: googleName, email: googleEmail } = decoded;
      setName(googleName);
      setEmail(googleEmail);
      const res = await axios.post(`${apiRoute}/api/auth/google-signin`, {
        name: googleName,
        email: googleEmail,
      });
      dispatch(setCredentials({ token: res.data.token }));
      alert("Login successful");
      navigate("/learn");
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="login-window">
      <GoogleOAuthProvider clientId="230060964801-dg2jcih3muqp37ofrs2b133r6uq4q8kh.apps.googleusercontent.com">
        <div className="login-container">
          <img
            src="https://cdn.freecodecamp.org/platform/universal/logo-512X512.png"
            alt="freeCodeCamp.org"
          />
          <h1>Log in to freeCodeCamp</h1>
          <GoogleLogin
            onSuccess={handleGoogleSignIn}
            onError={(error) => alert(error)}
            useOneTap
          >
            <button>Sign in with Google</button>
          </GoogleLogin>
          <div className="divider">
            <span>OR</span>
          </div>
          {!signup ? (
            <>
              <input
                type="email"
                placeholder="Email address*"
                className="credential-input"
                style={
                  email
                    ? validEmail
                      ? { border: "2px solid green" }
                      : { border: "2px solid red" }
                    : {}
                }
                value={email}
                onChange={handleEmailChange}
                required
              />
              {!validEmail && email && (
                <p className="error-message">Enter a valid email</p>
              )}
              <input
                type="password"
                placeholder="Password*"
                className="credential-input"
                style={
                  password
                    ? validPassword
                      ? { border: "2px solid green" }
                      : { border: "2px solid red" }
                    : {}
                }
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {!validPassword && password && (
                <p className="error-message">
                  Password length must be greater than 5
                </p>
              )}
              <button
                className="credential-submit-button"
                onClick={handleSignIn}
                disabled={!validEmail || !validPassword}
              >
                Sign In
              </button>
              <div className="signup-text">
                <h3> Don't have an account yet? </h3>
                <p onClick={() => setSignup(!signup)}>Sign Up</p>
              </div>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Name*"
                className="credential-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email address*"
                className="credential-input"
                style={
                  email
                    ? validEmail
                      ? { border: "2px solid green" }
                      : { border: "2px solid red" }
                    : {}
                }
                value={email}
                onChange={handleEmailChange}
                required
              />
              {!validEmail && email && (
                <p className="error-message">Enter a valid email</p>
              )}
              <input
                type="password"
                placeholder="Password*"
                className="credential-input"
                style={
                  password
                    ? validPassword
                      ? { border: "2px solid green" }
                      : { border: "2px solid red" }
                    : {}
                }
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {!validPassword && password && (
                <p className="error-message">
                  Password length must be greater than 5
                </p>
              )}
              <button
                className="credential-submit-button"
                onClick={handleSignUp}
                disabled={!validEmail || !validPassword || !name}
              >
                Sign Up
              </button>
              <div className="signup-text">
                <h3> Already a member? </h3>
                <p onClick={() => setSignup(!signup)}>Sign In</p>
              </div>
            </>
          )}
        </div>
      </GoogleOAuthProvider>
    </div>
  );
};

export default SignIn;
