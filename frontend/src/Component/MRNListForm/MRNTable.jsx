// import React from "react";
import React, { useState } from "react";
import { FaDownload, FaPrint } from "react-icons/fa";
import "./MRNTable.css";
import MRNGenerate from "./MRNGenerate";
import MRNDetail from "./MRNDetail";
import MRNVendor from "./MRNVendor";
import MRNPreview from "./MRNPreview";


const MRNTable = () => {
      const [showPopup, setShowPopup] = useState(false);
       const [showDetail, setShowDetail] = useState(false);

  const data = [
    {
      sno: 1,
      indentCode: "TD/INN/250610/1",
      poCode: "DIZZ/PO/24-25/6/49",
      vendor: "A AHMEDALLY & CO.PVT LTD",
      poAmount: "410,640.00",
      dispatchDate: "10 Jun 2025",
      dispatchType: "By Hand",
      dispatchedTo: "GOPI",
      sender: "Mr. GOPI RAVURI"
    }
  ];

  return (
    <div className="mrn-table-wrapper">
      {/* Header above the table */}
      <div className="mrn-table-header">
        <div className="mrn-table-title">MRN LIST</div>
        <div className="mrn-table-icons">
          <FaDownload className="icon" title="Download" />
          <FaPrint className="icon" title="Print" />
        </div>
      </div>

      {/* Actual table */}
      <table className="mrn-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>PO</th>
            <th>MRN</th>
            <th>Detail</th>
            <th>Indent Code</th>
            <th>PO Code</th>
            <th>Vendor</th>
            <th>PO Amount</th>
            <th>Dispatch Date</th>
            <th>Dispatch Type</th>
            <th>Dispatched To</th>
            <th>Sender Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.sno}>
              <td>{row.sno}</td>
              <td><a href="/mrn-preview">Preview</a></td>
              {/* <td><a href="#">Generate</a></td> */}
               <td><a href="/mrn-generator" onClick={() => setShowPopup(true)}>Generate</a></td>
              <td><a href="/mrn-detail">Detail</a></td>
              <td>{row.indentCode}</td>
              <td>{row.poCode}</td>
              {/* <td>{row.vendor}</td> */}
              <td><a href="/mrn-vendor">{row.vendor}</a></td>
              <td>{row.poAmount}</td>
              <td>{row.dispatchDate}</td>
              <td>{row.dispatchType}</td>
              <td>{row.dispatchedTo}</td>
              <td>{row.sender}</td>
            </tr>
          ))}
        </tbody>
      </table>
        {showDetail && (
        <MRNDetail onClose={() => setShowDetail(false)} />
      )}
        {showPopup && <MRNGenerate onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default MRNTable;
