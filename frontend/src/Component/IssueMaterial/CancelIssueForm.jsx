import React, { useState } from 'react';
import './CancelIssueForm.css';

const CancelIssueForm = () => {
  const [issueNumber, setIssueNumber] = useState('');
  const [reason, setReason] = useState('');

  return (
    <div className="cancel-issue-form">
      <h2>Cancel Issue</h2>

      <div className="form-row">
        <label>Issue Number:</label>
        <input
          type="text"
          value={issueNumber}
          onChange={(e) => setIssueNumber(e.target.value)}
          placeholder="Enter Issue Number"
        />
      </div>

      <div className="form-row">
        <label>Reason for Cancellation:</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter reason"
          rows="4"
        />
      </div>

      <div className="form-row">
        <button className="submit-btn">Cancel Issue</button>
      </div>
    </div>
  );
};

export default CancelIssueForm;
