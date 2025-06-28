import React, { useState, useEffect, useRef } from 'react';
import {
  Grid,
  TextField,
  Paper,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './onDutyForm.css';
import axios from 'axios';
import OnDutyPreview from './OnDutyPreview'; // Ensure the component exists

const OnDutyForm = () => {
  const [formData, setFormData] = useState({
    movement_id: '',
    movement_date: new Date().toISOString().split('T')[0],
    empid: '',
    ename: '',
    unit: '',
    division: '',
    designation: '',
    shift: '',
    perm_ftime: '',
    perm_ttime: '',
    no_of_hrs: '',
    reason_perm: ''
  });

  const [showEmpPopup, setShowEmpPopup] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [empSearch, setEmpSearch] = useState('');

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

  const openEmpPopup = async () => {
    // TODO: Replace with actual API call
    const mockData = [
      { empid: 143864, ename: 'John Doe', unit: 'A', division: 'HR', designation: 'Officer' },
      { empid: 102, ename: 'Jane Smith', unit: 'B', division: 'Finance', designation: 'Clerk' }
    ];
    setEmployeeList(mockData);
    setShowEmpPopup(true);
  };

  const selectEmployee = (emp) => {
    setFormData((prev) => ({
      ...prev,
      empid: emp.empid,
      ename: emp.ename,
      unit: emp.unit,
      division: emp.division,
      designation: emp.designation
    }));
    setShowEmpPopup(false);
  };
const previewPermissionReport = async () => {
  if (!formData.empid) {
    alert('Please select an employee');
    return;
  }

  try {
    const response = await axios.get(
      'http://localhost:5000/api/jasper/report',
      {
        responseType: 'blob',
        params: { movid: formData.empid }
      }
    );

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url); // Preview PDF in new tab
  } catch (err) {
    console.error('Error:', err);
    alert('Failed to generate report');
  }
};
  return (
    <>
     {!showPreview && (
    <div className="onduty-container">
      <Paper elevation={3} className="onduty-paper">
        <div className="form-header">
          <Typography variant="h6">On Duty Permission Form</Typography>
           <button className="close-btn">✖</button>
          {/* <IconButton onClick={() => window.history.back()}><CloseIcon /></IconButton> */}
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}><TextField label="App No" value={formData.movement_id} disabled fullWidth /></Grid>
          <Grid item xs={12} md={3}><TextField label="Date" value={formData.movement_date} type="date" fullWidth /></Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Emp ID" value={formData.empid} fullWidth onClick={openEmpPopup} InputProps={{ endAdornment: <MoreVertIcon /> }} />
          </Grid>
          <Grid item xs={12} md={3}><TextField label="Name" value={formData.ename} fullWidth disabled /></Grid>

          <Grid item xs={12} md={3}><TextField label="Unit" value={formData.unit} fullWidth disabled /></Grid>
          <Grid item xs={12} md={3}><TextField label="Division" value={formData.division} fullWidth disabled /></Grid>
          <Grid item xs={12} md={3}><TextField label="Designation" value={formData.designation} fullWidth disabled /></Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Shift</InputLabel>
              <Select name="shift" value={formData.shift} onChange={handleChange}>
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="C">C</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} md={3}><TextField label="From Time" type="time" name="perm_ftime" value={formData.perm_ftime} onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={6} md={3}><TextField label="To Time" type="time" name="perm_ttime" value={formData.perm_ttime} onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={6} md={3}><TextField label="No of Hours" value={formData.no_of_hrs} disabled fullWidth /></Grid>
          <Grid item xs={12} md={12}><TextField label="Reason" name="reason_perm" value={formData.reason_perm} onChange={handleChange} fullWidth multiline rows={2} /></Grid>
        </Grid>

        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <Button variant="contained" color="primary">Save</Button>
        </div>
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
  <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={previewPermissionReport}>
    Preview Report
  </Button>
  <Button variant="contained" color="primary">
    Save
  </Button>
</div>
      </Paper>
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
  <Button variant="contained" color="primary" onClick={() => setShowPreview(true)} style={{ marginRight: '10px' }}>
    Custom Preview
  </Button>
  <Button variant="contained" color="primary" onClick={() => {/* Save Logic Here */}}>
    Save
  </Button>
</div>

      <Dialog open={showEmpPopup} onClose={() => setShowEmpPopup(false)} fullWidth maxWidth="sm">
        <DialogTitle>Select Employee <IconButton onClick={() => setShowEmpPopup(false)} style={{ float: 'right' }}><CloseIcon /></IconButton></DialogTitle>
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
{showPreview && (
  <OnDutyPreview
    formData={formData}
    onClose={() => setShowPreview(false)}
  />
)}

    </>
  );
};

export default OnDutyForm;