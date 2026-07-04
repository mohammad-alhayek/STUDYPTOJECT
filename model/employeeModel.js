import { poolPromise } from '../config/db.js';

// GET ALL
export const getAllEmployees = async () => {
    const pool = await poolPromise;

    const result = await pool.request()
        .query("SELECT * FROM Employees");

    return result.recordset;
};

// GET BY ID
export const getEmployeeById = async (id) => {
    const pool = await poolPromise;

    const result = await pool.request()
        .input('id', id)
        .query("SELECT * FROM Employees WHERE id = @id");

    return result.recordset[0];
};

// GET BY NAME
export const getEmployeeByName = async (full_name) => {
    const pool = await poolPromise;

    const result = await pool.request()
        .input('full_name', full_name)
        .query("SELECT * FROM Employees WHERE full_name = @full_name");

    return result.recordset;
};

// ADD EMPLOYEE
export const addEmployee = async (employee) => {
    const pool = await poolPromise;

    await pool.request()
        .input('user_id', employee.user_id)
        .input('full_name', employee.full_name)
        .input('phone', employee.phone)
        .input('department', employee.department)
        .input('salary', employee.salary)
        .input('hire_date', employee.hire_date)
        .input('address', employee.address)
        .query(`
            INSERT INTO Employees
            (user_id, full_name, phone, department, salary, hire_date, address, created_at)
            VALUES
            (@user_id, @full_name, @phone, @department, @salary, @hire_date, @address, GETDATE())
        `);
};

// UPDATE EMPLOYEE
export const updateEmployee = async (id, employee) => {
    const pool = await poolPromise;

    await pool.request()
        .input('id', id)
        .input('user_id', employee.user_id)
        .input('full_name', employee.full_name)
        .input('phone', employee.phone)
        .input('department', employee.department)
        .input('salary', employee.salary)
        .input('hire_date', employee.hire_date)
        .input('address', employee.address)
        .query(`
            UPDATE Employees
            SET
                user_id = @user_id,
                full_name = @full_name,
                phone = @phone,
                department = @department,
                salary = @salary,
                hire_date = @hire_date,
                address = @address
            WHERE id = @id
        `);
};

// DELETE EMPLOYEE
export const deleteEmployee = async (id) => {
    const pool = await poolPromise;

    await pool.request()
        .input('id', id)
        .query(`
            DELETE FROM Employees
            WHERE id = @id
        `);
};