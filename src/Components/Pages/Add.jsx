import React, { useState } from "react";
import Header from "../WidgetComponents/Header";
import MyInput, { MyButton, MyLabel } from "../WidgetComponents/MyInput";
import { makeRequest, url } from "../../utils/make-request";
import "../../assets/css/add-asset.css";
import { showMessage } from "../WidgetComponents/message";
import { useNavigate } from "react-router-dom";

export default function Add() {
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
    { value: "other", label: "Other" },
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
    console.log(asset);
    setIsSubmitting(true);
    if (
      asset.assetName === "" ||
      asset.assetType === "" ||
      asset.assetCategory === "" ||
      asset.manufacturer === "" ||
      asset.model === "" ||
      asset.purchaseDate === "" ||
      asset.purchaseCost === "" ||
      asset.condition === "" ||
      asset.qty === ""
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
      "POST",
      asset,
      "addAsset"
    );
    const { success, message } = data;
    if (success) {
      showMessage("Hello", message, "success", "Okay", "", "", () => {
        navigate("/auth/dashboard");
      });
    }
  }

  return (
    <>
      <Header />
      <div className="form-container">
        <div style={{ alignSelf: "flex-start", marginLeft: "200px" }}>
          <p>Add Asset</p>
        </div>
        <div className="form">
          <form action="">
            <div
              style={{
                width: "100%",
                textAlign: "center",
                marginBlock: "10px",
              }}
            >
              {showError.error && <span>{showError.erorrMsg}</span>}
            </div>
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
                value={asset.assetName}
                onChange={(e) => {
                  setShowError(false);
                  setAsset({ ...asset, assetName: e.target.value });
                }}
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
                value={asset.assetCategory}
                onChange={(e) => {
                  setShowError(false);
                  setAsset({ ...asset, assetCategory: e.target.value });
                }}
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
            </div>
            <div className="form-input">
              <select
                name=""
                id=""
                value={asset.assetType}
                className="option"
                onChange={(e) => {
                  setShowError(false);
                  setAsset({ ...asset, assetType: e.target.value });
                }}
              >
                <option>Select Asset Type...</option>
                <option value="monitor">Monitor</option>
                <option value="keyboard">Keyboard</option>
                <option value="mouse">Mouse</option>
                <option value="pc">PC</option>
                <option value="desks">Desks</option>
                <option value="other">Other</option>
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
                value={asset.manufacturer}
                onChange={(e) => {
                  setShowError(false);
                  setAsset({ ...asset, manufacturer: e.target.value });
                }}
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
                value={asset.model}
                onChange={(e) => {
                  setShowError(false);
                  setAsset({ ...asset, model: e.target.value });
                }}
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
                value={asset.purchaseDate}
                min="1900-01-01"
                max="2024-12-31"
                onChange={(e) => {
                  setShowError(false);
                  setAsset({ ...asset, purchaseDate: e.target.value });
                }}
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
                value={asset.purchaseCost}
                onChange={(e) => {
                  setShowError(false);
                  setAsset({ ...asset, purchaseCost: e.target.value });
                }}
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
                value={asset.condition}
                onChange={(e) => {
                  setShowError(false);
                  setAsset({ ...asset, condition: e.target.value });
                }}
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
                value={asset.qty}
                onChange={(e) => {
                  setShowError(false);
                  setAsset({ ...asset, qty: e.target.value });
                }}
              />
            </div>
            <div className="form-input" style={{ marginTop: "20px" }}>
              {!isSubmitting && (
                <MyButton
                  buttonName="Submit"
                  type="button"
                  onClick={handleSubmit}
                  className="submitBtn"
                />
              )}

              {isSubmitting && (
                <MyButton
                  buttonName={isSubmitting ? "Loading..." : "Submit"}
                  type="button"
                  onClick={handleSubmit}
                  className="disabled"
                  disabled={true}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
