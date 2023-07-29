import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar/Navbar";
import UploadProducts from "./components/UploadProducts/UploadProducts";
import "./App.css";
import Manage from "./components/Manage/Manage";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadProducts />} />
          <Route path="/manage" element={<Manage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
