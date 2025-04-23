import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/*Los componentes de vista deben renderizarse dentro de <Route> para que React Router los gestione.*/}
        
        <Route path="/" element={<MainContent />} />
        <Route path="/carrito" element={<ShoppingCart />} />
        {/*<Route path="/product/:id" element={<ProductDetails />} />*/}
      </Routes>
    </Router>
  );
}

export default App;
