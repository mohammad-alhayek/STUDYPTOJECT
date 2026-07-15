import * as departmentRepository from "../repositories/departmentRepository.js";
import * as companyRepository from "../repositories/companyRepository.js";
import AppError from "../utils/AppError.js";

// ============================
// GET ALL DEPARTMENTS
// ============================

export const getDepartments = async () => {
  return await departmentRepository.getAllDepartments();
};

// ============================
// GET DEPARTMENTS BY COMPANY ID
// ============================

export const getDepartmentsByCompany = async (companyId) => {
  if (!companyId) {
    throw new AppError("COMPANY_ID_REQUIRED", 400);
  }

  const companyExists = await companyRepository.getCompanyById(companyId);

  if (!companyExists) {
    throw new AppError("COMPANY_NOT_FOUND", 404);
  }

  return await departmentRepository.getDepartmentsByCompany(companyId);
};

// ============================
// GET DEPARTMENT BY ID
// ============================

export const getDepartmentById = async (id) => {
  if (!id) {
    throw new AppError("DEPARTMENT_ID_REQUIRED", 400);
  }

  const department = await departmentRepository.getDepartmentById(id);

  if (!department) {
    throw new AppError("DEPARTMENT_NOT_FOUND", 404);
  }

  return department;
};

// ============================
// CREATE DEPARTMENT
// ============================

export const createDepartment = async (departmentData) => {
  if (!departmentData.company_id) {
    throw new AppError("COMPANY_ID_REQUIRED", 400);
  }

  const companyExists = await companyRepository.getCompanyById(
    departmentData.company_id,
  );

  if (!companyExists) {
    throw new AppError("COMPANY_NOT_FOUND", 404);
  }

  return await departmentRepository.createDepartment({
    name: departmentData.name,
    company_id: departmentData.company_id,
  });
};

// ============================
// UPDATE DEPARTMENT
// ============================

export const updateDepartment = async (id, departmentData) => {
  if (!id) {
    throw new AppError("DEPARTMENT_ID_REQUIRED", 400);
  }

  const department = await departmentRepository.getDepartmentById(id);

  if (!department) {
    throw new AppError("DEPARTMENT_NOT_FOUND", 404);
  }

  if (departmentData.company_id) {
    const companyExists = await companyRepository.getCompanyById(
      departmentData.company_id,
    );

    if (!companyExists) {
      throw new AppError("COMPANY_NOT_FOUND", 404);
    }
  }

  return await departmentRepository.updateDepartment(id, {
    name: departmentData.name,
    company_id: departmentData.company_id,
  });
};

// ============================
// DELETE DEPARTMENT
// ============================

export const deleteDepartment = async (id) => {
  if (!id) {
    throw new AppError("DEPARTMENT_ID_REQUIRED", 400);
  }

  const department = await departmentRepository.getDepartmentById(id);

  if (!department) {
    throw new AppError("DEPARTMENT_NOT_FOUND", 404);
  }

  await departmentRepository.deleteDepartment(id);

  return true;
};
