import Department from "../model/departmentModel.js";
import Company from "../model/companyModel.js";

// ============================
// CREATE DEPARTMENT
// ============================

export const createDepartment = async (department) => {
  return await Department.create(department);
};

// ============================
// GET DEPARTMENT BY ID
// ============================

export const getDepartmentById = async (id) => {
  return await Department.findByPk(id, {
    include: [
      {
        model: Company,
        as: "company",
        attributes: ["id", "name"],
      },
    ],
  });
};
// ============================
// GET ALL DEPARTMENTS
// ============================

export const getAllDepartments = async () => {
  return await Department.findAll({
    include: [
      {
        model: Company,
        as: "company",
        attributes: ["id", "name"],
      },
    ],
  });
};
// ============================
// GET DEPARTMENTS BY COMPANY
// ============================

export const getDepartmentsByCompany = async (companyId) => {
  return await Department.findAll({
    where: {
      company_id: companyId,
    },
    include: [
      {
        model: Company,
        as: "company",
        attributes: ["id", "name"],
      },
    ],
  });
};

// ============================
// UPDATE DEPARTMENT
// ============================

export const updateDepartment = async (id, departmentData) => {
  await Department.update(departmentData, {
    where: {
      id,
    },
  });

  return await Department.findByPk(id, {
    include: [
      {
        model: Company,
        as: "company",
        attributes: ["id", "name"],
      },
    ],
  });
};
// ============================
// DELETE DEPARTMENT
// ============================

export const deleteDepartment = async (id) => {
  return await Department.destroy({
    where: {
      id,
    },
  });
};
