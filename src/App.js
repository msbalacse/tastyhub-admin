import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import UploadProducts from "./components/UploadProducts/UploadProducts";
import "./App.css";
import Manage from "./components/Manage/Manage";
import { ApiDataProvider } from "./context/ApiDataContext";

function App() {
  return (
    <div className="app">
      <ApiDataProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<UploadProducts />} />
            <Route path="/manage" element={<Manage />} />
          </Routes>
        </Router>
      </ApiDataProvider>
    </div>
  );
}

export default App;
