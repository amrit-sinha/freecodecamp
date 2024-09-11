import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCredentials } from "../redux/authSlice";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleSignOut = async () => {
    try {
      dispatch(clearCredentials());
      alert("Logout successful");
      navigate("/");
    } catch (err) {
      console.error("Error during sign out:", err);
      alert("Error during sign out");
    }
  };

  return (
    <div className="navbar">
      <input placeholder="Search 10,700+ tutorials" type="search" value="" />
      <img src={logo} alt="Logo" onClick={() => navigate("/")} />
      <div className="nav-buttons">
        <button className="menu-button">Menu</button>
        {isAuthenticated ? (
          <button className="signIn-button" onClick={handleSignOut}>
            Sign Out
          </button>
        ) : (
          <button className="signIn-button" onClick={() => navigate("/signin")}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
