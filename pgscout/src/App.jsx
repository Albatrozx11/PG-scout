import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={<Home />} />
        <Route path="/login" Component={<Login />} />
        <Route path="/Dashboard" Component={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
