import { useState } from "react";
import { showMessage } from "./message";
import { makeRequest } from "../../utils/make-request";

const CustomRepairerDropdown = ({
  repairers,
  handleSelect,
  dropRef,
  divRef,
  handleRepair,
  successfullMessage,
  showSuccessFulMessage,
}) => {
  const [selectedRepairer, setSelectedRepairer] = useState("");
  const [showAssignBtn, setShowAssignBtn] = useState(false);
  const [randomRepairer, setRandomRepairer] = useState("");

  console.log({ successfullMessage });
  function handleSelectedRepairer(repairer) {
    setSelectedRepairer(repairer.repairer_name);
  }

  async function handleAllSelect(repairer) {
    if (repairer.availability === "busy") {
      await showMessage(
        "Hello",
        "This repairer is busy with other assets",
        "warning",
        "Yes Assign",
        true,
        "#d33",
        () => {
          handleSelectedRepairer(repairer);
          handleSelect(repairer);
          setShowAssignBtn(true);
          setRandomRepairer(repairer);
        }
      );
      return;
    }
    setRandomRepairer(repairer);
    handleSelectedRepairer(repairer);
    handleSelect(repairer);
    setShowAssignBtn(true);
  }
  return (
    <div className="custom-select" ref={dropRef}>
      {successfullMessage.length === 0 ? (
        <>
          <div className="selected-item">
            <p style={{ fontSize: "1em" }}>
              {selectedRepairer || "Select Repairer"}
            </p>

            {showAssignBtn && (
              <>
                <button
                  id="assign-btn"
                  onClick={() => handleRepair(randomRepairer)}
                  type="button"
                >
                  Assign
                </button>
                <button
                  id="change-btn"
                  onClick={() => {
                    setShowAssignBtn(false);
                    setSelectedRepairer("");
                  }}
                >
                  <i>change</i>{" "}
                </button>
              </>
            )}
          </div>
          {!selectedRepairer && (
            <div className="dropdown-items" ref={divRef}>
              {repairers.map((repairer) => (
                <div
                  key={repairer.id}
                  className="dropdown-item"
                  onClick={() => handleAllSelect(repairer)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                >
                  <span>{repairer.repairer_name}</span>
                  <p
                    style={{
                      color:
                        repairer.availability === "available" ? "green" : "red",
                      fontSize: "1em",
                    }}
                  >
                    {repairer.availability}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="success">{successfullMessage}</p>
      )}
    </div>
  );
};

export default CustomRepairerDropdown;
