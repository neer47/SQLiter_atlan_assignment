import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SqlEditor from '../pages/SqlEditor';

function AppRoutes() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sql-editor" element={<SqlEditor />} />
    </Routes>
    </>
  );
}

export default AppRoutes;