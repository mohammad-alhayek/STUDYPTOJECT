import Company from "../model/companyModel.js";

// ============================
// CREATE COMPANY
// ============================

export const createCompany = async (company) => {
  return await Company.create({
    name: company.name,
    registration_number: company.registration_number,
    address: company.address,
    services: company.services,
    latitude: company.latitude,
    longitude: company.longitude,
    user_id: company.user_id,
  });
};

// ============================
// GET COMPANY BY ID
// ============================

export const getCompanyById = async (id) => {
  return await Company.findByPk(id);
};

// ============================
// GET COMPANY BY REGISTRATION NUMBER
// ============================

export const getCompanyByRegNumber = async (regNumber) => {
  return await Company.findOne({
    where: {
      registration_number: regNumber,
    },
  });
};

// ============================
// GET ALL COMPANIES
// ============================

export const getAllCompanies = async () => {
  return await Company.findAll();
};

// ============================
// UPDATE COMPANY
// ============================

export const updateCompany = async (id, companyData) => {
  const updateData = {};

  if (companyData.name !== undefined) updateData.name = companyData.name;

  if (companyData.registration_number !== undefined)
    updateData.registration_number = companyData.registration_number;

  if (companyData.address !== undefined)
    updateData.address = companyData.address;

  if (companyData.services !== undefined)
    updateData.services = companyData.services;

  if (companyData.latitude !== undefined)
    updateData.latitude = companyData.latitude;

  if (companyData.longitude !== undefined)
    updateData.longitude = companyData.longitude;

  await Company.update(updateData, {
    where: {
      id,
    },
  });

  return await Company.findByPk(id);
};
// ============================
// DELETE COMPANY
// ============================

export const deleteCompany = async (id) => {
  return await Company.destroy({
    where: {
      id,
    },
  });
};
