import React, { useState, useEffect } from "react";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import * as XLSX from "xlsx";
import "./LeaveReport.css";
import axios from 'axios';

const LeaveReport = () => {
  const [filters, setFilters] = useState({
    empid: "",
    fromDate: "",
    toDate: ""
  });

  const [reportData, setReportData] = useState([]);
  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    fetchReport();
  }, []);

const fetchReport = async () => {
  try {
    // const response = await fetch("http://localhost:5000/api/leave/report");
    const response  = await axios.get(`${import.meta.env.VITE_API_URL}/leave/report`);
    const data = await response.json();
    setReportData(data);

    const grouped = data.reduce((acc, application) => {
      const key = `${application.empid} - ${application.ename}`;
      if (!acc[key]) acc[key] = [];

      application.leaveDetails.forEach(detail => {
        acc[key].push({
          pofl: application.pofl,
          frmdt: detail.frmdt,
          todate: detail.todate,
          nod: detail.nod,
          remarks: detail.remarks
        });
      });

      return acc;
    }, {});

    setGroupedData(grouped);
  } catch (err) {
    console.error("Error fetching report:", err);
  }
};

  const handleExport = (type) => {
    const allRows = Object.entries(groupedData).flatMap(([empKey, leaves]) => {
      return leaves.map((leave, i) => ({
        "Emp ID": leave.empid,
        "Name": leave.ename,
        "Purpose": leave.pofl,
        "From": leave.frmdt,
        "To": leave.todate,
        "Days": leave.nod,
        "Remarks": leave.remarks
      }));
    });

    // if (type === "PDF") {
    //   const doc = new jsPDF();
    //   doc.setFontSize(16);
    //   doc.text("Leave Application Report", 14, 20);
    //   autoTable(doc, {
    //     startY: 30,
    //     head: [["Emp ID", "Name", "Purpose", "From", "To", "Days", "Remarks"]],
    //     body: allRows.map(row => Object.values(row)),
    //     theme: "grid",
    //     styles: { fontSize: 9 },
    //     headStyles: { fillColor: [0, 117, 178], textColor: 255 }
    //   });
    //   doc.save("LeaveReport.pdf");
    // }

    // if (type === "Excel") {
    //   const worksheet = XLSX.utils.json_to_sheet(allRows);
    //   const workbook = XLSX.utils.book_new();
    //   XLSX.utils.book_append_sheet(workbook, worksheet, "LeaveReport");
    //   XLSX.writeFile(workbook, "LeaveReport.xlsx");
    // }
  };

  return (
    <div className="leave-report-container">
      <div className="leave-section">
        <div className="leave-header">
          <span>Leave Application Report</span>
          <div className="header-buttons">
            <button className="btn" onClick={() => handleExport("Excel")}>Export to Excel</button>
            <button className="btn" onClick={() => handleExport("PDF")}>Export to PDF</button>
          </div>
        </div>

        {Object.entries(groupedData).map(([empKey, leaves]) => (
          <div key={empKey} className="employee-group">
            <div className="employee-title">{empKey}</div>
            <table className="leave-table">
              <thead>
                <tr>
                  <th>Purpose</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>No of Days</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave, idx) => (
                  <tr key={idx}>
                    <td>{leave.pofl}</td>
                    <td>{leave.frmdt}</td>
                    <td>{leave.todate}</td>
                    <td>{leave.nod}</td>
                    <td>{leave.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveReport;
