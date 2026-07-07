import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.STRING(36), 
        primaryKey: true,
        allowNull: false    
    },
    user_id: {
        type: DataTypes.STRING(36), 
        allowNull: false 
    },
    full_name: {
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    phone: {
        type: DataTypes.STRING(20), 
        allowNull: true 
    },
    department: {
        type: DataTypes.STRING(100), 
        allowNull: true 
    },
    salary: {
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: true 
    },
    hire_date: {
        type: DataTypes.DATEONLY, 
        allowNull: true 
    },
    address: {
        type: DataTypes.TEXT, 
        allowNull: true 
    }
}, {
    tableName: 'Employees', 
    timestamps: true,      
    createdAt: 'created_at', 
    updatedAt: false          
});

export default Employee;