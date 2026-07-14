import * as employeeService from "../service/employeeService.js";
import catchAsync from "../middlewares/catchAsync.js";

console.log("employeesController loaded");

// GET ALL
export const getEmployees = catchAsync(async (req, res) => {
  const filters = {
    minSalary: req.query.minSalary,
    maxSalary: req.query.maxSalary,
    startDate: req.query.startDate,
    endDate: req.query.endDate,
  };

  const employees = await employeeService.getEmployees(filters);

  res.status(200).json(employees);
});

// GET BY ID
export const getEmployee = catchAsync(async (req, res) => {
  const id = req.params.id;
  const employee = await employeeService.getEmployeeById(id);

  if (!employee) {
    return res.status(404).json({
      message: req.__("EMPLOYEE_NOT_FOUND"),
    });
  }

  res.json(employee);
});

// ADD EMPLOYEE
export const addEmployee = catchAsync(async (req, res) => {
  const employee = req.body;
  const result = await employeeService.addEmployee(employee);

  res.status(201).json({
    message: req.__("EMPLOYEE_ADDED_SUCCESS"),
    data: result,
  });
});

// UPDATE EMPLOYEE
export const updateEmployee = catchAsync(async (req, res) => {
  const id = req.params.id;
  const employee = req.body;

  await employeeService.updateEmployee(id, employee);

  res.json({
    message: req.__("EMPLOYEE_UPDATED_SUCCESS"),
  });
});

// DELETE EMPLOYEE
export const deleteEmployee = catchAsync(async (req, res) => {
  const id = req.params.id;

  await employeeService.deleteEmployee(id);

  res.json({
    message: req.__("EMPLOYEE_DELETED_SUCCESS"),
  });
});

export const getMyEmployee = catchAsync(async (req, res) => {
  const employee = await employeeService.getEmployeeByUserId(req.user.id);

  res.status(200).json(employee);
});

export const updateMyEmployee = catchAsync(async (req, res) => {
  const employee = await employeeService.getEmployeeByUserId(req.user.id);

  if (!employee) {
    return res.status(404).json({
      message: "Employee not found",
    });
  }

  await employeeService.updateEmployee(employee.id, req.body);

  res.json({
    message: "Employee updated successfully",
  });
});
