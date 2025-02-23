import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ChuckNorris from "./components/ChuckNorris";
import "./components/styles.css";

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm setToken={setToken} />} />
        <Route path="/fact" element={token ? <ChuckNorris token={token} setToken={setToken} /> : <LoginForm setToken={setToken} />} />
      </Routes>
    </Router>
  );
};

export default App;
