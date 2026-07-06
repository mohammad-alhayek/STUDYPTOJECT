import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.STRING(36), // varchar(36)
        primaryKey: true,
        allowNull: false // Unchecked (إجباري)
    },
    email: {
        type: DataTypes.STRING(100), // varchar(100)
        allowNull: false, // Unchecked
        unique: true // يفضل دائماً جعل الإيميل فريد لمنع التكرار
    },
    password: {
        type: DataTypes.STRING(255), // varchar(255) ليتسع للـ Hashed password بعد التشفير
        allowNull: false // Unchecked
    },
    is_active: {
        type: DataTypes.INTEGER, // int
        allowNull: true, // Checked (اختياري)
        defaultValue: 1 // يمكنك وضع قيمة افتراضية كـ 1 (نشط) لو أحببت
    },
    last_login: {
        type: DataTypes.DATE, // datetime
        allowNull: true // Checked
    },
    full_name: {
        type: DataTypes.STRING(36), // varchar(36) حسب التحديد (تأكد لو كنت تحتاجها أكبر مستقبلاً)
        field: 'full_Name', // لضمان مطابقة الـ Capitalization بحرف N الكبير كما هو بقاعدتك
        allowNull: true // Checked
    }
}, {
    tableName: 'Users',      // اسم الجدول في قاعدة البيانات
    timestamps: true,        // لتفعيل الـ Timestamps تلقائياً
    createdAt: 'created_at', // يربط حقل الـ created_at بالـ database تلقائياً
    updatedAt: false         // إلغاء الـ updatedAt لعدم وجودها بالجدول
});

export default User;