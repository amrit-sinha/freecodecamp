import logo from "../assets/logo.svg";
const Navbar = () => {
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
        <button
          className="signIn-button"
          onClick={() => (window.location.href = "/signin")}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};
export default Navbar;
