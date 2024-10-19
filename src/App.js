import React, { useEffect, useState } from "react";
import "./App.css";
import Add from "./Components/Pages/Add";
import Dashboard from "./Components/Pages/Dashboard";
import Home from "./Components/Pages/Home";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ViewAssets from "./Components/Pages/View";
import Logout from "./Components/Pages/Logout";
import AssignAsset from "./Components/Pages/AssignAsset";
import AssignmenetsView from "./Components/Pages/AssignmentsView";
import Maintenance from "./Components/Pages/Maintenance";
import RepairersDashboard from "./Components/Pages/RepairersDashboard";

import { getCredentials } from "./utils/storage";

function App() {
  const [credentials, setCredentials] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchCredentials() {
      const creds = await getCredentials("credentials");
      console.log({ creds });
      if (creds !== undefined){
        setCredentials(creds);
        
      } 
      setLoading(false); // Ensure loading state is set to false after fetching
    }
    
    fetchCredentials();
  }, []);
  
  
  if (loading) return <div>Loading...</div>; // Show loading state

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        {credentials.userType === "admin" && (
          <>
            <Route path="/auth/dashboard" element={<Dashboard />} />
            <Route path="/auth/add-asset" element={<Add />} />
            <Route path="/auth/view-assets" element={<ViewAssets />} />
            <Route path="/auth/logout" element={<Logout />} />
            <Route path="/auth/assign-asset" element={<AssignAsset />} />
            <Route path="/auth/assignments" element={<AssignmenetsView />} />
            <Route path="/auth/maintenance" element={<Maintenance />} />
            <Route path="/auth/repairersDashboard" element={<RepairersDashboard />} />
          </>
        )}
        {credentials.userType === "repairer" && (
          <>
            <Route path="/auth/repairersDashboard" element={<RepairersDashboard />} />
            <Route path="/auth/logout" element={<Logout />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
    
    </>
  );
}


export default App;
