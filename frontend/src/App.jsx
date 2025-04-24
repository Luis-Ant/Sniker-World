import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import ShoppingCart from "./components/ShoppingCart";
import ProductDetails from "./components/ProductDetails";
import Login from "./components/Login";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<> <Navbar/> <MainContent/> </>} />
        <Route path="/carrito" element={<> <Navbar/> <ShoppingCart/> </>} />
        <Route path="/sneaker/:id" element={<> <Navbar/> <ProductDetails/> </>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
