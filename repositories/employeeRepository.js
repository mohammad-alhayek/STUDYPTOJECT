// repositories/employeeRepository.js

import Employee from "../model/employeeModel.js";
import User from "../model/userModel.js";
import Company from "../model/companyModel.js"; // Import Company model
import Department from "../model/departmentModel.js"; // Import Department model
import { Op } from "sequelize";

// GET EMPLOYEE BY USER ID
export const getEmployeeByUserId = async (user_id) => {
  return await Employee.findOne({
    where: {
      user_id,
    },
    include: [
      {
        model: User,
        attributes: ["email"],
      },
      {
        model: Company,
        as: "company", // Fetch associated company details
      },
      {
        model: Department,
        as: "department", // Fetch associated department details
      },
    ],
  });
};

// GET ALL EMPLOYEES WITH FILTERS
export const getAllEmployees = async (filters = {}) => {
  const where = {};

  // Salary Filter
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

  // Hire Date Filter
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
      {
        model: Company,
        as: "company",
      },
      {
        model: Department,
        as: "department",
      },
    ],
  });
};

// GET EMPLOYEE BY ID
export const getEmployeeById = async (id) => {
  return await Employee.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["email"],
      },
      {
        model: Company,
        as: "company",
      },
      {
        model: Department,
        as: "department",
      },
    ],
  });
};

// CREATE EMPLOYEE
export const addEmployee = async (employee) => {
  return await Employee.create(employee);
};

// UPDATE EMPLOYEE
export const updateEmployee = async (id, employee) => {
  if (!id) {
    throw new Error("Employee ID is required");
  }

  await Employee.update(employee, {
    where: {
      id,
    },
  });

  return await getEmployeeById(id);
};

// DELETE EMPLOYEE
export const deleteEmployee = async (id) => {
  if (!id) {
    throw new Error("Employee ID is required");
  }

  return await Employee.destroy({
    where: {
      id,
    },
  });
};
