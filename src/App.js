import React from 'react';
import Registro from "./pages/Resgistro";
import Programar from "./pages/Programar"
import ReProgramar from "./pages/ReProgramar"
import { Route, Routes, BrowserRouter } from "react-router-dom";
import VerPrograma from "./pages/VerPrograma";
//multi
import TipoSector from "./pages/multi/TipoSector"
import Sector from "./pages/multi/Sector"
import Espacio from "./pages/multi/Espacio"
import Escenario from "./pages/multi/Escenario"
import Autorizacion from "./pages/multi/Autorizacion"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registro />} />
        <Route path="/programar" element={<Programar />} />
        <Route path="/reProgramar" element={<ReProgramar />} />
        <Route path="/verPrograma" element={<VerPrograma />} />
        <Route path="/tipoSector" element={<TipoSector />} />
        <Route path="/sector" element={<Sector />} />
        <Route path="/espacio" element={<Espacio />} />
        <Route path="/escenario" element={<Escenario />} />
        <Route path="/autorizacion" element={<Autorizacion />} />      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
