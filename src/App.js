import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importa tus componentes:
import SplashVideo from "./components/SplashVideo";
import TikTokFoodUI from "./components/TikTokFoodUI"; // Para /slider
import RestaurantLayout from "./components/RestaurantLayout"; // Para /menu
import ItemDetailLayout from "./components/ItemDetailLayout"; // Para /details
import CartComponent from "./components/CartComponent"; // Para /cart

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta principal (ejemplo) */}
          <Route path="/" element={<SplashVideo />} />

          {/*
            Ruta dinámica para "slider/:id".
            Ejem: http://localhost:3000/slider/atv4ruedasgalipan
          */}
          <Route path="/slider/:id" element={<TikTokFoodUI />} />

          {/*
            Ruta dinámica para "menu/:id".
            Ejem: http://localhost:3000/menu/atv4ruedasgalipan
          */}
          <Route path="/menu/:id" element={<RestaurantLayout />} />

          {/*
            Ruta dinámica para "details/:id".
            Ejem: http://localhost:3000/details/atv4ruedasgalipan
          */}
          <Route path="/details/:id" element={<ItemDetailLayout />} />

          {/*
            Ruta dinámica para "cart/:id".
            Ejem: http://localhost:3000/cart/atv4ruedasgalipan
          */}
          <Route path="/cart/:id" element={<CartComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
