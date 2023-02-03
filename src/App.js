import React from 'react';
import Registro from "./pages/Resgistro";
import Programar from "./pages/Programar"
import ReProgramar from "./pages/ReProgramar"
import { Route, Routes, BrowserRouter } from "react-router-dom";
import VerPrograma from "./pages/VerPrograma";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registro />} />
        <Route path="/programar" element={<Programar />} />
        <Route path="/reProgramar" element={<ReProgramar />} />
        <Route path="/verPrograma" element={<VerPrograma />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
