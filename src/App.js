import React from 'react';
import Registro from "./pages/Registro";
import Programar from "./pages/Programar"
import ReProgramar from "./pages/ReProgramar"
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import VerPrograma from "./pages/VerPrograma";

import NoPage from './pages/NoPage';

import PageWrapper from './PageWrapper';
import AppMusic from './pages/Music';

function App() {
  return (
    <BrowserRouter>
      <PageWrapper>
        <Routes>
          <Route path="/" element={<VerPrograma />} />
          <Route path="/registro" element={<Registro/>} />
          <Route path="/programar" element={<Programar />} />
          <Route path="/reProgramar" element={<ReProgramar />} />
          <Route path="/verPrograma" element={<VerPrograma />} />
          <Route path="/music" element={<AppMusic />} />
          <Route path="*" element={<VerPrograma />} />
        </Routes>
      </PageWrapper>
    </BrowserRouter>
  );
}

export default App;
