import React, { useState, useEffect } from "react";
//import "../../App.css";
import Header from "../WidgetComponents/Header";
import MyInput, { MyLabel, MyButton } from "../WidgetComponents/MyInput";
import { makeRequest, url } from "../../utils/make-request";
import { useNavigate } from "react-router-dom";
import "../../assets/css/assign-asset.css";
import { showMessage } from "../WidgetComponents/message";

export default function AssignAsset() {
  const [showError, setShowError] = useState({ error: false, erorrMsg: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assetsDropDown, setAssetsDropDown] = useState([]);
  const [modelDropDown, setModelDropDown] = useState([]);
  const [assets, setAssets] = useState([]);
  const [locations, setLocations] = useState([]);
  const [locationDropDown, setLocationDropDown] = useState([]);
  const [locationRoom, setLocationRoom] = useState([]);
  const [assignment, setAssignment] = useState({
    locationBlock: "",
    locationRoom: "",
    assetName: "",
    assetModel: "",
    quantity: 0,
  });

  useEffect(() => {
    async function getAssets() {
      const data = await makeRequest(
        `${url}/assetsApi.php`,
        "GET",
        "",
        "getAssets"
      );

      const result = await makeRequest(
        `${url}/locationsApi.php`,
        "GET",
        "",
        "getLocations"
      );
      const { success, assets } = data;
      const { locations } = result;
      if (success) {
        setLocations(locations);
        setAssets(assets);
        for (let asset of assets) {
          if (!assetsDropDown.includes(asset.assetName))
            setAssetsDropDown([...assetsDropDown, asset.assetName]);
        }
        for (let location of locations) {
          if (!locationDropDown.includes(location.locationblock))
            setLocationDropDown([...locationDropDown, location.locationblock]);
        }
      }
    }

    getAssets();
  });

  function handleAssetChange(e) {
    setAssignment({ ...assignment, assetName: e.target.value });
    setModelDropDown(
      assets
        .map((item) => {
          if (item.assetName === e.target.value) {
            console.log(item.model);
            return item.model;
          }
        })
        .filter((value) => value !== undefined)
    );
  }

  function handleLocationBlock(e) {
    setAssignment({ ...assignment, locationBlock: e.target.value });
    setLocationRoom(
      locations
        .map((item) => {
          if (item.locationblock === e.target.value) {
            console.log(item.locationroom);
            return item.locationroom;
          }
        })
        .filter((value) => value !== undefined)
    );
  }
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    if (
      assignment.locationBlock === "" ||
      assignment.locationRoom === "" ||
      assignment.model === "" ||
      assignment.assetName === "" ||
      assignment.quantity === ""
    ) {
      setShowError({
        ...showError,
        error: true,
        erorrMsg: "Please we need all your credentials",
      });
      setIsSubmitting(false);
      return;
    } else setShowError(false);

    const data = await makeRequest(
      `${url}/assignmentsApi.php`,
      "POST",
      assignment,
      "assignAsset"
    );
    console.log(data);
    const { success, message } = data;
    console.log(data)
    if (!success) {
      setIsSubmitting(false);
      setShowError({
        ...showError,
        error: true,
        erorrMsg: message,
      });
      return;
    } else {
      setIsSubmitting(false);
      showMessage("Hello", message, "success", "Okay", "", "", () => {
        navigate("/auth/dashboard");
      });
    }
  }

  return (
    <>
      <div className="container">
        <Header />
        <div className="body">
          <div className="section">
            <div className="assign-form">
              <form action="">
                <p>Assign Asset</p>
                <img
                  src={require("../../assets/asset.png")}
                  alt=""
                  style={{ marginBottom: "1rem" }}
                />
                {showError.error && <span style={{color:'red', fontSize:'12px'}}>{showError.erorrMsg}</span>}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "20px",
                      }}
                    >
                      <MyLabel
                        labelType="asset"
                        labelName="Asset"
                        className={"label"}
                      />
                      <select
                        name=""
                        id=""
                        onChange={(e) => handleAssetChange(e)}
                      >
                        <option value="">select asset</option>

                        {assetsDropDown.map((asset) => {
                          return (
                            <option key={asset} value={asset}>
                              {asset}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "20px",
                      }}
                    >
                      <MyLabel
                        labelType="model"
                        labelName="Model"
                        className={"label"}
                      />
                      <select
                        name=""
                        id=""
                        onChange={(e) =>
                          setAssignment({
                            ...assignment,
                            assetModel: e.target.value,
                          })
                        }
                      >
                        <option value="">select model</option>
                        {modelDropDown.map((model) => {
                          return (
                            <option key={model} value={model}>
                              {model}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "20px",
                      }}
                    >
                      <MyLabel
                        labelType="location"
                        labelName="Location"
                        className={"label"}
                      />
                      <select
                        name=""
                        id=""
                        onChange={(e) => handleLocationBlock(e)}
                      >
                        <option value="">select location</option>
                        {locationDropDown.map((location) => {
                          return (
                            <option key={location} value={location}>
                              {location}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "20px",
                      }}
                    >
                      <MyLabel
                        labelType="room-number"
                        labelName="Room Number"
                        className={"label"}
                      />
                      <select
                        name=""
                        id=""
                        onChange={(e) =>
                          setAssignment({
                            ...assignment,
                            locationRoom: e.target.value,
                          })
                        }
                      >
                        <option value="">select room</option>
                        {locationRoom.map((room) => {
                          return (
                            <option key={room} value={room}>
                              {room}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
                      <MyLabel
                        labelType="qty"
                        labelName="Quantity"
                        className={"label"}
                      />
                    </div>
                    <MyInput
                      type="number"
                      value={assignment.quantity}
                      className="numberInput"
                      name="qty"
                      onChange={(e) => {
                        setShowError(false);
                        setAssignment({
                          ...assignment,
                          quantity: e.target.value,
                        });
                      }}
                      placeholder={"Quantity"}
                    />
                  </div>
                </div>
                {isSubmitting && (
                  <MyButton
                    type="button"
                    buttonName="Loading..."
                    className="disabled"
                    onClick={handleSubmit}
                    disabled={true}
                  />
                )}
                {!isSubmitting && (
                  <MyButton
                    type="button"
                    buttonName="Submit"
                    className="submitBtn"
                    onClick={handleSubmit}
                  />
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
