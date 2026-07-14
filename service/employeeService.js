import * as employeeRepos from "../repositories/employeeRepository.js";
import AppError from "../utils/AppError.js";
import * as userRepository from "../repositories/userRepository.js";
import * as companyRepository from "../repositories/companyRepository.js"; // Import company repository
import * as departmentRepository from "../repositories/departmentRepository.js"; // Import department repository
import bcrypt from "bcrypt";

// GET ALL EMPLOYEES
export const getEmployees = async (filters) => {
  return await employeeRepos.getAllEmployees(filters);
};

// GET EMPLOYEE BY ID
export const getEmployeeById = async (id) => {
  if (!id) {
    throw new AppError("EMPLOYEE_ID_REQUIRED", 400);
  }

  const employee = await employeeRepos.getEmployeeById(id);

  if (!employee) {
    throw new AppError("EMPLOYEE_NOT_FOUND", 404);
  }

  return employee;
};

// ADD EMPLOYEE
export const addEmployee = async (employee) => {
  // Validate company existence
  const companyExists = await companyRepository.getCompanyById(
    employee.company_id,
  );
  if (!companyExists) {
    throw new AppError("COMPANY_NOT_FOUND", 404);
  }

  // Validate department existence
  const departmentExists = await departmentRepository.getDepartmentById(
    employee.department_id,
  );
  if (!departmentExists) {
    throw new AppError("DEPARTMENT_NOT_FOUND", 404);
  }

  let user = await userRepository.getUserByEmail(employee.email);

  if (!user) {
    // Password is required only for new users
    if (!employee.password) {
      throw new AppError("VALIDATION_PASSWORD_REQUIRED", 400);
    }

    const hashedPassword = await bcrypt.hash(employee.password, 10);

    user = await userRepository.createUser({
      email: employee.email,
      password: hashedPassword,
      full_name: employee.full_name,
      is_active: 1,
      last_login: null,
    });
  } else {
    const existingEmployee = await employeeRepos.getEmployeeByUserId(user.id);

    if (existingEmployee) {
      throw new AppError("EMPLOYEE_ALREADY_EXISTS", 409);
    }
  }

  const createdEmployee = await employeeRepos.addEmployee({
    user_id: user.id,
    full_name: employee.full_name,
    phone: employee.phone,
    salary: employee.salary,
    hire_date: employee.hire_date,
    address: employee.address,
    company_id: employee.company_id, // Map company UUID
    department_id: employee.department_id, // Map department UUID
  });

  return {
    user: {
      id: user.id,
      email: user.email,
    },
    employee: {
      id: createdEmployee.id,
      full_name: createdEmployee.full_name,
      user_id: createdEmployee.user_id,
      company_id: createdEmployee.company_id,
      department_id: createdEmployee.department_id,
    },
  };
};

// UPDATE EMPLOYEE
export const updateEmployee = async (id, employee) => {
  if (!id) {
    throw new AppError("EMPLOYEE_ID_REQUIRED", 400);
  }

  if (!employee.full_name) {
    throw new AppError("EMPLOYEE_NAME_REQUIRED", 400);
  }

  const existingEmployee = await employeeRepos.getEmployeeById(id);

  if (!existingEmployee) {
    throw new AppError("EMPLOYEE_NOT_FOUND", 404);
  }

  return await employeeRepos.updateEmployee(id, employee);
};

// DELETE EMPLOYEE
export const deleteEmployee = async (id) => {
  if (!id) {
    throw new AppError("EMPLOYEE_ID_REQUIRED", 400);
  }

  const existing = await employeeRepos.getEmployeeById(id);

  if (!existing) {
    throw new AppError("EMPLOYEE_NOT_FOUND", 404);
  }

  return await employeeRepos.deleteEmployee(id);
};

// GET EMPLOYEE BY USER ID
export const getEmployeeByUserId = async (user_id) => {
  return await employeeRepos.getEmployeeByUserId(user_id);
};
