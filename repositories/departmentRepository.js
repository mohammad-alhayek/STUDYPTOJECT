import Department from "../model/departmentModel.js";

// Create a new department
export const createDepartment = async (department) => {
  return await Department.create(department);
};

// Get department by ID
export const getDepartmentById = async (id) => {
  return await Department.findByPk(id);
};

// Get departments belonging to a specific company
export const getDepartmentsByCompany = async (companyId) => {
  return await Department.findAll({
    where: { company_id: companyId },
  });
};
