import * as departmentService from "../service/departmentService.js";
import catchAsync from "../middlewares/catchAsync.js";

console.log("departmentsController loaded");

// GET ALL DEPARTMENTS FOR A SPECIFIC COMPANY
export const getDepartmentsByCompany = catchAsync(async (req, res) => {
  const companyId = req.params.companyId;
  const departments =
    await departmentService.getDepartmentsByCompany(companyId);

  res.status(200).json(departments);
});

// GET DEPARTMENT BY ID
export const getDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const department = await departmentService.getDepartmentById(id);

  res.status(200).json(department);
});

// CREATE DEPARTMENT
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
