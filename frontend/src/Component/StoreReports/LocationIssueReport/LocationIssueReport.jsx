import React, { useState } from 'react';
import './LocationIssueReport.css'; // make sure this matches your CSS file name
import Header from '../../Partials/Header';
import Footer from '../../Partials/Footer';
import ChatBotIcon from '../../ChatBot/ChatBotIcon';

const LocationIssueReport = () => {
    const [selectedType, setSelectedType] = useState('Production');

    const handleTypeClick = (type) => {
        setSelectedType(type);
    };

    return (
        <>
            <Header />
            <div className="lir-container">
                <div className="lir-title">LOCATION WISE ISSUE REPORT</div>
                <div className="lir-form">
                    <div className="lir-row">
                        <div className="lir-group">
                            <label>Project<span className="lir-required">*</span></label>
                            <select>
                                <option>The Drizzle</option>
                            </select>
                        </div>

                        <div className="lir-group">
                            <label>Location</label>
                            <select>
                                <option>All</option>
                            </select>
                        </div>

                        <div className="lir-group">
                            <label>Category</label>
                            <select>
                                <option>All</option>
                            </select>
                        </div>

                        <div className="lir-group">
                            <label>Material</label>
                            <select>
                                <option>All</option>
                            </select>
                        </div>

                        <div className="lir-group">
                            <label>Specification</label>
                            <select>
                                <option>All</option>
                            </select>
                        </div>

                        <div className="lir-group">
                            <label>Specification Code</label>
                            <input type="text" />
                        </div>
                    </div>

                    <div className="lir-row">
                        <div className="lir-group lir-period">
                            <label>Period</label>
                            <div className="lir-daterange">
                                <input type="date" />
                                <span className="lir-dash">-</span>
                                <input type="date" />
                            </div>
                        </div>

                        <div className="lir-group lir-btn-group">
                            <label>&nbsp;</label>
                            <div className="lir-type-buttons">
                                {['All', 'Employee', 'Contractor', 'Production'].map(type => (
                                    <button
                                        key={type}
                                        className={`lir-btn ${selectedType === type ? 'active' : ''}`}
                                        onClick={() => handleTypeClick(type)}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="lir-group">
                            <label>{selectedType}</label>
                            <select>
                                <option>All</option>
                            </select>
                        </div>

                        <div className="lir-group lir-go">
                            <label>&nbsp;</label>
                            <button className="lir-go-btn">
                                🔍 GO
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ChatBotIcon />
        </>
    );
};

export default LocationIssueReport;
