import React from "react";
import { Routes, Route } from "react-router-dom";
import GrandmastersList from "./components/GrandmastersList";
import GrandmasterProfile from "./components/GrandmasterProfile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<GrandmastersList />} />
        <Route path="/gm/:username" element={<GrandmasterProfile />} />
      </Routes>
    </div>
  );
}

export default App;
