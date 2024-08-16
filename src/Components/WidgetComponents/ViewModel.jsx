import React, { useState } from "react";
import Header from "../WidgetComponents/Header";
import MyInput, { MyButton, MyLabel } from "../WidgetComponents/MyInput";
import { makeRequest, url } from "../../utils/make-request";
import "../../assets/css/add-asset.css";
import { showMessage } from "../WidgetComponents/message";
import { useNavigate } from "react-router-dom";

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

  return (
    <>
      <Header />
      <button className="closeModal" onClick={closeModal}>
        <img src={require("../../assets/close.png")} alt="" />
      </button>
      <div
        className="form-container"
        style={{ background: "#fff", paddingTop: "50px", height: "80%" }}
      >
        <div className="form">
          <div>
            <form action="">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "70%",
                  height: "30rem",
                  // justifyContent: "center",
                  flexWrap: "wrap",
                  alignSelf: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "90%",
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
                <div className="underline" style={{marginTop:'10px'}}></div>
                {showError.error && <span>{showError.erorrMsg}</span>}
                <div className="form-input">
                  <MyLabel
                    className="label"
                    labelType="asset name"
                    labelName="Asset Name"
                  />
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
                      if (state === "edit")
                        editAsset(e.target.value, "assetName");
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
                      else
                        setAsset({ ...asset, assetCategory: e.target.value });
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
                    labelType="asset type"
                    labelName="Asset Type"
                  />
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
                      if (state === "edit")
                        editAsset(e.target.value, "assetType");
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
                      else
                        setAsset({ ...asset, assetCondition: e.target.value });
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
                  <MyLabel
                    className="label"
                    labelType="qty"
                    labelName="Quantity"
                  />
                  <MyInput
                    className="input"
                    type="number"
                    value={
                      state === "view" || "edit" ? assetView.qty : asset.qty
                    }
                    onChange={(e) => {
                      setShowError(false);
                      if (state === "edit") editAsset(e.target.value, "qty");
                      else setAsset({ ...asset, qty: e.target.value });
                    }}
                    style={{ width: "53rem" }}
                  />
                </div>
                <div style={{marginTop:'10px'}}>
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
