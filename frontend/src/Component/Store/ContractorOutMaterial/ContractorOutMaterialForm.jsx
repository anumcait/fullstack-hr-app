import React, { useState } from 'react';
import './ContractorOutMaterialForm.css'
import Header from '../../Partials/Header';
import Footer from '../../Partials/Footer';
import ChatBotIcon from '../../ChatBot/ChatBotIcon';

const ContractorOutComponent = () => {
  const [showMaterialForm, setShowMaterialForm] = useState(false);

  const handleNewClick = () => setShowMaterialForm(true);
  const handleCloseClick = () => setShowMaterialForm(false);

  return (
    <>
    <Header/>
    <div className="contractor-container">
      <div className="contractor-header">
        <div className="contractor-title">
          {showMaterialForm ? 'CONTRACTOR OUT MATERIAL' : 'CONTRACTOR OUT REPORT'}
        </div>
        <div className="contractor-buttons">
          {!showMaterialForm && <button onClick={handleNewClick}>View</button>}
          <button>VIEW</button>
          {showMaterialForm && <button onClick={handleCloseClick}>New</button>}
        </div>
      </div>

      {!showMaterialForm ? (
        <form className="contractor-form">
          <div className="contractor-row">
            {['Project', 'Category', 'Material', 'Specification'].map((label, idx) => (
              <div key={idx} className="contractor-group">
                <label>{label}{label === 'Project' && <span className="required">*</span>}</label>
                <select><option>{label === 'Project' ? '-Select-' : '-All-'}</option></select>
              </div>
            ))}
            <div className="contractor-group">
              <label>Specification Code</label>
              <input type="text" />
            </div>
            <div className="contractor-group">
              <label>Contractor</label>
              <select><option>-All-</option></select>
            </div>
            <div className="contractor-group go-btn-group">
              <button type="submit" className="go-button">🔍 GO</button>
            </div>
          </div>
        </form>
      ) : (
        <form className="contractor-form">
          <div className="contractor-row">
            {['Project', 'Category', 'Material', 'Specification', 'Specification Code', 'Contractor'].map((label, idx) => (
              <div key={idx} className="contractor-group">
                <label>{label}{(label === 'Project' || label === 'Contractor') && <span className="required">*</span>}</label>
                {label === 'Specification Code' ? <input type="text" /> : <select><option>-Select-</option></select>}
              </div>
            ))}
          </div>
          <div className="contractor-row">
            <div className="contractor-group">
              <label>Out Date<span className="required">*</span></label>
              <input type="date" />
            </div>
            <div className="contractor-group">
              <label>Recommended By</label>
              <select><option>-Select-</option></select>
            </div>
            <div className="contractor-group">
              <label>Approve By<span className="required">*</span></label>
              <select><option>-Select-</option></select>
            </div>
            <div className="contractor-group go-btn-group">
              <button type="submit" className="go-button">🔍 GO</button>
            </div>
          </div>
        </form>
      )}
    </div>
    <Footer/>
    <ChatBotIcon/>
    </>
  );
};

export default ContractorOutComponent;
