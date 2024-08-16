import React, { useEffect } from "react";
import "./App.css";
import Add from "./Components/Pages/Add";
import Dashboard from "./Components/Pages/Dashboard";
import Home from "./Components/Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewAssets from "./Components/Pages/View";
import Logout from "./Components/Pages/Logout";
import AssignAsset from "./Components/Pages/AssignAsset";
import AssignmenetsView from "./Components/Pages/AssignmentsView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/auth/dashboard" element={<Dashboard />} />
        <Route path="/auth/add-asset" element={<Add />} />
        <Route path="/auth/view-assets" element={<ViewAssets />} />
        <Route path="/auth/logout" element={<Logout />} />
        <Route path="/auth/assign-asset" element={<AssignAsset />} />
        <Route path="/auth/assignments" element={<AssignmenetsView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
