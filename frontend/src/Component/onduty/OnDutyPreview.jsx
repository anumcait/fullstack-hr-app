import React from "react";
import "./onDutyPreview.css";
import logo from "../../assets/images/EQIC_Image.jpg";

const OnDutyPreview = ({ data = {}, onClose }) => {
  const {
    movement_id = "--",
    created_at = "--",
    empid = "--",
    ename = "--",
    unit = "--",
    division = "--",
    designation = "--",
    section = "--",
    shift = "--",
    movement_date = "--",
    perm_ftime = "--",
    perm_ttime = "--",
    reason_perm = "--"
  } = data;

  return (
    <div className="onduty-print-overlay">
      <div className="onduty-print-container">
        {/* Header */}
        <div className="onduty-print-header">
          <img src={logo} alt="Logo" className="onduty-logo" />
          <div className="onduty-company-title">
            EQIC DIES & MOULDS ENGINEERS PVT. LTD
            <br />
            <span className="onduty-slip-title">ON DUTY PERMISSION SLIP</span>
          </div>
          <div className="onduty-before-box">BEFORE SUBMISSION</div>
        </div>

        {/* Details Table */}
       <table className="onduty-field-table">
  <tbody>
    <tr>
      <td className="label">S.No</td>
      <td className="colon">:</td>
      <td className="value">{movement_id}</td>

      <td className="label">Date</td>
      <td className="colon">:</td>
      <td className="value">{created_at}</td>
    </tr>
    <tr>
      <td className="label">Emp Id</td>
      <td className="colon">:</td>
      <td className="value">{empid}</td>

      <td className="label">Emp Name</td>
      <td className="colon">:</td>
      <td className="value">{ename}</td>
    </tr>
    <tr>
      <td className="label">Unit</td>
      <td className="colon">:</td>
      <td className="value">{unit}</td>

      <td className="label">Division</td>
      <td className="colon">:</td>
      <td className="value">{division}</td>
    </tr>
    <tr>
      <td className="label">Designation</td>
      <td className="colon">:</td>
      <td className="value">{designation}</td>

      <td className="label">Section</td>
      <td className="colon">:</td>
      <td className="value">{section}</td>
    </tr>
    <tr>
      <td className="label">Shift</td>
      <td className="colon">:</td>
      <td className="value">{shift}</td>
      <td></td>
      <td className="colon"></td>
      <td></td>
    </tr>
  </tbody>
</table>




        <hr />

        {/* Movement Section */}
       <table className="onduty-field-table">
  <tbody>
    <tr>
      <td className="label">Movement Date</td>
      <td className="colon">:</td>
      <td className="value">{movement_date}</td>

      <td className="label">Time From</td>
      <td className="colon">:</td>
      <td className="value">{perm_ftime}</td>
    </tr>
    <tr>
      <td className="label">To</td>
      <td className="colon">:</td>
      <td className="value">{perm_ttime}</td>

      <td className="label">Reason</td>
      <td className="colon">:</td>
      <td className="value">{reason_perm}</td>
    </tr>
  </tbody>
</table>

        <hr />

        {/* Signature Section */}
        <table className="onduty-signature-grid">
          <tbody>
            <tr>
            <td>
                <br /><br /> <br />
               
                <strong>Employee</strong><br /><br />
                Signature
              </td>

              <td>
                <strong>Recommended</strong><br />
                Name: <br />
                E.I.D No.: <br /><br />
                Signature
              </td>
              <td>
                <strong>Approved</strong><br />
                Name:<br />
                E.I.D No.:<br /><br />
                Signature
              </td>
           
              <td>
                <br /><br /> <br />
                <strong>Authorized</strong><br />
                Signature<br /><br />
                
              </td>
              <td>
               <br /><br /> <br /><br />
                <strong>HRM</strong>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Notes */}
        <div className="onduty-note">
          * Up to Operators level approved signature is sufficient<br />
          * Above Operators level Authorized signature is also must
        </div>

        {/* Buttons */}
        <div className="onduty-actions no-print">
          <button onClick={() => window.print()}>Print</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default OnDutyPreview;
