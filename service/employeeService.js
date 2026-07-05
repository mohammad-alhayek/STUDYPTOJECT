import * as employeeModel from '../model/employeeModel.js';
import { generateEmployeeId } from '../utils/generateEmployeeId.js';

// GET ALL EMPLOYEES 
export const getEmployees = async () => {
    return await employeeModel.getAllEmployees();
};

// GET EMPLOYEE BY ID
export const getEmployeeById = async (id) => {

    if (!id) {
        throw new Error("Employee ID is required");
    }

    const employee = await employeeModel.getEmployeeById(id);

    if (!employee) {
        throw new Error("Employee not found");
    }

    return employee;
};

// ADD EMPLOYEE
export const addEmployee = async (employee) => {

    
    const id = generateEmployeeId();

    const newEmployee = {
        id,
        ...employee
    };

    return await employeeModel.addEmployee(newEmployee);
};
// UPDATE EMPLOYEE
export const updateEmployee = async (id, employee) => {

    // 🧠 هنا مكان الـ business logic (لاحقاً)
    if (!id) {
        throw new Error("Employee ID is required");
    }

    if (!employee.full_name) {
        throw new Error("Employee name is required");
    }

    return await employeeModel.updateEmployee(id, employee);
};
// DELETE EMPLOYEE
export const deleteEmployee = async (id) => {

    if (!id) {
        throw new Error("Employee ID is required");
    }

    const existing = await employeeModel.getEmployeeById(id);

    if (!existing) {
        throw new Error("Employee not found");
    }

    return await employeeModel.deleteEmployee(id);
};