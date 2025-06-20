// IssueMaterialModule.jsx
import React, { useState } from 'react';
import IssueMaterialForm from './IssueMaterialForm';
import IssueReportForm from './IssueReportForm';
import CancelIssueForm from './CancelIssueForm';
import './IssueMaterialModule.css';

const IssueMaterialModule = () => {
  const [activeTab, setActiveTab] = useState('issue');

  return (
    <div className="issue-material-container">
      <div className="tab-header">
        <button
          className={activeTab === 'issue' ? 'active' : ''}
          onClick={() => setActiveTab('issue')}
        >
          ISSUE MATERIAL
        </button>
        <button
          className={activeTab === 'report' ? 'active' : ''}
          onClick={() => setActiveTab('report')}
        >
          ISSUE REPORT
        </button>
        <button
          className={activeTab === 'cancel' ? 'active' : ''}
          onClick={() => setActiveTab('cancel')}
        >
          CANCEL ISSUE
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'issue' && <IssueMaterialForm />}
        {activeTab === 'report' && <IssueReportForm />}
        {activeTab === 'cancel' && <CancelIssueForm />} 
      </div>
    </div>
  );
};

export default IssueMaterialModule;
