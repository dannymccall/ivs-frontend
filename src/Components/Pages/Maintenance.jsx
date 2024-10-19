import React, { useState, useEffect, useRef } from "react";
import { makeRequest, url } from "../../utils/make-request";
import Header from "../WidgetComponents/Header";
import MaintenanceTable from "../WidgetComponents/MaintenanceTable";

export default function Maintenance() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function getRepairers() {
      const data = await makeRequest(
        `${url}/repairersApi.php`,
        "GET",
        "",
        "fetch_repairs"
      );
      const { success, repairs } = data;
      if (success) {
        setAssets(repairs);
      }
    }
    getRepairers();
  });

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <MaintenanceTable assets={assets} />
      </div>
    </>
  );
}
