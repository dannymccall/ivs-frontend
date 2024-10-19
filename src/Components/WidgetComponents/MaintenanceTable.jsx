import React, { useEffect } from "react";
import "../../App.css";

export default function MaintenanceTable({
  assets,
}) {
  return (
    <>
      <div className="table-container">
        <div className="table-sub-container">
          <table>
            <thead>
              <tr>
                <th>Asset Name</th>
                <th>Asset Model</th>
                <th>Repairer Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => {
                return (
                  <tr key={asset.id} style={{ height: "40px" }}>
                    <td>
                      {asset.assetName.charAt(0).toUpperCase() +
                        asset.assetName.slice(1).toLowerCase()}
                    </td>
                    <td>{asset.assetModel.toUpperCase()}</td>
                    <td>{asset.repairer_name}</td>
                    <td>{asset.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
