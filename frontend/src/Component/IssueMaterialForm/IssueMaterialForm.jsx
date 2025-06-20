import React, { useState } from "react";
import IssueMaterialContractorForm from './IssueMaterialContractor';
import IssueReportForm from './IssueReport';
import CancelIssueForm from './CancelIssue';
import './IssueMaterialForm.css';
import Header from "../Partials/Header";
import Footer from "../Partials/Footer";
import ChatBotIcon from "../ChatBot/ChatBotIcon";

const IssueMaterialForm = () => {
  const [activeTab, setActiveTab] = useState('issue');

  const getTitle = () => {
    switch (activeTab) {
      case 'issue': return 'ISSUE MATERIAL';
      case 'report': return 'ISSUE REPORT';
      case 'cancel': return 'CANCEL ISSUE';
      default: return '';
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'issue':
        return <IssueMaterialContractorForm />;
      case 'report':
        return <IssueReportForm />;
      case 'cancel':
        return <CancelIssueForm />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="issue-container">
        <div className="issue-section">
          <div className="issue-header">
            <span>{getTitle()}</span>
            <div className="action-buttons">
              <button
                className={activeTab === 'issue' ? 'btn primary active' : 'btn primary'}
                onClick={() => setActiveTab('issue')}
              >
                ISSUE MATERIAL
              </button>
              <button
                className={activeTab === 'report' ? 'btn primary active' : 'btn primary'}
                onClick={() => setActiveTab('report')}
              >
                ISSUE REPORT
              </button>
              <button
                className={activeTab === 'cancel' ? 'btn primary active' : 'btn primary'}
                onClick={() => setActiveTab('cancel')}
              >
                CANCEL ISSUE
              </button>
              
              {/* ✅ Close only for report or cancel */}
              {(activeTab === 'report' || activeTab === 'cancel') && (
                <button
                  className="btn close-btn"
                  onClick={() => setActiveTab('issue')} // Or set to null if you want to clear all
                >
                  ❌ Close
                </button>
              )}
            </div>
          </div>

          <div className="tab-content">{renderForm()}</div>
        </div>
      </div>
      <Footer />
      <ChatBotIcon />
    </>
  );
};

export default IssueMaterialForm;
