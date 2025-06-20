// import React, { useState } from "react";
// import './IssueReport.css'

// const IssueReport = () => {
//   const [userType, setUserType] = useState("Contractor");

//   return (
//     <>
//       <div className="form-row">
//         <div className="form-field">
//           <label>Project*</label>
//           <select><option>-Select-</option></select>
//         </div>
//         <div className="form-field">
//           <label>Category</label>
//           <select><option>-All-</option></select>
//         </div>
//         <div className="form-field">
//           <label>Material</label>
//           <select><option>-All-</option></select>
//         </div>
//         <div className="form-field">
//           <label>Specification</label>
//           <select><option>-All-</option></select>
//         </div>
//         <div className="form-field">
//           <label>Specification Code</label>
//           <input type="text" />
//         </div>
//       </div>

//       <div className="form-field tabs">
//         <label>User Type</label>
//         <div className="tab-group">
//           {["All", "Employee", "Contractor", "Production", "Return to Vendor"].map((type) => (
//             <button
//               key={type}
//               className={`tab-button ${userType === type ? "active" : ""}`}
//               onClick={() => setUserType(type)}
//             >
//               {type}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="form-row">
//         <div className="form-field">
//           <label></label>
//           <select><option>All</option></select>
//         </div>
//         <div className="form-field">
//           <label>Location</label>
//           <select><option>All</option></select>
//         </div>
//         <div className="form-field">
//           <label>Block</label>
//           <select><option>All</option></select>
//         </div>
//         <div className="form-field">
//           <label>Floor</label>
//           <select><option>All</option></select>
//         </div>
//         <div className="form-field">
//           <label>Unit</label>
//           <input type="text" />
//         </div>
//         <div className="form-field">
//           <label>From Date*</label>
//           <input type="date" defaultValue="2025-06-10" />
//         </div>
//         <div className="form-field">
//           <label>To Date*</label>
//           <input type="date" />
//         </div>
//         <div className="form-field go-button-wrapper">
//           <label>&nbsp;</label>
//           <button className="go-btn">🔍 GO</button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default IssueReport;
import React, { useState } from "react";
import './IssueReport.css';

const IssueReportForm = () => {
  const [userType, setUserType] = useState("All");
  const [chargeType, setChargeType] = useState("FOC");

  return (
    <>
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
      </div>

      {/* Tabs */}
      <div className="form-field tabs">
        <label>User Type</label>
        <div className="tab-group">
          {["All", "Employee", "Contractor", "Production", "Return to Vendor"].map((type) => (
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

      {/* Contractor-only fields */}
      {userType === "Contractor" && (
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
      )}

      {/* Continue showing shared fields */}
      <div className="form-row">
        <div className="form-field"><label></label><select><option>All</option></select></div>
        <div className="form-field"><label>Location</label><select><option>All</option></select></div>
        <div className="form-field"><label>Block</label><select><option>All</option></select></div>
        <div className="form-field"><label>Floor</label><select><option>All</option></select></div>
        <div className="form-field"><label>Unit</label><input type="text" /></div>
        <div className="form-field"><label>From Date*</label><input type="date" /></div>
        <div className="form-field"><label>To Date*</label><input type="date" /></div>
        <div className="form-field go-button-wrapper">
          <label>&nbsp;</label>
          <button className="go-btn">🔍 GO</button>
        </div>
      </div>
    </>
  );
};

export default IssueReportForm;

