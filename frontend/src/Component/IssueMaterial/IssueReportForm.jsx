// IssueReportForm.jsx
import React, { useState } from 'react';
//import './IssueReportForm.css';

const IssueReportForm = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="report-form">
      <h2>Issue Report</h2>

      <div className="filter-tabs">
        {['All', 'Employee', 'Contractor', 'Production', 'Return To Vendor'].map((option) => (
          <button
            key={option}
            className={filter === option ? 'active' : ''}
            onClick={() => setFilter(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="form-row">
        <label>From Date:</label>
        <input type="date" />
      </div>

      <div className="form-row">
        <label>To Date:</label>
        <input type="date" />
      </div>

      {(filter === 'Employee' || filter === 'Contractor') && (
        <div className="form-row">
          <label>{filter} Name:</label>
          <input type="text" placeholder={`Enter ${filter} name`} />
        </div>
      )}

      {filter === 'Return To Vendor' && (
        <div className="form-row">
          <label>Vendor Name:</label>
          <input type="text" placeholder="Enter vendor name" />
        </div>
      )}

      <div className="form-row">
        <button className="submit-btn">Generate Report</button>
      </div>
    </div>
  );
};

export default IssueReportForm;
