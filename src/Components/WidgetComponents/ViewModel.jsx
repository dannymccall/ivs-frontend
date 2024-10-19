import React, { useState, useEffect, useRef } from "react";
import Header from "../WidgetComponents/Header";
import MyInput, { MyButton, MyLabel } from "../WidgetComponents/MyInput";
import { makeRequest, url } from "../../utils/make-request";
import "../../assets/css/add-asset.css";
import { showMessage } from "../WidgetComponents/message";
import { useNavigate } from "react-router-dom";
import CustomRepairerDropdown from "./CustomRepairDropdown";

export default function Modal({
  assetView,
  state,
  closeModal,
  setState,
  deleteAsset,
  editAsset,
  cb,
}) {
  const [asset, setAsset] = useState({
    assetName: "",
    assetType: "",
    assetCategory: "",
    manufacturer: "",
    model: "",
    purchaseDate: "",
    purchaseCost: "",
    condition: "",
    qty: 0,
  });

  const [showError, setShowError] = useState({ error: false, erorrMsg: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [repairers, setRepairers] = useState([]);
  const [stateOfasset, setStateOfasset] = useState("");
  const [selectedRepairer, setSelectedRepairer] = useState(null);
  const [successfullMessage, setSuccessfullMessage] = useState("");
  const [showSuccessFulMessage, setShowSuccessFulMessage] = useState(false);
  const [alreadyAssigned, setAlreadyAssigned] = useState({
    hasBeenAssigned: false,
    assignedData: [],
  });

  const dropRef = useRef(null);
  const divRef = useRef(null);
  const assetCategory = [
    { value: "electronics", label: "Electronics" },
    { value: "Furniture", label: "Furniture" },
    { value: "vehicle", label: "Vehicle" },
  ];

  const navigate = useNavigate();
  const assetConditon = [
    { value: "New", label: "New" },
    { value: "good", label: "Good" },
    { value: "fair", label: "Fair" },
    { value: "poor", label: "Poor" },
  ];
  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    if (
      state === "add" &&
      (asset.assetName === "" ||
        asset.assetType === "" ||
        asset.assetCategory === "" ||
        asset.manufacturer === "" ||
        asset.model === "" ||
        asset.purchaseDate === "" ||
        asset.purchaseCost === "" ||
        asset.condition === "")
    ) {
      setIsSubmitting(false);
      setShowError({
        ...showError,
        error: true,
        erorrMsg: "Please all fields are required",
      });
      return;
    }

    const data = await makeRequest(
      `${url}/assetsApi.php`,
      state === "edit" ? "PUT" : "POST",
      state === "edit" ? assetView : asset,
      state === "edit" ? "updateAsset" : "addAsset"
    );
    console.log(assetView);
    const { success, message } = data;
    if (success) {
      setIsSubmitting(false);
      showMessage("Hello", message, "success", "Okay", "", "", () => {
        cb();
      });
    }
  }

  async function handleRepair(value) {
    const data = await makeRequest(
      `${url}/repairersApi.php`,
      "POST",
      { ...value, ...assetView },
      "addRepair"
    );
    const { success, message } = data;
    if (success) {
      setShowSuccessFulMessage(true);
      setSuccessfullMessage(message);
    }
  }

  function handleSelect(repairer, length) {
    setSelectedRepairer(repairer);
    console.log(repairer);
  }

  function expandDropDown() {
    if (stateOfasset === "not functioning") {
      dropRef.current.classList.add("expand_drop_down");
    }
  }
  useEffect(() => {
    async function fetchRepairs() {
      const data = await makeRequest(
        `${url}/repairersApi.php`,
        "GET",
        "",
        "fetch_repairers"
      );
      const { repairers } = data;
      setRepairers(repairers);
      console.log(repairers);
      console.log(assetView);

      if (assetView && assetView.model) {
        const fetchAssignedRepairs = await makeRequest(
          `${url}/repairersApi.php?model=${assetView.model}`,
          "GET",
          "",
          "fetch-assigned-asset"
        );
        const { assignedAsset } = fetchAssignedRepairs;
        console.log(assignedAsset)
        if (assignedAsset) {
          setAlreadyAssigned({
            hasBeenAssigned: true,
            assignedData: assignedAsset,
          });
          console.log({ alreadyAssigned });
        } else {
          setAlreadyAssigned({ hasBeenAssigned: false, assignedData: [] });
        }
      }
    }
    fetchRepairs();
  }, [assetView]);

  return (
    <>
      <Header />
      <button
        className="closeModal"
        onClick={() => {
          setStateOfasset("");
          closeModal();
          setSuccessfullMessage("");
        }}
      >
        <img src={require("../../assets/close.png")} alt="" />
      </button>
      <div
        className="form-container"
        style={{
          background: "#fff",
          height: "70%",
          width: "70%",
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
          margin: "30px auto",
          overflow: "visible" /* Ensure the content is not clipped */,
        }}
      >
        <div className="form" style={{ width: "100%", height: "100%" }}>
          <form
            action=""
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              paddingTop: "32rem",
              alignItems: "center",
              background: "#F5F6FA",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "90%",
                overflow: "visible",
              }}
            >
              <p>
                {state === "add"
                  ? "Add Asset"
                  : state === "view"
                  ? "View Asset"
                  : state === "edit"
                  ? "Edit Asset"
                  : ""}
              </p>
              {state === "view" && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "12%",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    className="modalEditButton"
                    onClick={() => setState(assetView)}
                  >
                    <img src={require("../../assets/edit.png")} alt="" />
                  </button>

                  <button
                    className="modalDeleteButton"
                    onClick={() => deleteAsset(assetView)}
                  >
                    <img src={require("../../assets/delete.png")} alt="" />
                  </button>
                </div>
              )}
            </div>
            <div className="underline" style={{ marginTop: "10px" }}></div>
            {showError.error && <span>{showError.erorrMsg}</span>}
            <div className="form-input">
              <MyLabel
                className="label"
                labelType="asset name"
                labelName="Asset Name"
              />
            </div>
            <div className="form-input">
              <MyInput
                className="input"
                type="text"
                value={
                  state === "edit" || "view"
                    ? assetView.assetName
                    : state === "add"
                    ? asset.assetName
                    : ""
                }
                onChange={(e) => {
                  setShowError(false);
                  if (state === "edit") editAsset(e.target.value, "assetName");
                  else setAsset({ ...asset, assetName: e.target.value });
                }}
                disabled={
                  state === "view"
                    ? true
                    : state === "edit" || "add"
                    ? false
                    : ""
                }
                placeholder={"name"}
              />
            </div>
            <div className="form-input">
              <MyLabel
                className="label"
                labelType="asset category"
                labelName="Asset Category"
              />
            </div>
            <div className="form-input">
              <select
                className="option"
                value={
                  state === "edit" || "view"
                    ? assetView.assetCategory
                    : asset.assetCategory
                }
                onChange={(e) => {
                  setShowError(false);
                  if (state === "edit")
                    editAsset(e.target.value, "assetCategory");
                  else setAsset({ ...asset, assetCategory: e.target.value });
                }}
                disabled={
                  state === "view"
                    ? true
                    : state === "edit" && "add"
                    ? false
                    : ""
                }
                placeholder={"category"}
              >
                <option value="">Select Asset Category...</option>
                {assetCategory.map((category) => {
                  return (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-input">
              <MyLabel
                className="label"
                labelType="asset state"
                labelName="Asset state"
              />
            </div>
            {state === "view" ? (
              <div
                className="form-input"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <div className="form-input" style={{ position: "relative" }}>
                  <MyInput
                    className="input"
                    type="text"
                    value={assetView.state}
                    style={{ position: "relative", width: "100%" }}
                    disabled={true}
                    onChange={expandDropDown}
                  />
                </div>
                <div
                  className="state-color"
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor:
                      assetView.state === "functioning" ? "lightgreen" : "red",
                    position: "absolute",
                    left: "12rem",
                    marginTop: "10px",
                  }}
                ></div>
              </div>
            ) : (
              <div className="form-input">
                <select
                  className="option"
                  value={state === "edit" || "view" ? assetView.state : ""}
                  onChange={(e) => {
                    setShowError(false);
                    if (state === "edit") {
                      editAsset(e.target.value, "state");
                    } else setAsset({ ...asset, state: e.target.value });
                    setStateOfasset(e.target.value);
                  }}
                  disabled={
                    state === "view"
                      ? true
                      : state === "edit" &&
                        assetView.state === "not functioning"
                      ? true
                      : ""
                  }
                  placeholder={"category"}
                >
                  <option value="functioning">functioning</option>

                  <option value="not functioning">not functioning</option>
                </select>
              </div>
            )}
            {stateOfasset === "not functioning" && (
              <div className="form-input">
                <MyLabel
                  className="label"
                  labelType="assignAsset"
                  labelName="Assign for maintenance"
                />

                {/* Custom Dropdown for Repairers */}

                <CustomRepairerDropdown
                  repairers={repairers}
                  // selectedRepairer={selectedRepairer}
                  handleSelect={handleSelect}
                  dropRef={dropRef}
                  divRef={divRef}
                  handleRepair={handleRepair}
                  successfullMessage={successfullMessage}
                  showSuccessFulMessage={showSuccessFulMessage}
                />
              </div>
            )}
            { alreadyAssigned.assignedData[0] && alreadyAssigned.hasBeenAssigned &&
            alreadyAssigned.assignedData[0].status === "not done" ? (
              <h1 style={style}>
                Asset not functioning and has been assigned to{" "}
                <i style={{ fontWeight: "700" }}>
                  {alreadyAssigned.assignedData[0].repairer_name
                    ? alreadyAssigned.assignedData[0].repairer_name
                    :   <h1></h1>}
                </i>
              </h1>
            ) : (
              ""
           )}
            <div className="form-input">
              <MyLabel
                className="label"
                labelType="asset type"
                labelName="Asset Type"
              />
            </div>
            <div className="form-input">
              <select
                name=""
                id=""
                value={
                  state === "view" || "edit"
                    ? assetView.assetType
                    : asset.assetType
                }
                className="option"
                onChange={(e) => {
                  setShowError(false);
                  if (state === "edit") editAsset(e.target.value, "assetType");
                  else setAsset({ ...asset, assetType: e.target.value });
                }}
                disabled={
                  state === "view"
                    ? true
                    : state === "edit" && "add"
                    ? false
                    : ""
                }
                placeholder={"type"}
              >
                <option>Select Asset Type...</option>
                <option value="monitor">Monitor</option>
                <option value="keyboard">Keyboard</option>
                <option value="mouse">Mouse</option>
                <option value="pc">PC</option>
                <option value="desks">Desks</option>
              </select>
            </div>
            <div className="form-input">
              <MyLabel
                className="label"
                labelType="manufacturer"
                labelName="Manufacturer"
              />
            </div>
            <div className="form-input">
              <MyInput
                className="input"
                type="text"
                value={
                  state === "view" || "edit"
                    ? assetView.manufacturer
                    : asset.manufacturer
                }
                onChange={(e) => {
                  setShowError(false);
                  if (state === "edit")
                    editAsset(e.target.value, "manufacturer");
                  else setAsset({ ...asset, manufacturer: e.target.value });
                }}
                disabled={
                  state === "view"
                    ? true
                    : state === "edit" && "add"
                    ? false
                    : ""
                }
                placeholder={"manufacturer"}
              />
            </div>

            <div className="form-input">
              <MyLabel
                className="label"
                labelType="asset model"
                labelName="Asset Model"
              />
            </div>
            <div className="form-input">
              <MyInput
                className="input"
                type="text"
                value={
                  state === "view" || "edit" ? assetView.model : asset.model
                }
                onChange={(e) => {
                  setShowError(false);
                  if (state === "edit") editAsset(e.target.value, "model");
                  else setAsset({ ...asset, model: e.target.value });
                }}
                disabled={
                  state === "view"
                    ? true
                    : state === "edit" && "add"
                    ? false
                    : ""
                }
                placeholder={"model"}
              />
            </div>
            <div className="form-input">
              <MyLabel
                className="label"
                labelType="purchase date"
                labelName="Purchase Date"
              />
            </div>
            <div className="form-input">
              <MyInput
                className="input"
                type="date"
                value={
                  state === "view" || "edit"
                    ? assetView.purchaseDate
                    : asset.purchaseDate
                }
                min="1900-01-01"
                max="2024-12-31"
                onChange={(e) => {
                  setShowError(false);
                  if (state === "edit")
                    editAsset(e.target.value, "purchaseDate");
                  else setAsset({ ...asset, purchaseDate: e.target.value });
                }}
                disabled={
                  state === "view"
                    ? true
                    : state === "edit" && "add"
                    ? false
                    : ""
                }
                placeholder={"date of purchase"}
              />
            </div>
            <div className="form-input">
              <MyLabel
                className="label"
                labelType="purchase cost"
                labelName="Purchase Cost"
              />
            </div>
            <div className="form-input">
              <MyInput
                className="input"
                type="text"
                value={
                  state === "view" || "edit"
                    ? assetView.purchaseCost
                    : asset.purchaseCost
                }
                onChange={(e) => {
                  setShowError(false);
                  if (state === "edit")
                    editAsset(e.target.value, "purchaseCost");
                  else setAsset({ ...asset, purchaseCost: e.target.value });
                }}
                disabled={
                  state === "view"
                    ? true
                    : state === "edit" && "add"
                    ? false
                    : ""
                }
                placeholder={"cost"}
              />
            </div>
            <div className="form-input">
              <MyLabel
                className="label"
                labelType="condition"
                labelName="Condition"
              />
            </div>
            <div className="form-input">
              <select
                className="option"
                value={
                  state === "view" || "edit"
                    ? assetView.assetCondition
                    : asset.assetCondition
                }
                onChange={(e) => {
                  setShowError(false);
                  if (state === "edit")
                    editAsset(e.target.value, "assetCondition");
                  else setAsset({ ...asset, assetCondition: e.target.value });
                }}
                disabled={
                  state === "view"
                    ? true
                    : state === "edit" && "add"
                    ? false
                    : ""
                }
              >
                <option value="">Select Asset Condition...</option>
                {assetConditon.map((condition) => {
                  return (
                    <option key={condition.value} value={condition.value}>
                      {condition.label}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-input">
              <MyLabel className="label" labelType="qty" labelName="Quantity" />
            </div>
            <div className="form-input">
              <MyInput
                className="input"
                type="number"
                value={state === "view" || "edit" ? assetView.qty : asset.qty}
                onChange={(e) => {
                  setShowError(false);
                  if (state === "edit") editAsset(e.target.value, "qty");
                  else setAsset({ ...asset, qty: e.target.value });
                }}
                disabled={
                  state === "view"
                    ? true
                    : state === "edit" && "add"
                    ? false
                    : ""
                }
              />
            </div>
            <div className="form-input" style={{ marginTop: "10px" }}>
              {!isSubmitting && (
                <MyButton
                  buttonName={
                    state === "add"
                      ? "Submit"
                      : state === "edit"
                      ? "Update"
                      : "View"
                  }
                  type="button"
                  onClick={handleSubmit}
                  className={
                    state === "add"
                      ? "submitBtn"
                      : state === "edit"
                      ? "submitBtn"
                      : state === "view"
                      ? "disabled"
                      : ""
                  }
                  disabled={
                    state === "add" || state === "edit"
                      ? false
                      : state === "view"
                      ? true
                      : ""
                  }
                />
              )}
              {isSubmitting && (
                <MyButton
                  buttonName={"Looding..."}
                  type={"button"}
                  disabled={true}
                  className={"disabled"}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

const style = {
  fontSize: "0.9em",
  background: "#fff",
  padding: "10px",
  borderLeft: "5px solid green",
  borderRradius: "5px",
  fontWeight: 500,
  boxShadow: "0px 2px 3px 3px #e4e3e3",
  width: "90%",
  marginBottom: "20px",
};
