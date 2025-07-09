// File: MRNVendor.jsx
import React from "react";
import "./MRNVendor.css";
import logo from "../../assets/images/logo_synkspot.png";

const MRNVendor = ({ onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mrnvendor-overlay">
      <div className="mrnvendor-container">
        <div className="mrnvendor-header">
          {/* <img
            src="/path-to-logo.png"
            alt="Ananda Homes Logo"
            className="mrnvendor-logo"
          /> */}
           <img src={logo} alt="Logo" className="logo" />
          <div className="mrnvendor-info">
            <h2>THE DRIZZLE JV</h2>
            <p>
              FLAT NO A1, VISTA RESIDENCY, PLOT NO 81 AND 82 BLOCK - D, SECTOR
              1, ALKAPOOR TOWNSHIP, MANIKONDA, HYDERABAD TS-500089<br />
              Phone: 7337318528 | Email: gopi.ravuri@anandahomes.co.in
            </p>
          </div>
        </div>

        <h3 className="mrnvendor-title">VENDOR LEDGER OF THE DRIZZLE</h3>

        <div className="mrnvendor-details">
          <div><strong>Vendor:</strong> SRI ASHOKA MARKETING SERVICES</div>
          <div><strong>PAN No.:</strong> -</div>
          <div><strong>City:</strong> SECUNDERABAD</div>
          <div><strong>Address:</strong> #5-1-373/22, Old Ghasmandi, Ranigunj</div>
          <div><strong>GSTIN No.:</strong> 36ABFBP5910L1ZS</div>
          <div><strong>Mobile No.:</strong> 9121022082</div>
        </div>

        <table className="mrnvendor-table">
          <thead>
            <tr>
              <th>S.NO.</th>
              <th>INDENT CODE</th>
              <th>PO CODE</th>
              <th>PO DATE</th>
              <th>PO (RS.)</th>
              <th>UNDUE (RS.)</th>
              <th>DUE (RS.)</th>
              <th>CHARGE (RS.)</th>
              <th>TOTAL (RS.)</th>
              <th>PAID (RS.)</th>
              <th>DED. (RS.)</th>
              <th>OS (RS.)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>DIZZ/IN/22-23/2/13</td>
              <td className="link">DIZZ/PO/22-23/2/13</td>
              <td>15 Feb 2023</td>
              <td>170556.00</td>
              <td>0.00</td>
              <td>170556.00</td>
              <td>0.000</td>
              <td>170556</td>
              <td>0.00</td>
              <td>0.00</td>
              <td>170556.00</td>
            </tr>
            <tr>
              <td colSpan="4">Total</td>
              <td><strong>170556.00</strong></td>
              <td><strong>0.00</strong></td>
              <td><strong>170556.00</strong></td>
              <td><strong>0.000</strong></td>
              <td><strong>170556</strong></td>
              <td><strong>0.00</strong></td>
              <td><strong>0.00</strong></td>
              <td><strong>170556.00</strong></td>
            </tr>
          </tbody>
        </table>

        <div className="mrnvendor-actions">
          <button onClick={handlePrint}>PRINT</button>
          <button onClick={onClose}>CLOSE</button>
          <button>VENDOR BILL LEDGER</button>
        </div>
      </div>
    </div>
  );
};

export default MRNVendor;
