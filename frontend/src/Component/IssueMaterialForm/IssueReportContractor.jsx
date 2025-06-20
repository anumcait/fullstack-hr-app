// import React, { useState } from "react";
// import './IssueReportContractor.css'; // Optional, if you use separate CSS

// const IssueReportContractor = () => {
//   const [userType, setUserType] = useState("Contractor");
//   const [chargeType, setChargeType] = useState("Chargeable");

//   return (
//     <div className="issue-container">
//       <div className="issue-section">
//         <div className="issue-header">
//           <span>ISSUE REPORT</span>
//           <div className="header-buttons">
//             <button className="btn primary">ISSUE MATERIAL</button>
//             <button className="btn">ISSUE REPORT</button>
//             <button className="btn">CANCEL ISSUE</button>
//           </div>
//         </div>

//         {/* Row 1 */}
//         <div className="form-row">
//           <div className="form-field">
//             <label>Project*</label>
//             <select><option>-Select-</option></select>
//           </div>
//           <div className="form-field">
//             <label>Category</label>
//             <select><option>-All-</option></select>
//           </div>
//           <div className="form-field">
//             <label>Material</label>
//             <select><option>-All-</option></select>
//           </div>
//           <div className="form-field">
//             <label>Specification</label>
//             <select><option>-All-</option></select>
//           </div>
//           <div className="form-field">
//             <label>Specification Code</label>
//             <input type="text" />
//           </div>
//         </div>

//         {/* User Type Tabs */}
//         <div className="form-field tabs">
//           <label>User Type</label>
//           <div className="tab-group">
//             {["All", "Employee", "Contractor", "Production", "Return to Vendor"].map((type) => (
//               <button
//                 key={type}
//                 type="button"
//                 className={`tab-button ${userType === type ? "active" : ""}`}
//                 onClick={() => setUserType(type)}
//               >
//                 {type}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Row 2 */}
//         <div className="form-row">
//           <div className="form-field">
//             <label></label>
//             <select><option>All</option></select>
//           </div>
//           <div className="form-field">
//             <label>Location</label>
//             <select><option>All</option></select>
//           </div>
//           <div className="form-field">
//             <label>Block</label>
//             <select><option>All</option></select>
//           </div>
//           <div className="form-field">
//             <label>Floor</label>
//             <select><option>All</option></select>
//           </div>
//           <div className="form-field">
//             <label>Unit</label>
//             <input type="text" />
//           </div>
          
//           {/* Charge Type Tabs */}
//           <>
//           {userType === 'Contractor' && (
//           <div className="form-field tabs">
//             <label>Charge Type</label>
//             <div className="tab-group">
//               {["FOC", "Chargeable"].map((type) => (
//                 <button
//                   key={type}
//                   type="button"
//                   className={`tab-button ${chargeType === type ? "active" : ""}`}
//                   onClick={() => setChargeType(type)}
//                 >
//                   {type}
//                 </button>
//               ))}
//             </div>
//           </div>
//           )}
//           </>
//           <div className="form-field">
//             <label>From Date*</label>
//             <input type="date" defaultValue="2025-06-10" />
//           </div>
//           <div className="form-field">
//             <label>To Date*</label>
//             <input type="date" />
//           </div>
//           <div className="form-field go-button-wrapper">
//             <label>&nbsp;</label>
//             <button className="go-btn">🔍 GO</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IssueReportContractor;
import React, { useState } from "react";
import './IssueReportContractor.css';

const IssueReportContractor = ({ setUserType }) => {
  const [chargeType, setChargeType] = useState("Chargeable");

  return (
    <>
      <div className="form-field tabs">
        <label>User Type</label>
        <div className="tab-group">
          {["All", "Employee", "Contractor", "Production", "Return to Vendor"].map((type) => (
            <button
              key={type}
              className={`tab-button ${type === "Contractor" ? "active" : ""}`}
              onClick={() => setUserType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Contractor-specific fields */}
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

      <div className="form-row">
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

export default IssueReportContractor;
