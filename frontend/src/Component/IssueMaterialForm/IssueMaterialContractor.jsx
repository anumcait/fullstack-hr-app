import React, { useState } from "react";
import './IssueMaterialContractor.css';

const IssueMaterialContractorForm = () => {
  const [userType, setUserType] = useState("Employee");
  const [chargeType, setChargeType] = useState("Chargeable");

  return (
    <>
      {/* Row 1 */}
      <div className="form-row">
        <div className="form-field">
          <label>Project*</label>
          <select><option>-Select-</option></select>
        </div>
        <div className="form-field">
          <label>Category</label>
          <select><option>-All-</option></select>
        </div>
        <div className="form-field">
          <label>Material</label>
          <select><option>-All-</option></select>
        </div>
        <div className="form-field">
          <label>Specification</label>
          <select><option>-All-</option></select>
        </div>
        <div className="form-field">
          <label>Specification Code</label>
          <input type="text" />
        </div>
        <div className="form-field">
          <label>Recommended By*</label>
          <select><option>-Select-</option></select>
        </div>
      </div>

      {/* Row 2 */}
      <div className="form-row">
        <div className="form-field">
          <label>Approved By*</label>
          <select><option>-Select-</option></select>
        </div>
        <div className="form-field">
          <label>Issue Date*</label>
          <input type="date" defaultValue="2025-06-09" />
        </div>

        {/* User Type Tabs */}
        <div className="form-field tabs">
          <label>User Type</label>
          <div className="tab-group">
            {["Employee", "Contractor", "Production"].map((type) => (
              <button
                key={type}
                className={`tab-button ${userType === type ? "active" : ""}`}
                onClick={() => setUserType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="form-field">
          <label>&nbsp;</label>
          <select><option>-Select-</option></select>
        </div>

         {/* Conditional fields for Contractor only */}
          {userType === 'Contractor' && (
            <>
              <div className="form-field tabs">
                <label>Charge Type</label>
                <div className="tab-group">
                  {["FOC", "Chargeable"].map((type) => (
                    <button
                      key={type}
                      className={`tab-button ${chargeType === type ? "active" : ""}`}
                      onClick={() => setChargeType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-field">
                <label>Work Order</label>
                <select><option>-Select-</option></select>
              </div>
            </>
          )}

        <div className="form-field go-button-wrapper">
          <label>&nbsp;</label>
          <button className="go-btn">🔍 GO</button>
        </div>
      </div>
    </>
  );
};

export default IssueMaterialContractorForm;
