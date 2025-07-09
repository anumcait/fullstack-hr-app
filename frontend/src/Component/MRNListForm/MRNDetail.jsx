import React from "react";
import "./MRNDetail.css";
import logo from "../../assets/images/logo_synkspot.png";

const MRNDetail = ({ onClose }) => {
    const handlePrint = () => {
    const printContent = document.querySelector(".mrndetail-container");
    const printWindow = window.open("", "", "width=900,height=650");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print MRN Detail</title>
          <style>
            body {
              font-family: 'Segoe UI', sans-serif;
              padding: 20px;
            }
            table, th, td {
              border: 1px solid #000;
              border-collapse: collapse;
            }
            th, td {
              padding: 5px;
              text-align: center;
            }
          </style>
        </head>
        <body>${printContent.innerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };
  return (
    <div className="mrndetail-overlay">
      <div className="mrndetail-container">
        <div className="mrndetail-header">
          {/* <img
            src="/logo.png"
            alt="Company Logo"
            className="mrndetail-logo"
          /> */}
          <img src={logo} alt="Logo" className="logo" />
          <div className="mrndetail-header-text">
            <h2>THE DRIZZLE JV</h2>
            <p>
              FLAT NO A1, VISTA RESIDENCY, PLOT NO 81 AND 82 BLOCK - D, SECTOR
              1, ALAKAPOOR TOWNSHIP, MANIKONDA, HYDERABAD TS-500089<br />
              Phone: 7337318528 | Email: gopi.ravuri@anandahomes.co.in
            </p>
          </div>
        </div>

        <div className="mrndetail-section-title">PURCHASE ORDER DETAIL</div>

        <div className="mrndetail-info-row">
          <div><strong>Project:</strong> The Drizzle</div>
          <div><strong>PO Code:</strong> DIZZ/PO/24-25/6/74</div>
          <div><strong>Indent Code:</strong> DIZZ/IN/24-25/6/74</div>
        </div>

        <table className="mrndetail-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Material</th>
              <th>Specification</th>
              <th>Specification Code</th>
              <th>Brand</th>
              <th>UOM</th>
              <th>Qty.</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>Discount</th>
              <th>Tax(%)</th>
              <th>Total Amount</th>
              <th>Tax Amount</th>
              <th>Final Amount</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>6 & 10kg f/cm² Elbow</td>
              <td>25mm</td>
              <td>PLU/7/1854</td>
              <td>SUPREME</td>
              <td>NO'S</td>
              <td>2000.00</td>
              <td>11.10</td>
              <td>22,200.00</td>
              <td>12,654.00</td>
              <td>18.00</td>
              <td>11264.28</td>
              <td>1718.28</td>
              <td>11,264.28</td>
              <td></td>
            </tr>
            <tr>
              <td>2</td>
              <td>6kg f/cm² (6mtr) pipe</td>
              <td>40mm</td>
              <td>PLU/6K/2087</td>
              <td>SUPREME</td>
              <td>NO'S</td>
              <td>100.00</td>
              <td>468.00</td>
              <td>46,800.00</td>
              <td>28,080.00</td>
              <td>18.00</td>
              <td>22089.60</td>
              <td>3369.60</td>
              <td>22,089.60</td>
              <td></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="8"></td>
              <td><strong>Total (Rs.):</strong></td>
              <td>69000.00</td>
              <td></td>
              <td>33354.00</td>
              <td></td>
              <td><strong>33354.00</strong></td>
              <td></td>
            </tr>
          </tfoot>
        </table>

        <div className="mrndetail-buttons">
          {/* <button className="mrndetail-print-btn">PRINT</button> */}
          <button className="mrndetail-print-btn" onClick={handlePrint}>PRINT</button>
          <button className="mrndetail-close-btn" onClick={onClose}>CLOSE</button>
        </div>
      </div>
    </div>
  );
};

export default MRNDetail;
