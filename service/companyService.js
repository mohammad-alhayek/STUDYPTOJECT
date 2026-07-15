import * as companyRepository from "../repositories/companyRepository.js";
import AppError from "../utils/AppError.js";

// ============================
// GET ALL COMPANIES
// ============================

export const getCompanies = async () => {
  return await companyRepository.getAllCompanies();
};

// ============================
// GET COMPANY BY ID
// ============================

export const getCompanyById = async (id) => {
  if (!id) {
    throw new AppError("COMPANY_ID_REQUIRED", 400);
  }

  const company = await companyRepository.getCompanyById(id);

  if (!company) {
    throw new AppError("COMPANY_NOT_FOUND", 404);
  }

  return company;
};

// ============================
// CREATE COMPANY
// ============================

export const createCompany = async (companyData) => {
  const existingCompany = await companyRepository.getCompanyByRegNumber(
    companyData.registration_number,
  );

  if (existingCompany) {
    throw new AppError("COMPANY_REG_NUMBER_ALREADY_EXISTS", 409);
  }

  return await companyRepository.createCompany({
    name: companyData.name,

    registration_number: companyData.registration_number,

    address: companyData.address,

    services: companyData.services,

    user_id: companyData.user_id,
  });
};

// ============================
// UPDATE COMPANY
// ============================

export const updateCompany = async (id, companyData) => {
  if (!id) {
    throw new AppError("COMPANY_ID_REQUIRED", 400);
  }

  const company = await companyRepository.getCompanyById(id);

  if (!company) {
    throw new AppError("COMPANY_NOT_FOUND", 404);
  }

  // Check registration number duplicate

  if (
    companyData.registration_number &&
    companyData.registration_number !== company.registration_number
  ) {
    const existingCompany = await companyRepository.getCompanyByRegNumber(
      companyData.registration_number,
    );

    if (existingCompany) {
      throw new AppError("COMPANY_REG_NUMBER_ALREADY_EXISTS", 409);
    }
  }

  return await companyRepository.updateCompany(id, {
    name: companyData.name,

    registration_number: companyData.registration_number,

    address: companyData.address,

    services: companyData.services,
  });
};

// ============================
// DELETE COMPANY
// ============================

export const deleteCompany = async (id) => {
  if (!id) {
    throw new AppError("COMPANY_ID_REQUIRED", 400);
  }

  const company = await companyRepository.getCompanyById(id);

  if (!company) {
    throw new AppError("COMPANY_NOT_FOUND", 404);
  }

  await companyRepository.deleteCompany(id);

  return true;
};
