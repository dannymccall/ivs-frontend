import React from "react";
import { useState, useEffect } from "react";
import Header from "../WidgetComponents/Header";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import RepairersTable from "../WidgetComponents/RepairersTable";
import { makeRequest, url } from "../../utils/make-request";
import { getCredentials } from "../../utils/storage";
import { showMessage } from "../WidgetComponents/message";
export default function RepairersDashboard() {
  const [assets, setAssets] = useState([]);

  const [credentials, setCredentials] = useState({});
  useEffect(() => {
    async function fetchCredentials() {
      const credentials = await getCredentials("credentials");
      console.log({ credentials });
      if (credentials !== undefined) setCredentials(credentials);
    }

    fetchCredentials();
  }, []);

  async function handleUpdateRepairState(value, asset) {
    const data = { ...asset, updatedValue: value };
    console.log(data);
    const updateRepairStatus = await makeRequest(
      `${url}/repairersApi.php`,
      "PUT",
      data,
      "update-repaired-asset"
    );
    const { success, message } = updateRepairStatus;
    if (success) {
      showMessage("Hello", message, "success", "Okay", "", "", () => {});
    }
  }

  useEffect(() => {
    async function getRepairers() {
      const data = await makeRequest(
        `${url}/repairersApi.php?repairer_username=${credentials.username}`,
        "GET",
        "",
        "get-repairer-assignments"
      );
      const { success, repairer_assignments } = data;
      if (success) {
        setAssets(repairer_assignments);
      }
    }

    getRepairers();
  });

  return (
    <>
      <div className="container">
        <Header />
        <RepairersTable
          assets={assets}
          handleUpdateRepairState={handleUpdateRepairState}
        />
      </div>
    </>
  );
}
