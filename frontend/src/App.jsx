import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/carrito" element={<ShoppingCart />} />
      </Routes>
    </Router>
  );
}

export default App;
