// File: MRNPreview.jsx
// import React from "react";
// import "./MRNPreview.css";
// import logo from "../../assets/images/logo_synkspot.png";

// const MRNPreview = ({ onClose }) => {
//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div className="mrnpreview-overlay">
//       <div className="mrnpreview-container">
import React, { useEffect, useRef, useState } from "react";
import "./MRNPreview.css";
import logo from "../../assets/images/logo_synkspot.png";
const MRNPreview = ({ onClose }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const resizeScale = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const height = container.offsetHeight;
        const width = container.offsetWidth;
        const vh = window.innerHeight - 40;
        const vw = window.innerWidth - 40;

        const scaleHeight = vh / height;
        const scaleWidth = vw / width;
        setScale(Math.min(scaleHeight, scaleWidth, 1));
      }
    };

    resizeScale();
    window.addEventListener("resize", resizeScale);
    return () => window.removeEventListener("resize", resizeScale);
  }, []);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Preview</title>
          <style>
            @page { size: A4; margin: 20mm; }
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; font-size: 12px; }
            th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: center; }
            .align-right { text-align: right !important; }
            h2, h3 { text-align: center; margin: 10px 0; }
          </style>
        </head>
        <body>
          ${containerRef.current.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="mrnpreview-overlay">
      <div
        className="mrnpreview-wrapper"
        style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
      >
        <div className="mrnpreview-container" ref={containerRef}>
        <div className="mrnpreview-header">
          {/* <h2>ANANDA HOMES</h2> */}
          <img src={logo} alt="Logo" className="logo" />
          <p>
            FLAT NO A1, VISTA RESIDENCY, PLOT NO 81 AND 82 BLOCK - D, SECTOR 1,<br/>
            ALKAPOOR TOWNSHIP, MANIKONDA, HYDERABAD TS-500089<br/>
            Phone: 7337318528 | Email: gopi.ravuri@anandahomes.co.in
          </p>
        </div>

        <h3 className="mrnpreview-title">PURCHASE ORDER</h3>

        <div className="mrnpreview-section">
          <div className="mrnpreview-left">
            <strong>M/s. SRI ASHOKA MARKETING SERVICES</strong>
            <p>
              Contact Person: -<br/>
              Mobile No.: 9121022082<br/>
              Email ID: -<br/>
              Address: #5-1-373/22, Old Ghasmandi, Ranigunj, SECUNDERABAD, Pin - 500003<br/>
              State: Telangana | State Code: 36<br/>
              GSTIN: 36ABFBP5910L1ZS<br/>
              PAN: -
            </p>
          </div>
          <div className="mrnpreview-right">
            <p>
              Project: The Drizzle<br/>
              Delivery Address: The Drizzle, Road No: 30, Alkapoor Township, Manikonda<br/>
              State: Telangana | State Code: 36<br/>
              Indent Code: DIZZ/IN/24-25/6/74<br/>
              PO Code: DIZZ/PO/24-25/6/74<br/>
              PO Date: 20 Jun 2025<br/>
              GSTIN: 36AALTS115B1ZP<br/>
              PAN: -
            </p>
          </div>
        </div>

        <table className="mrnpreview-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Material</th>
              <th>Specification</th>
              <th>HSN Code</th>
              <th>Brand</th>
              <th>UOM</th>
              <th>Qty.</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>Discount</th>
              <th>Rebate Amount</th>
              <th>Total Amount</th>
              <th>CGST (%)</th>
              <th>CGST Amt</th>
              <th>SGST (%)</th>
              <th>SGST Amt</th>
              <th>Final Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>6 & 10kg f/cm^2 Elbow</td>
              <td>25mm</td>
              <td>999</td>
              <td>SUPREME</td>
              <td>NO'S</td>
              <td>2000.00</td>
              <td>11.10</td>
              <td>22200</td>
              <td>12654.00</td>
              <td>9546.00</td>
              <td>11264.28</td>
              <td>9.00</td>
              <td>859.14</td>
              <td>9.00</td>
              <td>859.14</td>
              <td>11264.28</td>
            </tr>
            <tr>
              <td>2</td>
              <td>6kg f/cm^2 (6mtr) pipe</td>
              <td>40mm</td>
              <td>999</td>
              <td>SUPREME</td>
              <td>NO'S</td>
              <td>100.00</td>
              <td>468.00</td>
              <td>46800</td>
              <td>28080.00</td>
              <td>18720.00</td>
              <td>22089.60</td>
              <td>9.00</td>
              <td>1684.80</td>
              <td>9.00</td>
              <td>1684.80</td>
              <td>22089.60</td>
            </tr>
            <tr>
              <td colSpan="11" className="align-right">Total (Rs.)</td>
              <td>33354.00</td>
              <td></td>
              <td>2544</td>
              <td></td>
              <td>2544</td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <p className="mrnpreview-amount">Net Payable Amount (Rs.): 33,354/- (Thirty Three Thousand Three Hundred Fifty Four Rupees Only)</p>

        <div className="mrnpreview-terms">
          <h4>Terms & Conditions:</h4>
          <ul>
            <li>Please mention Indent Code and PO Code on your bill.</li>
            <li>PO number must be quoted on all challans & invoices. Copy of PO to be sent with material.</li>
            <li>Defective/inferior material will be rejected & must be replaced at supplier’s cost.</li>
            <li>Supplied material will be quality checked. Failed material must be removed at supplier's cost.</li>
            <li>Please sign duplicate copy as acceptance.</li>
          </ul>
        </div>

        <div className="mrnpreview-actions">
          {/* <button onClick={handlePrint}>PRINT</button> */}
          <button onClick={() => window.print()}>Print</button>

          <button onClick={onClose}>CLOSE</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MRNPreview;
