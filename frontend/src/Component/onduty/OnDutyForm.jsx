import React, { useState, useEffect } from 'react';
import {
  TextField, Typography, Button, FormControl, InputLabel, Select,
  MenuItem, Dialog, DialogTitle, DialogContent, IconButton, Grid, Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './onDutyForm.css';
import axios from 'axios';
import OnDutyPreview from './OnDutyPreview';
import SearchIcon from '@mui/icons-material/Search';

const OnDutyForm = () => {
  const getCurrentISTDateTime = () => {
    const nowUTC = new Date(Date.now());
    const istDate = new Date(nowUTC.getTime());
    const yyyy = istDate.getFullYear();
    const mm = String(istDate.getMonth() + 1).padStart(2, '0');
    const dd = String(istDate.getDate()).padStart(2, '0');
    const hh = String(istDate.getHours()).padStart(2, '0');
    const min = String(istDate.getMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  };

  const [formData, setFormData] = useState({
    movement_id: '1',
    movement_date: getCurrentISTDateTime(),
    empid: '',
    ename: '',
    unit: '',
    division: '',
    designation: '',
    shift: '',
    act_date: '',
    perm_ftime: '',
    perm_ttime: '',
    no_of_hrs: '',
    reason_perm: ''
  });

  const [showEmpPopup, setShowEmpPopup] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimeChange = () => {
    if (formData.perm_ftime && formData.perm_ttime) {
      const from = new Date(`1970-01-01T${formData.perm_ftime}`);
      const to = new Date(`1970-01-01T${formData.perm_ttime}`);
      const diff = (to - from) / 1000 / 3600;
      setFormData((prev) => ({ ...prev, no_of_hrs: diff.toFixed(2) }));
    }
  };

  useEffect(() => {
    handleTimeChange();

  }, [formData.perm_ftime, formData.perm_ttime]);

//   useEffect(() => {
//   const fetchNextId = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_URL}/onduty/next-id`);
//       setFormData((prev) => ({ ...prev, movement_id: res.data.nextMovementId }));
//     } catch (err) {
//       console.error('Failed to fetch next movement ID', err);
//     }
//   };

//   fetchNextId();
// }, []);

  const openEmpPopup = async () => {
    const mockData = [
      { empid: 143864, ename: 'John Doe', unit: 'A', division: 'HR', designation: 'Officer' },
      { empid: 102, ename: 'Jane Smith', unit: 'B', division: 'Finance', designation: 'Clerk' }
    ];
    setEmployeeList(mockData);
    setShowEmpPopup(true);
  };

  const selectEmployee = (emp) => {
    setFormData({
      ...formData,
      empid: emp.empid,
      ename: emp.ename,
      unit: emp.unit,
      division: emp.division,
      designation: emp.designation
    });
    setShowEmpPopup(false);
  };

  const previewPermissionReport = async () => {
    if (!formData.empid) {
      alert('Please select an employee');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/jasper/report', {
        responseType: 'blob',
        params: { movid: formData.empid }
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to generate report');
    }
  };

  const saveOnDuty = async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/onduty/save`, formData);
// console.log('Payload to be saved:', formData);
    if (response.status === 201) {
      //toast.success(`Saved successfully. ID: ${res.data.movement_id}`);
       alert(`Saved successfully. ID: ${response.data.movement_id}`);
      // Optionally reset or fetch a new form
    } else {
      alert('Failed to save');
    }
  } catch (err) {
    console.error('Save error:', err);
    alert('Error saving On Duty application');
  }
};
  return (
    <>
      {!showPreview && (
        <div className="onduty-container">
          <div className="form-header">
            <Typography variant="h6">On Duty Permission Form</Typography>
            <button className="close-btn">✖</button>
          </div>

          <Box className="onduty-container">
            <div className="onduty-header">
              <h2>On Duty Permission</h2>
              {/* <Button variant="contained" color="primary">Save</Button> */}
               {/* Buttons */}
          <div className="action-buttons">
            <Button variant="contained" color="primary" onClick={previewPermissionReport} style={{ marginRight: '10px' }}>
              Preview Report
            </Button>
            {/* <Button variant="contained" color="primary">Save</Button> */}
            <Button variant="contained" color="primary" onClick={saveOnDuty}>Save</Button>
            <Button variant="contained" color="primary" onClick={() => setShowPreview(true)} style={{ marginLeft: '10px' }}>
              Custom Preview
            </Button>
          </div>
            </div>

            <Grid container spacing={2} className="onduty-form">
              {/* Row 1 */}
              <Grid item xs={12} md={6}>
                <div className="form-row">
                  <label>App No</label>
                  <TextField size="small" fullWidth disabled value={formData.movement_id} />
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className="form-row">
                  <label>Entry Date</label>
                  <TextField size="small" fullWidth disabled type="datetime-local" value={formData.movement_date} />
                </div>
              </Grid>

              {/* Row 2 */}
              <Grid item xs={12} md={3}>
                <div className="form-row">
                   <label>Emp ID</label>
                  <TextField
                    size="small"
                    fullWidth
                    value={formData.empid}
                    onClick={openEmpPopup}
                    InputProps={{ endAdornment: <SearchIcon style={{ cursor: 'pointer', size:'small' }} /> }}
                  /> 
                   
                 {/* <label>Emp Id</label>
                   <div className="combo-box">
              <div className="combo-section combo-input-section">
                <input type="text" className="combo-input" value={formData.empid} readOnly />
              </div>
              <div className="combo-section combo-icon-section" onClick={() => openEmpPopup(true)}>
                <SearchIcon fontSize="small" />
              </div>
              
            </div> */}
 
                </div>
              
              </Grid>
              <Grid item xs={12} md={3}>
                <div className="form-row">
                  <label>Name</label>
                  <TextField size="small" fullWidth disabled value={formData.ename} />
                </div>
              </Grid>
              <Grid item xs={12} md={3}>
                <div className="form-row">
                  <label>Unit</label>
                  <TextField size="small" fullWidth disabled value={formData.unit} />
                </div>
              </Grid>
              <Grid item xs={12} md={3}>
                <div className="form-row">
                  <label>Division</label>
                  <TextField size="small" fullWidth disabled value={formData.division} />
                </div>
              </Grid>

              {/* Row 3 */}
              <Grid item xs={12} md={4}>
                <div className="form-row">
                  <label>Designation</label>
                  <TextField size="small" fullWidth disabled value={formData.designation} />
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className="form-row">
                  <label>Movement Date</label>
                  <TextField name="act_date" type="date" value={formData.act_date} onChange={handleChange} size="small" fullWidth />
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className="form-row">
                  <label>Shift</label>
                  <FormControl size="small" fullWidth>
                    {/* <InputLabel>Shift</InputLabel> */}
                    <Select name="shift" value={formData.shift} onChange={handleChange}>
                      <MenuItem value="A">A</MenuItem>
                      <MenuItem value="B">B</MenuItem>
                      <MenuItem value="C">C</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </Grid>

              {/* Row 4 */}
              <Grid item xs={12} md={3}>
                <div className="form-row">
                  <label>From Time</label>
                  <TextField type="time" name="perm_ftime" value={formData.perm_ftime} onChange={handleChange} size="small" fullWidth />
                </div>
              </Grid>
              <Grid item xs={12} md={3}>
                <div className="form-row">
                  <label>To Time</label>
                  <TextField type="time" name="perm_ttime" value={formData.perm_ttime} onChange={handleChange} size="small" fullWidth />
                </div>
              </Grid>
              <Grid item xs={12} md={3}>
                <div className="form-row">
                  <label>No of Hours</label>
                  <TextField size="small" fullWidth disabled value={formData.no_of_hrs} />
                </div>
              </Grid>
              <Grid item xs={12} md={3}>
                <div className="form-row">
                  <label>Reason</label>
                  {/* <TextField name="reason_perm" value={formData.reason_perm} onChange={handleChange} size="small" fullWidth multiline rows={2} /> */}
       
                           
                       <TextField
                                    //  label="Item Description"
                                   //   label="Item Description"
                                     multiline
                                     rows={2}
                                     fullWidth
                                     variant='outlined'
                                     size="small"
                                     width="100%"
                                     sx={{ minWidth: 300 }}
                                     InputProps={{
                                       sx: {
                                         padding: 0,
                                         '& textarea': {
                                           padding: '8px',
                                           fontSize: '0.875rem',
                                           backgroundColor: 'transparent',
                                           resize: 'none'
                                         }
                                       }
                                     }}
                                   />
                
                          
                </div>
              </Grid>
            </Grid>
          </Box>

         

          {/* Employee Popup */}
          <Dialog open={showEmpPopup} onClose={() => setShowEmpPopup(false)} fullWidth maxWidth="sm">
            <DialogTitle>
              Select Employee
              <IconButton onClick={() => setShowEmpPopup(false)} style={{ float: 'right' }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              {employeeList.map(emp => (
                <div key={emp.empid} className="emp-popup-item" onClick={() => selectEmployee(emp)}>
                  {emp.empid} - {emp.ename} ({emp.division})
                </div>
              ))}
            </DialogContent>
          </Dialog>
        </div>
      )}

      {showPreview && <OnDutyPreview formData={formData} onClose={() => setShowPreview(false)} />}
    </>
  );
};

export default OnDutyForm;
