// repositories/employeeRepository.js
import Employee from "../model/employeeModel.js";

// GET ALL Employees
export const getAllEmployees = async () => {
  return await Employee.findAll();
};

// GET EMPLOYEE BY ID
export const getEmployeeById = async (id) => {
  if (!id) {
    throw new Error("Employee ID is required");
  }
  return await Employee.findByPk(id);
};

// GET EMPLOYEE BY NAME
export const getEmployeeByName = async (full_name) => {
  return await Employee.findAll({
    where: { full_name: full_name },
  });
};
// getEmployeeByUserId
export const getEmployeeByUserId = async (userId) => {
  return await Employee.findOne({
    where: {
      user_id: userId,
    },
  });
};
// ADD EMPLOYEE
export const addEmployee = async (employee) => {
  const createdEmployee = await Employee.create(employee);

  return createdEmployee;
};

// UPDATE EMPLOYEE
export const updateEmployee = async (id, employee) => {
  if (!id) {
    throw new Error("Employee ID is required");
  }
  await Employee.update(employee, {
    where: { id: id },
  });
  return id;
};

// DELETE EMPLOYEE
export const deleteEmployee = async (id) => {
  if (!id) {
    throw new Error("Employee ID is required");
  }
  await Employee.destroy({
    where: { id: id },
  });
};
