import React from 'react';
import Registro from "./pages/Resgistro";
import Programar from "./pages/Programar"
import ReProgramar from "./pages/ReProgramar"
import NoPage from './pages/NoPage';
import VerPrograma from "./pages/VerPrograma";

import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import PageWrapper from './PageWrapper';
import AppMusic from './pages/Music';
function App() {
  return (

    <BrowserRouter>
      <PageWrapper>
        <Routes>

          <Route path="/" element={<Registro />} />
          <Route path="/registro" element={<Navigate to="/" />} />
          <Route path="/programar" element={<Programar />} />
          <Route path="/reProgramar" element={<ReProgramar />} />
          <Route path="/verPrograma" element={<VerPrograma />} />
          <Route path="/music" element={<AppMusic />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </PageWrapper>
    </BrowserRouter>

  );
}

export default App;
