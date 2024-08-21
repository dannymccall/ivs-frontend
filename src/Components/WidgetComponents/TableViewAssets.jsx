import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { icons } from "../WidgetComponents/Icons";
import "../../App.css";
import { IoSearchSharp } from "react-icons/io5";

function TableViewAssets({
  assets,
  deleteAsset,
  viewAsset,
  editAsset,
  addNewAsset,
  searchFn,
}) {
  const navigate = useNavigate();
  const [showSearchIcon, setShowSearchIcon] = useState(true);

  function removeIcon() {
    setShowSearchIcon(false);
  }

  function showIcon() {
    setShowSearchIcon(true);
  }

  return (
    <>
      <div className="table-container">
        <div className="table-sub-container">
          <div className="search-div">
            <h1>Assets</h1>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <input
                className="search-input"
                placeholder="Search by asset name..."
                onChange={(e) => searchFn(e.target.value)}
                onFocus={removeIcon}
                onBlur={showIcon}
              />
              {showSearchIcon && (
                <IoSearchSharp
                  className="search-icon"
                  style={{
                    background: "#03071b",
                    color: "#fff",
                    padding: "10px",
                    position: "absolute",
                    marginLeft: "17rem",
                  }}
                  size={"40px"}
                />
              )}
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Asset Name</th>
                <th>Asset Type</th>
                <th>Manufacturer</th>
                <th>Model</th>
                <th>Purchase Date</th>
                <th>Purchase Cost</th>
                <th>Asset Category</th>
                <th>Asset Condition</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.length ? (
                assets.map((asset) => {
                  return (
                    <tr key={asset.id}>
                      <td>
                        {asset.assetName.charAt(0).toUpperCase() +
                          asset.assetName.slice(1).toLowerCase()}
                      </td>
                      <td>{asset.assetType}</td>
                      <td>{asset.manufacturer}</td>
                      <td>{asset.model}</td>
                      <td>{asset.purchaseDate}</td>
                      <td>{asset.purchaseCost}</td>
                      <td>{asset.assetCategory}</td>
                      <td>{asset.assetCondition}</td>
                      <td>{asset.qty}</td>
                      <td>
                        <div className="actions">
                          <button
                            className="viewBtn"
                            onClick={() => viewAsset(asset)}
                          >
                            <img src={require("../../assets/eye.png")} alt="" />
                          </button>
                          <button
                            className="editBtn"
                            onClick={() => editAsset(asset)}
                          >
                            <img
                              src={require("../../assets/edit.png")}
                              alt=""
                            />
                          </button>
                          <button
                            onClick={() => deleteAsset(asset)}
                            className="delBtn"
                          >
                            <img
                              src={require("../../assets/delete.png")}
                              alt=""
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    style={{ fontSize: "18px", textAlign: "center" }}
                    colSpan={10}
                  >
                    No assets available
                  </td>
                </tr>
              )}
              <td colSpan="9" className="addNewAssetBtn">
                <button onClick={() => navigate("/auth/add-asset")}>
                  Add asset
                </button>
              </td>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default TableViewAssets;
