import React, { useState } from 'react';
import './ContractorStockForm.css';
import Header from '../../Partials/Header';
import Footer from '../../Partials/Footer';
import ChatBotIcon from '../../ChatBot/ChatBotIcon';

const ContractorStockForm = () => {
  const [type, setType] = useState('Detail');

  return (
    <>
      <Header />
      <div className="cs-container">
        <div className='cs-main'>
          <div className="cs-header">CONTRACTOR STOCK</div>
          <div className="cs-row">
            <div className="cs-group">
              <label>Project<span className="required">*</span></label>
              <select>
                <option>-Select-</option>
              </select>
            </div>
            <div className="cs-group">
              <label>Contractor</label>
              <select>
                <option>-All-</option>
              </select>
            </div>
            <div className="cs-group">
              <label>Category</label>
              <select>
                <option>-All-</option>
              </select>
            </div>
            <div className="cs-group">
              <label>Material</label>
              <select>
                <option>-All-</option>
              </select>
            </div>
            <div className="cs-group">
              <label>Specification</label>
              <select>
                <option>-All-</option>
              </select>
            </div>
            <div className="cs-group date-group">
              <label>Period<span className="required">*</span></label>
              <div className="date-range">
                <input type="date" />
                <span> - </span>
                <input type="date" />
              </div>
            </div>
            <div className="cs-group type-group">
              <label>Type</label>
              <div className="type-toggle">
                <button
                  className={type === 'Summary' ? 'active' : ''}
                  onClick={() => setType('Summary')}
                >
                  Summary
                </button>
                <button
                  className={type === 'Detail' ? 'active' : ''}
                  onClick={() => setType('Detail')}
                >
                  Detail
                </button>
              </div>
            </div>
            <div className="go-button-wrapper">
              <button className="go-btn">GO</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ChatBotIcon />
    </>
  );
};

export default ContractorStockForm;
