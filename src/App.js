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
import Adicional from "./pages/multi/Adicional"
import ItemsAdicional from "./pages/multi/ItemsAdicional"
import AutorizacionVer from "./pages/multi/AutorizacionVer"
import Calendario from './pages/multi/calendar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AutorizacionVer />} />
        <Route path="/programar" element={<Programar />} />
        <Route path="/reProgramar" element={<ReProgramar />} />
        <Route path="/verPrograma" element={<VerPrograma />} />
        <Route path="/tipoSector" element={<TipoSector />} />
        <Route path="/sector" element={<Sector />} />
        <Route path="/espacio" element={<Espacio />} />
        <Route path="/escenario" element={<Escenario />} />
        <Route path="/autorizacion" element={<Autorizacion />} />  
        <Route path="/adicionales" element={<Adicional/>} />  
        <Route path='/itemsAdicional' element={<ItemsAdicional/>}/>
        <Route path="/autorizacionVer" element={<AutorizacionVer />} />  
           </Routes>
      
    </BrowserRouter>
  );
}

export default App;
