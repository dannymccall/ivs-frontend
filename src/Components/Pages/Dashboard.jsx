import React from "react";
import { useState, useEffect } from "react";
import Header from "../WidgetComponents/Header";
import useClock from "../WidgetComponents/Clock";
import { icons } from "../WidgetComponents/Icons";
import { useNavigate } from "react-router-dom";
import { getCredentials } from "../../utils/storage";
import "../../App.css";

export default function Dashboard() {
  const greet = useClock();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({});
  const [loading, setLoading] = useState(true);


  
  
  function handleAddNavigator() {
    navigate("/auth/add-asset");
  }

  
  return (
    <>
      <div className="container">
        <Header />
        <div className="container-section">
          <div className="greeting">
            <h1 className="clock">{`${greet}`}</h1>
          </div>
        </div>
        <div className="navigators">
          <div className="navigators-containers">
            <img src={icons.add} alt="" className="icon" />
            <button onClick={() => navigate("/auth/add-asset")}>Add asset</button>
          </div>
          <div className="navigators-containers">
            <img src={icons.view} alt="" className="icon" />
            <button onClick={() => navigate("/auth/view-assets")}>
              View assets
            </button>
          </div>
          <div
            className="navigators-containers"
            onClick={() => navigate("/auth/assign-asset")}
          >
            <img src={icons.assign} alt="" className="icon" />
            <button>Assign asset</button>
          </div>
          <div
            className="navigators-containers"
            onClick={() => navigate("/auth/assignments")}
          >
            <img src={icons.assign} alt="" className="icon" />
            <button>Assignments</button>
          </div>
          <div
            className="navigators-containers"
            onClick={() => navigate("/auth/maintenance")}
          >
            <img src={icons.maintenace} alt="" className="icon" />
            <button>See maintenance</button>
          </div>
        </div>
      </div>
    </>
  );
}
