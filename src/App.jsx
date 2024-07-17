import React from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./bages/Home";
import Favorites from "./bages/Favorites";
import Details from "./bages/Details";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
        <Route path="/details/:id" element={<Details />}></Route>
      </Routes>
    </div>
  );
}

export default App;
