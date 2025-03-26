import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SqlEditor from '../pages/SqlEditor';
import Navbar from '../components/Navbar/Navbar';

function AppRoutes() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sql-editor" element={<SqlEditor />} />
    </Routes>
    </>
  );
}

export default AppRoutes;