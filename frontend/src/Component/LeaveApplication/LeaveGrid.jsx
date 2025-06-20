import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '../../context/ToastContext';

const LeaveGrid = ({ leaveDetails, setLeaveDetails, onValidationError }) => {
   const { showToast } = useToast();
  const [rows, setRows] = useState([
    { dayType: 'FULL DAY', fromDate: '', toDate: '', noOfDays: '', remarks: '' }
  ]);
  const inputRefs = useRef([]);
  const [toast, setToast] = useState('');
  const [overlapModal, setOverlapModal] = useState({ show: false, conflicts: [] });
  const [overlapIndexes, setOverlapIndexes] = useState([]);
const [confirmModal, setConfirmModal] = useState({
  show: false,
  index: null,
  message: '',
});


  const getBlankRow = () => ({
    dayType: 'FULL DAY',
    fromDate: '',
    toDate: '',
    noOfDays: '',
    remarks: ''
  });

  const isRowValid = (row) => row.dayType && row.fromDate && row.toDate;
  const isRowEdited = (row) => row.fromDate || row.toDate || row.noOfDays || row.remarks;

const addRow = () => {
  if (rows.length >= 5) {
    showToast('Only 5 rows allowed in Leave Application',"error");
    return;
  }

  const lastRow = rows[rows.length - 1];
  if (!isRowValid(lastRow)) {
    showToast('Please fill the current row before adding a new one.',"error");
    return;
  }

  setRows((prev) => [...prev, getBlankRow()]);
};

  const resetRow = (index) => {
    const updated = [...rows];
    updated[index] = getBlankRow();
    setRows(updated);
    showToast('Row reset',"error");
  };

  // const deleteRow = (index) => {
  //   const row = rows[index];
  //   if (isRowEdited(row) && !window.confirm('This row has values. Delete?')) return;

  //   const updated = rows.filter((_, i) => i !== index);
  //   if (!updated.length) updated.push(getBlankRow());
  //   setRows(updated);
  //   showToast('Row deleted',"error");
  // };

  const deleteRow = (index) => {
  const row = rows[index];

  if (isRowEdited(row)) {
    setConfirmModal({
      show: true,
      index,
      message: 'This row has values. Do you want to delete it?',
    });
  } else {
    performDelete(index);
  }
};

const performDelete = (index) => {
  const updated = rows.filter((_, i) => i !== index);
  if (!updated.length) updated.push(getBlankRow());
  setRows(updated);
  showToast('Row deleted', 'error');
  setConfirmModal({ show: false, index: null, message: '' });
};


  const checkOverlap = (rows, currentIndex) => {
    const conflicts = [];
    const indexes = new Set();

    for (let i = 0; i < rows.length; i++) {
      const rowA = rows[i];
      if (!rowA.fromDate || !rowA.toDate) continue;

      const fromA = new Date(rowA.fromDate);
      const toA = new Date(rowA.toDate);

      for (let j = i + 1; j < rows.length; j++) {
        const rowB = rows[j];
        if (!rowB.fromDate || !rowB.toDate) continue;

        const fromB = new Date(rowB.fromDate);
        const toB = new Date(rowB.toDate);

        if (fromA <= toB && toA >= fromB) {
          conflicts.push({ i: i + 1, j: j + 1 });
          indexes.add(i);
          indexes.add(j);
        }
      }
    }

    return { conflicts, indexes: [...indexes] };
  };

  const updateRow = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;

    const row = updated[index];
    const from = new Date(row.fromDate);
    const to = new Date(row.toDate);

       if (from > to) {
  showToast('Something went wrong, check dates!', "error");
 
}

    if (['fromDate', 'toDate', 'dayType'].includes(field)) {
      if (!isNaN(from) && !isNaN(to) && from <= to) {
        let diff = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
        if (row.dayType === 'HALF DAY') diff *= 0.5;
        updated[index].noOfDays = diff;
      } else {
        updated[index].noOfDays = '';
      }
    }


    setRows(updated);
  };

  useEffect(() => {
    setLeaveDetails(rows);

    const { conflicts, indexes } = checkOverlap(rows);
    setOverlapIndexes(indexes);

    if (onValidationError) {
      onValidationError(indexes.length > 0);
    }

    if (conflicts.length > 0) {
      setOverlapModal({
        show: true,
        conflicts: conflicts.map(c => `Row ${c.i} and Row ${c.j} are overlapping`)
      });
    } else {
      setOverlapModal({ show: false, conflicts: [] });
    }
  }, [rows]);

  const handleKeyDown = (e, rowIndex, colIndex) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextIndex = rowIndex * 5 + colIndex + 1;
      const nextInput = inputRefs.current[nextIndex];
      if (nextInput) nextInput.focus();
      else {
        addRow();
        setTimeout(() => inputRefs.current[rows.length * 5]?.focus(), 100);
      }
    }
  };

  useEffect(() => {
    const handleKeys = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        addRow();
      }
      if (e.ctrlKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        if (rows.length > 1) deleteRow(rows.length - 1);
      }
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [rows]);

  return (
    <div className="grid-section">
      {toast && <div className="toast-message">{toast}</div>}

      {overlapModal.show && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h4>❗ Overlapping Date Ranges</h4>
            <ul>
              {overlapModal.conflicts.map((msg, i) => <li key={i}>{msg}</li>)}
            </ul>
            <button onClick={() => setOverlapModal({ show: false, conflicts: [] })}>Close</button>
          </div>
        </div>
      )}

      <table className="leave-table">
        <thead>
          <tr>
            <th className="row-number">#</th>
            <th>Day Type</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>No Of Days</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
           {rows.map((row, i) => (
            <tr key={i} className={`${isRowEdited(row) ? 'edited-row' : ''} ${overlapIndexes.includes(i) ? 'overlap-row' : ''}`}>

              <td>
                {isRowEdited(row) && <span style={{ color: '#e68a00', marginRight: 4 }}>✳️</span>}
            
              {i + 1}
              </td>
              <td>
                <select
                  ref={el => inputRefs.current[i * 5 + 0] = el}
                  value={row.dayType}
                  onChange={(e) => updateRow(i, 'dayType', e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, i, 0)}
                >
                  <option value="FULL DAY">FULL DAY</option>
                  <option value="HALF DAY">HALF DAY</option>
                </select>
              </td>
              <td>
                <input type="date" value={row.fromDate}
                  onChange={(e) => updateRow(i, 'fromDate', e.target.value)}
                  ref={el => inputRefs.current[i * 5 + 1] = el}
                  onKeyDown={(e) => handleKeyDown(e, i, 1)} />
              </td>
              <td>
                <input type="date" value={row.toDate}
                  onChange={(e) => updateRow(i, 'toDate', e.target.value)}
                  ref={el => inputRefs.current[i * 5 + 2] = el}
                  onKeyDown={(e) => handleKeyDown(e, i, 2)} />
              </td>
              <td>
                <input type="number" value={row.noOfDays}
                  onChange={(e) => updateRow(i, 'noOfDays', e.target.value)}
                  ref={el => inputRefs.current[i * 5 + 3] = el}
                  onKeyDown={(e) => handleKeyDown(e, i, 3)} />
              </td>
              <td>
                <input value={row.remarks}
                  onChange={(e) => updateRow(i, 'remarks', e.target.value)}
                  ref={el => inputRefs.current[i * 5 + 4] = el}
                  onKeyDown={(e) => handleKeyDown(e, i, 4)} />
              </td>
              <td>
                <button className="del-btn" onClick={() => deleteRow(i)} >🗑️</button>
                <button className="reset-btn" onClick={() => resetRow(i)} disabled={!isRowEdited(row)}>🔄</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <button className="add-row-btn" onClick={addRow}>+ <u>A</u>dd Row</button> */}
      <button
  className="add-row-btn"
  onClick={addRow}
  disabled={rows.length >= 5}
>
  + <u>A</u>dd Row
</button>
{confirmModal.show && (
  <div className="modal-overlay">
    <div className="modal-box">
      <p>{confirmModal.message}</p>
      <div style={{ marginTop: '10px' }}>
        <button
          onClick={() => performDelete(confirmModal.index)}
          style={{ marginRight: '10px', backgroundColor: '#d9534f', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '4px' }}
        >
          Yes
        </button>
        <button
          onClick={() => setConfirmModal({ show: false, index: null, message: '' })}
          style={{ backgroundColor: '#6c757d', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '4px' }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
    </div>
    
  );
};

export default LeaveGrid;
