import Company from "../model/companyModel.js";

// ============================
// CREATE COMPANY
// ============================

export const createCompany = async (company) => {
  return await Company.create(company);
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
  await Company.update(
    companyData,

    {
      where: {
        id,
      },
    },
  );

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
