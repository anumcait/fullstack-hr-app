import React, { useState } from "react";
import { FaDownload, FaPrint, FaSearch } from "react-icons/fa";
import './onDutyTable.css';
import OnDutyForm from "./OnDutyForm";
import OnDutyPreview from "./OnDutyPreview"; 

const OnDutyTable = () => {
  const [showForm, setShowForm] = useState(false);

  const data = [
    {
      sno: 1,
      movement_id: "MOV001",
      movement_date: "2025-06-28",
      empid: "143864",
      ename: "John Doe",
      unit: "A",
      division: "HR",
      designation: "Officer",
      reason_perm: "Hospital Visit",
      no_of_hrs: "2.00"
    }
  ];

  return (
    <div className="onduty-table-wrapper">
      <div className="onduty-table-header">
        <div className="onduty-table-title">On Duty List</div>
        <div className="onduty-table-icons">
          <FaDownload className="icon" title="Download" />
          <FaPrint className="icon" title="Print" />
        </div>
      </div>
<div className="onduty-table-container">
      <table className="onduty-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Movement ID</th>
            <th>Date</th>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Unit</th>
            <th>Division</th>
            <th>Designation</th>
            <th>Reason</th>
            <th>Hours</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.sno}>
              <td>{row.sno}</td>
              <td>{row.movement_id}</td>
              <td>{row.movement_date}</td>
              <td>{row.empid}</td>
              <td>{row.ename}</td>
              <td>{row.unit}</td>
              <td>{row.division}</td>
              <td>{row.designation}</td>
              <td>{row.reason_perm}</td>
              <td>{row.no_of_hrs}</td>
              <td className="preview-icon-cell">
                <a href="#" onClick={() => setShowForm(true)}><FaSearch size={18} color="#007bff" /></a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
</div>
      {showForm && <OnDutyPreview onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default OnDutyTable;
