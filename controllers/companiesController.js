import * as companyService from "../service/companyService.js";
import catchAsync from "../middlewares/catchAsync.js";

console.log("companiesController loaded");

// GET ALL COMPANIES
export const getCompanies = catchAsync(async (req, res) => {
  const companies = await companyService.getCompanies();
  res.status(200).json(companies);
});

// GET COMPANY BY ID
export const getCompany = catchAsync(async (req, res) => {
  const id = req.params.id;
  const company = await companyService.getCompanyById(id);

  res.status(200).json(company);
});

// CREATE COMPANY
export const createCompany = catchAsync(async (req, res) => {
  const companyData = {
    name: req.body.name,
    registration_number: req.body.registration_number,
    address: req.body.address,
    services: req.body.services,
    user_id: req.user.id, // Set the current logged-in user (admin) as owner
  };

  const newCompany = await companyService.createCompany(companyData);

  res.status(201).json({
    message: req.__("COMPANY_CREATED_SUCCESS"),
    data: newCompany,
  });
});

// UPDATE COMPANY
export const updateCompany = catchAsync(async (req, res) => {
  const id = req.params.id;

  await companyService.updateCompany(id, req.body);

  res.json({
    message: req.__("COMPANY_UPDATED_SUCCESS"),
  });
});

// DELETE COMPANY
export const deleteCompany = catchAsync(async (req, res) => {
  const id = req.params.id;

  await companyService.deleteCompany(id);

  res.json({
    message: req.__("COMPANY_DELETED_SUCCESS"),
  });
});
