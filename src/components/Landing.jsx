import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appleLogo from "../assets/appleLogo.svg";
import googleLogo from "../assets/googleLogo.svg";
import microsoftLogo from "../assets/microsoftLogo.svg";
import spotifyLogo from "../assets/spotifyLogo.svg";
import amazonLogo from "../assets/amazonLogo.svg";
const Landing = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div className="landing-page-container">
      <div className="landing-page">
        <h1>Learn to code — for free.</h1>
        <h1>Build projects.</h1>
        <h1>Earn certifications.</h1>
        <h3>
          Since 2014, more than 40,000 freeCodeCamp.org graduates have gotten
          jobs at tech companies including:
        </h3>
        <div className="landing-page-logo">
          <img src={appleLogo} />
          <img src={googleLogo} />
          <img src={microsoftLogo} />
          <img src={spotifyLogo} />
          <img src={amazonLogo} />
        </div>
        <button
          onClick={() => {
            isAuthenticated ? navigate("/learn") : navigate("/signin");
          }}
        >
          {isAuthenticated ? "Explore Courses" : "Get started (it's free)"}
        </button>
      </div>
    </div>
  );
};
export default Landing;
