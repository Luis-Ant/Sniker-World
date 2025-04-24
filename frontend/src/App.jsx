import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import ShoppingCart from "./components/ShoppingCart";
import ProductDetails from "./components/ProductDetails";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/carrito" element={<ShoppingCart />} />
        <Route path="/sneaker/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
