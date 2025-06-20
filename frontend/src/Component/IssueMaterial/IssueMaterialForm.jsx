// IssueMaterialForm.jsx
import React, { useState } from 'react';
//import './IssueMaterialForm.css';

const IssueMaterialForm = () => {
  const [issueType, setIssueType] = useState('Employee');

  return (
    <div className="issue-form">
      <h2>Issue Material</h2>

      <div className="form-row">
        <label>Project:</label>
        <select><option>Select Project</option></select>
      </div>

      <div className="form-row">
        <label>Category:</label>
        <select><option>Select Category</option></select>
      </div>

      <div className="form-row">
        <label>Material:</label>
        <select><option>Select Material</option></select>
      </div>

      <div className="form-row">
        <label>Specification:</label>
        <select><option>Select Specification</option></select>
      </div>

      <div className="form-row">
        <label>Recommended By:</label>
        <input type="text" placeholder="Recommended by" />
      </div>

      <div className="form-row">
        <label>Approved By:</label>
        <input type="text" placeholder="Approved by" />
      </div>

      <div className="form-row">
        <label>Date:</label>
        <input type="date" />
      </div>

      <div className="issue-type-section">
        <label>Issue To:</label>
        <div className="radio-group">
          <label><input type="radio" value="Employee" checked={issueType === 'Employee'} onChange={() => setIssueType('Employee')} /> Employee</label>
          <label><input type="radio" value="Contractor" checked={issueType === 'Contractor'} onChange={() => setIssueType('Contractor')} /> Contractor</label>
          <label><input type="radio" value="Production" checked={issueType === 'Production'} onChange={() => setIssueType('Production')} /> Production</label>
        </div>
      </div>

      {issueType === 'Employee' && (
        <div className="form-row">
          <label>Employee Name:</label>
          <input type="text" placeholder="Enter name" />
        </div>
      )}

      {issueType === 'Contractor' && (
        <>
          <div className="form-row">
            <label>Contractor Name:</label>
            <input type="text" placeholder="Enter contractor name" />
          </div>
          <div className="form-row">
            <label>Work Order:</label>
            <input type="text" placeholder="Enter work order" />
          </div>
          <div className="form-row">
            <label>Type:</label>
            <div className="radio-group">
              <label><input type="radio" name="billingType" /> FOC</label>
              <label><input type="radio" name="billingType" /> Chargeable</label>
            </div>
          </div>
        </>
      )}

      {issueType === 'Production' && (
        <div className="form-row">
          <label>Location:</label>
          <input type="text" placeholder="Enter production location" />
        </div>
      )}

      <div className="form-row">
        <button className="submit-btn">Submit</button>
      </div>
    </div>
  );
};

export default IssueMaterialForm;
