
import React, { useState, useEffect } from 'react';
import {
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
  IconButton,
  Grid,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './onDutyForm.css';
import axios from 'axios';
import OnDutyPreview from './OnDutyPreview';

const OnDutyForm = () => {
   const getCurrentISTDateTime = () => {
  const nowUTC = new Date(Date.now()); // system time in UTC-based timestamp
  const istDate = new Date(nowUTC.getTime() );

  // Format as "YYYY-MM-DDTHH:mm" for <input type="datetime-local">
  const yyyy = istDate.getFullYear();
  const mm = String(istDate.getMonth() + 1).padStart(2, '0');
  const dd = String(istDate.getDate()).padStart(2, '0');
  const hh = String(istDate.getHours()).padStart(2, '0');
  const min = String(istDate.getMinutes()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
};
  const [formData, setFormData] = useState({
    movement_id: '',
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

  const openEmpPopup = async () => {
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

  return (
    <>
      {!showPreview && (
           
        <div className="onduty-container">
         <Paper elevation={3}>
  <div className="form-header">
    <Typography variant="h6">On Duty Permission Form</Typography>
    <button className="close-btn">✖</button>
  </div>
  <Box className="onduty-container">
      <div className="onduty-header">
        <h2>On Duty Permission</h2>
        <div>
          <Button variant="contained" color="primary">Save</Button>
        </div>
      </div>

      <Grid container spacing={2} className="onduty-form">
        {/* Row 1: App No & Entry Date */}
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

        {/* Row 2: Emp Details */}
        <Grid item xs={12} md={3}>
          <div className="form-row">
            <label>Emp ID</label>
            <TextField
              size="small"
              fullWidth
              value={formData.empid}
              InputProps={{ endAdornment: <MoreVertIcon /> }}
            />
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

        {/* Row 3: Designation, Act Date, Shift */}
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
              <InputLabel>Shift</InputLabel>
              <Select name="shift" value={formData.shift} onChange={handleChange}>
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="C">C</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>

        {/* Row 4: Time & Reason */}
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
            <TextField name="reason_perm" value={formData.reason_perm} onChange={handleChange} size="small" fullWidth multiline rows={2} />
          </div>
        </Grid>
      </Grid>
    </Box>
  <Grid container spacing={0} className="onduty-grid">
    {/* Row 1: App No & Entry Date */}
    <Grid item xs={12} md={6}>
      <div className="form-row">
        <label>App No</label>
        <TextField value={formData.movement_id} disabled fullWidth size="small" />
         <label>Entry Date</label>
        <TextField
          value={formData.movement_date}
          type="datetime-local"
          fullWidth
          size="small"
          disabled
        />
      </div>
    </Grid>

    {/* Row 2: Emp ID, Name, Unit, Division */}
    <Grid item xs={12} md={3}>
    <div className="form-row">
        <label>Emp ID</label>
        <TextField
          value={formData.empid}
          fullWidth
          size="small"
          onClick={openEmpPopup}
          InputProps={{ endAdornment: <MoreVertIcon /> }}
        />




        <label>Name</label>
        <TextField value={formData.ename} disabled fullWidth size="small" />




        <label>Unit</label>
        <TextField value={formData.unit} disabled fullWidth size="small" />




        <label>Division</label>
        <TextField value={formData.division} disabled fullWidth size="small" />
</div>
    </Grid>

    {/* Row 3: Designation, Act Date, Shift */}
    <Grid item xs={6} md={6}>
      <div className="form-row">
        <label>Designation</label>
        <TextField value={formData.designation} disabled fullWidth size="small" />
    


        <label>Movement Date</label>
        <TextField
          name="act_date"
          type="date"
          value={formData.act_date}
          onChange={handleChange}
          fullWidth
          size="small"
        />
 
 


        <label>Shift</label>
        <FormControl fullWidth size="small">
          <InputLabel>Shift</InputLabel>
          <Select name="shift" value={formData.shift} onChange={handleChange}>
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="C">C</MenuItem>
          </Select>
        </FormControl>
</div>
    </Grid>

    {/* Row 4: From Time, To Time, No of Hours, Reason */}
    <Grid item xs={12} md={3}>
      <div className="form-row">
        <label>From Time</label>
        <TextField
          type="time"
          name="perm_ftime"
          value={formData.perm_ftime}
          onChange={handleChange}
          fullWidth
          size="small"
        />
      </div>
    </Grid>
    <Grid item xs={12} md={3}>
      <div className="form-row">
        <label>To Time</label>
        <TextField
          type="time"
          name="perm_ttime"
          value={formData.perm_ttime}
          onChange={handleChange}
          fullWidth
          size="small"
        />
      </div>
    </Grid>
    <Grid item xs={12} md={3}>
      <div className="form-row">
        <label>No of Hours</label>
        <TextField value={formData.no_of_hrs} fullWidth size="small" disabled />
      </div>
    </Grid>
    <Grid item xs={12} md={3}>
      <div className="form-row">
        <label>Reason</label>
        <TextField
          name="reason_perm"
          value={formData.reason_perm}
          onChange={handleChange}
          fullWidth
          multiline
          rows={2}
          size="small"
        />
      </div>
    </Grid>
  </Grid>

  {/* Row 5: Buttons */}
  <div className="action-buttons">
    <Button variant="contained" color="primary" onClick={previewPermissionReport} style={{ marginRight: '10px' }}>
      Preview Report
    </Button>
    <Button variant="contained" color="primary">Save</Button>
    <Button variant="contained" color="primary" onClick={() => setShowPreview(true)} style={{ marginLeft: '10px' }}>
      Custom Preview
    </Button>
  </div>
</Paper>


          <Paper elevation={3} className="onduty-paper">
            <div className="form-header">
              <Typography variant="h6">On Duty Permission Form</Typography>
              <button className="close-btn">✖</button>
            </div>
            <Grid container spacing={1} className="onduty-form-grid">
  <Grid item xs={12} md={6} className="onduty-form-row">
    <label>App No</label><TextField value={formData.movement_id} disabled fullWidth size="small" />
    <label>Date</label>
    <TextField
      value={formData.movement_date}
      type="datetime-local"
      fullWidth
      size="small"
      disabled
    />
      
  </Grid>
  <Grid item xs={12} md={6} className="onduty-form-row">
    <label>Emp ID</label><TextField value={formData.empid} fullWidth size="small" onClick={openEmpPopup} InputProps={{ endAdornment: <MoreVertIcon /> }} />
<label>Name</label><TextField value={formData.ename} fullWidth size="small" disabled />
<label>Unit</label><TextField value={formData.unit} fullWidth size="small" disabled />
<label>Division</label><TextField value={formData.division} fullWidth size="small" disabled />

  </Grid>
   <Grid item xs={12} md={6} className="onduty-form-row">
  <label>Designation</label><TextField value={formData.designation} fullWidth size="small" disabled />
  <label>Date</label><TextField value={formData.act_date} type="date" fullWidth size="small" />
  <label>Shift</label>
              <FormControl fullWidth size="small">
                <InputLabel>Shift</InputLabel>
                <Select name="shift" value={formData.shift} onChange={handleChange}>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                </Select>
              </FormControl>

  </Grid>
  <Grid item xs={12} md={6} className="onduty-form-row">
  <label>From Time</label><TextField type="time" name="perm_ftime" value={formData.perm_ftime} onChange={handleChange} fullWidth size="small" />
            <label>To Time</label><TextField type="time" name="perm_ttime" value={formData.perm_ttime} onChange={handleChange} fullWidth size="small" />
            <label>No of Hours</label><TextField value={formData.no_of_hrs} fullWidth size="small" disabled />
            <label>Reason</label><TextField name="reason_perm" value={formData.reason_perm} onChange={handleChange} fullWidth multiline rows={2} size="small" />
</Grid>
  <div className="action-buttons">
              <Button variant="contained" color="primary" onClick={previewPermissionReport} style={{ marginRight: '10px' }}>
                Preview Report
              </Button>
              <Button variant="contained" color="primary">Save</Button>
              <Button variant="contained" color="primary" onClick={() => setShowPreview(true)} style={{ marginLeft: '10px' }}>
                Custom Preview
              </Button>
            </div>
</Grid>

          </Paper>
          

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
