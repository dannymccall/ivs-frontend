import React, { useState } from "react";
import "../../App.css";
import { icons } from "../WidgetComponents/Icons";

export default function RepairersTable({ assets, handleUpdateRepairState }) {
  const [showUpdateOptions, setShowUpdateOptions] = useState(false);
  const [showUpdateBtn, setShowUpdateBtn] = useState(false);
  const [updateValue, setUpdateValue] = useState("");
  return (
    <>
      <div className="table-container">
        <div className="table-sub-container">
          <table>
            <thead>
              <tr>
                <th>Asset Name</th>
                <th>Asset Model</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.length > 0 ? (
                assets.map((asset) => {
                  return (
                    <tr key={asset.id} style={{ height: "40px" }}>
                      <td>
                        {asset.assetName.charAt(0).toUpperCase() +
                          asset.assetName.slice(1).toLowerCase()}
                      </td>
                      <td>{asset.assetModel.toUpperCase()}</td>

                      {showUpdateOptions ? (
                        <td>
                          <select
                            name=""
                            id=""
                            style={{
                              width: "50%",
                              height: "2rem",
                              border: "none",
                              fontFamily: "Arial, Helvetica, sans-serif",
                              cursor: "pointer",
                            }}
                            value={updateValue}
                            onChange={(e) => {
                              asset.status !== e.target.value
                                ? setShowUpdateBtn(true)
                                : setShowUpdateBtn(false);
                              setUpdateValue(e.target.value);
                            }}
                          >
                            <option>Update progress</option>
                            <option value="done">done</option>
                            <option value="not done">not done</option>
                          </select>
                          {showUpdateBtn &&
                            asset.status !== updateValue &&
                            updateValue !== "Update progress" && (
                              <button
                                className="update-state-asset"
                                onClick={() =>
                                  handleUpdateRepairState(updateValue, asset)
                                }
                              >
                                UPDATE
                              </button>
                            )}
                        </td>
                      ) : (
                        <td>{asset.status}</td>
                      )}

                      <button
                        className="editBtn"
                        style={{
                          background: "transparent",
                          border: "none",
                          marginTop: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => setShowUpdateOptions(!showUpdateOptions)}
                      >
                        <img src={require("../../assets/edit.png")} alt="" />
                      </button>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    style={{ fontSize: "18px", textAlign: "center" }}
                  >
                    No assignments for you
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
