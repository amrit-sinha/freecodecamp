import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <input
        placeholder="Search 10,700+ tutorials"
        type="search"
        value=""
      ></input>
      <img src={logo}></img>
      <div className="nav-buttons">
        <button className="menu-button">Menu</button>
        <button className="signIn-button" onClick={() => navigate("/signin")}>
          Sign In
        </button>
      </div>
    </div>
  );
};
export default Navbar;
