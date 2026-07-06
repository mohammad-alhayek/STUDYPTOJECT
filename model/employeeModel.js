import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.STRING(36), // varchar(36)
        primaryKey: true,
        allowNull: false // Unchecked تعني إجباري
    },
    user_id: {
        type: DataTypes.STRING(36), // varchar(36)
        allowNull: false // Unchecked
    },
    full_name: {
        type: DataTypes.STRING(100), // varchar(100)
        allowNull: false // Unchecked
    },
    phone: {
        type: DataTypes.STRING(20), // varchar(20)
        allowNull: true // Checked تعني اختياري (NULL)
    },
    department: {
        type: DataTypes.STRING(100), // varchar(100)
        allowNull: true // Checked
    },
    salary: {
        type: DataTypes.DECIMAL(10, 2), // decimal(10,2)
        allowNull: true // Checked
    },
    hire_date: {
        type: DataTypes.DATEONLY, // date (بدون وقت بالـ Sequelize بنستعمل DATEONLY)
        allowNull: true // Checked
    },
    address: {
        type: DataTypes.TEXT, // text
        allowNull: true // Checked
    }
}, {
    tableName: 'Employees', // اسم الجدول الفعلي في قاعدة البيانات عندك
    timestamps: true,       // لتفعيل الـ Timestamps تلقائياً
    createdAt: 'created_at', // ربط حقل الـ created_at بالـ database
    updatedAt: false         // طالما مش موجود بالـ database عندك بنلغيه
});

export default Employee;