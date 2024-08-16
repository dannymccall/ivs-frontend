import React, { useEffect } from "react";
import "../../App.css";

export default function AssignmentsTabaleView({
  assignments,
  deleteAsset,
  viewAsset,
  editAsset,
  addNewAsset,
}) {
  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Asset Name</th>
              <th>Asset Model</th>
              <th>Location Block</th>
              <th>Location Room</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => {
              return (
                <tr key={assignment.id}>
                  <td>
                    {assignment.assetName.charAt(0).toUpperCase() +
                      assignment.assetName.slice(1).toLowerCase()}
                      
                  </td>
                  <td>{assignment.assetModel.toUpperCase()}</td>
                  <td>{assignment.locationblock}</td>
                  <td>{assignment.locationroom}</td>
                  <td>{assignment.qty}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
