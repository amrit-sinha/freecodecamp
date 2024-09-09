import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const SignIn = () => {
  const navigate = useNavigate();
  const [signup, setSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

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
        const res = await axios.post(
          `https://freecodecamp-backend-amrit.netlify.app/api/auth/signin`,
          {
            email,
            password,
          }
        );
        document.cookie = `token=${res.data.token}; path=/`;
        alert("Login successful");
        navigate("/learn");
      } catch (err) {
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
        await axios.post(
          `https://freecodecamp-backend-amrit.netlify.app/api/auth/signup`,
          {
            name,
            email,
            password,
          }
        );
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
      const res = await axios.post(
        `https://freecodecamp-backend-amrit.netlify.app/api/auth/google-signin`,
        {
          credential: credentialResponse.credential,
        }
      );
      document.cookie = `token=${res.data.token}; path=/`;
      alert("Login successful");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
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
  );
};

export default SignIn;
