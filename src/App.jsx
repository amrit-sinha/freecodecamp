import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Learn from "./components/Learn";
import SignIn from "./components/SignIn";

function App() {
  return (
    <HashRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/learn" element={<Learn />} />
      </Routes>
    </HashRouter>
  );
}

export default App;