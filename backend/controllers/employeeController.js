const { employee_master } = require('../models');

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await employee_master.findAll();
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getEmployeeById = async (req, res) => {
  const { empid } = req.params;
  try {
    const employee = await employee_master.findOne({ where: { empid } });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





exports.createEmployee = async (req, res) => {
  try {
    const newEmployee = await employee_master.create(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  const { empid } = req.params;
  try {
    const employee = await employee_master.findOne({ where: { empid } });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    await employee.update(req.body);
    res.json(employee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { empid } = req.params;
  try {
    const employee = await employee_master.findOne({ where: { empid } });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    await employee.destroy();
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
