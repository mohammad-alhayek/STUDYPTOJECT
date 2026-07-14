import Company from "../model/companyModel.js";

// Create a new company
export const createCompany = async (company) => {
  return await Company.create(company);
};

// Get company by ID
export const getCompanyById = async (id) => {
  return await Company.findByPk(id);
};

// Get company by registration number
export const getCompanyByRegNumber = async (regNumber) => {
  return await Company.findOne({
    where: { registration_number: regNumber },
  });
};

// Get all companies
export const getAllCompanies = async () => {
  return await Company.findAll();
};
