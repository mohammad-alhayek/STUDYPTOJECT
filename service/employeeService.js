import * as employeeRepos from "../repositories/employeeRepository.js";
import AppError from "../utils/AppError.js";

// GET ALL EMPLOYEES
export const getEmployees = async () => {
  return await employeeRepos.getAllEmployees();
};

// GET EMPLOYEE BY ID
export const getEmployeeById = async (id) => {
  if (!id) {
    throw new AppError("Employee ID is required", 400);
  }

  const employee = await employeeRepos.getEmployeeById(id);

  if (!employee) {
    throw new AppError("Employee not found", 404);
  }

  return employee;
};

// ADD EMPLOYEE
export const addEmployee = async (employee) => {
  const newEmployee = {
    user_id: employee.user_id,
    full_name: employee.full_name,
    phone: employee.phone,
    department: employee.department,
    salary: employee.salary,
    hire_date: employee.hire_date,
    address: employee.address,
  };

  const createdEmployee = await employeeRepos.addEmployee(newEmployee);

  return {
    id: createdEmployee.id,
    full_name: createdEmployee.full_name,
    user_id: createdEmployee.user_id,
  };
};

// UPDATE EMPLOYEE
export const updateEmployee = async (id, employee) => {
  if (!id) {
    throw new AppError("Employee ID is required", 400);
  }

  if (!employee.full_name) {
    throw new AppError("Employee name is required", 400);
  }

  const existingEmployee = await employeeRepos.getEmployeeById(id);

  if (!existingEmployee) {
    throw new AppError("Employee not found", 404);
  }

  return await employeeRepos.updateEmployee(id, employee);
};

// DELETE EMPLOYEE
export const deleteEmployee = async (id) => {
  if (!id) {
    throw new AppError("Employee ID is required", 400);
  }

  const existing = await employeeRepos.getEmployeeById(id);

  if (!existing) {
    throw new AppError("Employee not found", 404);
  }

  return await employeeRepos.deleteEmployee(id);
};
