import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Learn from "./components/Learn";
import SignIn from "./components/SignIn";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/learn" element={<Learn />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
