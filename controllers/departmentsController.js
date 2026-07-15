import * as departmentService from "../service/departmentService.js";
import catchAsync from "../middlewares/catchAsync.js";

console.log("departmentsController loaded");

// ============================
// GET ALL DEPARTMENTS
// ============================

export const getDepartments = catchAsync(async (req, res) => {
  const departments = await departmentService.getDepartments();

  res.status(200).json(departments);
});

// ============================
// GET DEPARTMENTS BY COMPANY
// ============================

export const getDepartmentsByCompany = catchAsync(async (req, res) => {
  const companyId = req.params.companyId;

  const departments =
    await departmentService.getDepartmentsByCompany(companyId);

  res.status(200).json(departments);
});

// ============================
// GET DEPARTMENT BY ID
// ============================

export const getDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;

  const department = await departmentService.getDepartmentById(id);

  res.status(200).json(department);
});

// ============================
// CREATE DEPARTMENT
// ============================

export const createDepartment = catchAsync(async (req, res) => {
  const departmentData = {
    name: req.body.name,

    company_id: req.body.company_id,
  };

  const newDepartment =
    await departmentService.createDepartment(departmentData);

  res.status(201).json({
    message: req.__("DEPARTMENT_CREATED_SUCCESS"),

    data: newDepartment,
  });
});

// ============================
// UPDATE DEPARTMENT
// ============================

export const updateDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;

  await departmentService.updateDepartment(id, req.body);

  res.status(200).json({
    message: req.__("DEPARTMENT_UPDATED_SUCCESS"),
  });
});

// ============================
// DELETE DEPARTMENT
// ============================

export const deleteDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;

  await departmentService.deleteDepartment(id);

  res.status(200).json({
    message: req.__("DEPARTMENT_DELETED_SUCCESS"),
  });
});
