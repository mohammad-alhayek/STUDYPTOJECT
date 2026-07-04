import * as employeeModel from '../model/employeeModel.js';
console.log("employeesController loaded");
console.log("MODEL:", employeeModel);
// GET ALL
export const getEmployees = async (req, res) => {
    try {
        const employees = await employeeModel.getAllEmployees();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET BY ID
export const getEmployee = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const employee = await employeeModel.getEmployeeById(id);

        if (!employee) {
            return res.status(404).send("Employee not found");
        }

        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ADD EMPLOYEE
export const addEmployee = async (req, res) => {
    try {
        const employee = req.body;

        await employeeModel.addEmployee(employee);

        res.json({
            message: "Employee added successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE EMPLOYEE
export const updateEmployee = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const employee = req.body;

        await employeeModel.updateEmployee(id, employee);

        res.json({
            message: "Employee updated successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE EMPLOYEE
export const deleteEmployee = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        await employeeModel.deleteEmployee(id);

        res.json({
            message: "Employee deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};