import * as employeeService from "../service/employeeService.js";
console.log("employeesController loaded");

// GET ALL
export const getEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getEmployees();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET BY ID
export const getEmployee = async (req, res) => {
  try {
    const id = req.params.id;

    const employee = await employeeService.getEmployeeById(id);

    res.json(employee);
  } catch (error) {
    if (error.message === "Employee not found") {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: error.message });
  }
};
// ADD EMPLOYEE
export const addEmployee = async (req, res) => {
  try {
    const employee = req.body;

    const result = await employeeService.addEmployee(employee);

    res.status(201).json({
      message: "Employee added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE EMPLOYEE
export const updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = req.body;

    await employeeService.updateEmployee(id, employee);

    res.json({
      message: "Employee updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE EMPLOYEE
export const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;

    await employeeService.deleteEmployee(id);

    res.json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
