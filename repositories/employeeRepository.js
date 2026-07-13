// repositories/employeeRepository.js
import Employee from "../model/employeeModel.js";
import User from "../model/userModel.js";
import { Op } from "sequelize";

export const getAllEmployees = async (filters = {}) => {
  const where = {};

  // Salary filter
  if (filters.minSalary && filters.maxSalary) {
    where.salary = {
      [Op.between]: [Number(filters.minSalary), Number(filters.maxSalary)],
    };
  } else if (filters.minSalary) {
    where.salary = {
      [Op.gte]: Number(filters.minSalary),
    };
  } else if (filters.maxSalary) {
    where.salary = {
      [Op.lte]: Number(filters.maxSalary),
    };
  }

  // Hire date filter
  if (filters.startDate && filters.endDate) {
    where.hire_date = {
      [Op.between]: [filters.startDate, filters.endDate],
    };
  } else if (filters.startDate) {
    where.hire_date = {
      [Op.gte]: filters.startDate,
    };
  } else if (filters.endDate) {
    where.hire_date = {
      [Op.lte]: filters.endDate,
    };
  }

  return await Employee.findAll({
    where,

    include: [
      {
        model: User,
        attributes: ["email"],
      },
    ],
  });
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
