import React, { useState, useEffect, useRef } from "react";
import TableViewAssets from "../WidgetComponents/TableViewAssets";
import { makeRequest, url } from "../../utils/make-request";
import Header from "../WidgetComponents/Header";
import { showMessage } from "../WidgetComponents/message";
import Swal from "sweetalert2";
import Modal from "../WidgetComponents/ViewModel";
import AssignmentsTabaleView from "../WidgetComponents/AassignmentsTableView";

export default function AssignmenetsView() {
  const [assignments, setAssignments] = useState([]);
  const [asset, setAsset] = useState({});
  const [state, setState] = useState("");

  const divRef = useRef(null);

  useEffect(() => {
    async function getAssignments() {
      const data = await makeRequest(
        `${url}/assignmentsApi.php`,
        "GET",
        "",
        "getAssignments"
      );
      const { success, assignments } = data;
      if (success) {
        setAssignments(assignments);
      }
    }
    getAssignments();
  });

  function closeModal() {
    divRef.current.classList.remove("popup");
    setAsset({});
     setState("");
  }

  function setFormSate(item) {
    setState("edit");
    setAsset(item);
    console.log({state})
  }

  function addNewAsset(){
    setState("add");
    divRef.current.classList.add("popup");
    console.log({state})

  }
  function editButton(item){
    divRef.current.classList.add("popup");
    setState("edit");
    setAsset(item)
    console.log({state})
  }

  const updateProperty = (key, value) => {
    setAsset((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  function editAsset(text, property) {
    updateProperty(property, text);
    console.log({ property });
    console.log({ asset });
  }

  async function viewAsset(item) {
    // console.log(item);
    divRef.current.classList.add("popup");
    setState("view");
    setAsset(item);
    console.log(asset);
  }
  async function deleteAsset(item) {
    showMessage(
      "Are you sure",
      "You won't be able to revert this",
      "warning",
      "Yes, delete it",
      true,
      "#d33",
      async () => {
        const data = await makeRequest(
          `${url}/assetsApi.php?id=${item.id}`,
          "DELETE",
          {},
          "deleteAsset"
        );
        const { success, message } = data;
        if (success) {
          Swal.fire({
            title: "Hello",
            text: message,
            icon: "success",
            confirmButtonText: "Okay",
          });
        }
      }
    );
  }
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
        <AssignmentsTabaleView
          assignments={assignments}
          deleteAsset={deleteAsset}
          viewAsset={viewAsset}
          editAsset={editButton}
          addNewAsset={addNewAsset}
        />
      </div>

      <div ref={divRef} className="view-container">
        <Modal
          assetView={asset}
          closeModal={closeModal}
          state={state}
          setState={setFormSate}
          deleteAsset={deleteAsset}
          editAsset={editAsset}
          cb={closeModal}
        />
      </div>
    </>
  );
}
