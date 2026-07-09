//import * as employeeModel from '../model/employeeModel.js';
import * as employeeRepos from "../repositories/employeeRepository.js";
import { generateEmployeeId } from "../utils/generateEmployeeId.js";

// GET ALL EMPLOYEES
export const getEmployees = async () => {
  return await employeeRepos.getAllEmployees();
};

// GET EMPLOYEE BY ID
export const getEmployeeById = async (id) => {
  if (!id) {
    throw new AppError("EMPLOYEE_ID_REQUIRED", 400);
  }

  if (!id) {
    throw new Error("Employee ID is required");
  }

  if (!employee) {
    throw new AppError("EMPLOYEE_NOT_FOUND", 404);
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

  console.log(newEmployee);

  const createdEmployee = await employeeRepos.addEmployee(newEmployee);

  console.log(createdEmployee);
  return {
    id: createdEmployee.id,
    full_name: createdEmployee.full_name,
    user_id: createdEmployee.user_id,
  };
};
// UPDATE EMPLOYEE
export const updateEmployee = async (id, employee) => {
  if (!id) {
    throw new AppError("EMPLOYEE_ID_REQUIRED", 400);
  }

  if (!employee.full_name) {
    throw new AppError("EMPLOYEE_NAME_REQUIRED", 400);
  }

  if (!employee.full_name) {
    throw new Error("Employee name is required");
  }

  if (!existingEmployee) {
    throw new AppError("EMPLOYEE_NOT_FOUND", 404);
  }

  return await employeeRepos.updateEmployee(id, employee);
};
// DELETE EMPLOYEE
export const deleteEmployee = async (id) => {
  if (!id) {
    throw new AppError("EMPLOYEE_ID_REQUIRED", 400);
  }

  if (!id) {
    throw new Error("Employee ID is required");
  }

  if (!existing) {
    throw new AppError("EMPLOYEE_NOT_FOUND", 404);
  }

  if (!existing) {
    throw new Error("Employee not found");
  }

  return await employeeModel.deleteEmployee(id);
};
