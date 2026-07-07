// import { DataTypes } from 'sequelize';
// import { sequelize } from '../config/db.js';

// const User = sequelize.define('User', {
//     id: {
//         type: DataTypes.STRING(36), 
//         primaryKey: true,
//         allowNull: false 
//     },
//     email: {
//         type: DataTypes.STRING(100), 
//         allowNull: false, 
//         unique: true 
//     },
//     password: {
//         type: DataTypes.STRING(255),  
//         allowNull: false 
//     },
//     is_active: {
//         type: DataTypes.INTEGER, 
//         allowNull: true, 
//         defaultValue: 1 
//     },
//     last_login: {
//         type: DataTypes.DATE, 
//         allowNull: true 
//     },
//     full_name: {
//         type: DataTypes.STRING(36),          
//         field: 'full_Name',
//         allowNull: true,
//         defaultValue:'g'

//             }
// }, {
//     tableName: 'Users',      
//     timestamps: true,        
//     createdAt: 'created_at', 
//     updatedAt: false    
// });

// export default User;

import { DataTypes, Sequelize } from 'sequelize'; // أضفنا Sequelize هنا لاستخدام دالة GETDATE
import { sequelize } from '../config/db.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.STRING(36), 
        primaryKey: true,
        allowNull: false 
    },
    email: {
        type: DataTypes.STRING(100), 
        allowNull: false, 
        unique: true 
    },
    password: {
        type: DataTypes.STRING(255),  
        allowNull: false 
    },
    is_active: {
        type: DataTypes.INTEGER, 
        allowNull: true, 
        defaultValue: 1 
    },
    // تم إضافة الحقل هنا بالمكان الصحيح ⬇️
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'created_at',
        defaultValue: Sequelize.literal('GETDATE()') // يطلب الوقت مباشرة من ساعة الـ SQL Server بالصيغة الصحيحة
    },
    last_login: {
        type: DataTypes.DATE, 
        allowNull: true 
    },
    full_name: {
        type: DataTypes.STRING(36),          
        field: 'full_Name',
        allowNull: true,
        defaultValue: 'g'
    }
}, {
    tableName: 'Users',      
    timestamps: false // 👈 غيرناها لـ false لأننا عرّفنا الـ created_at يدويًا فوق لحل مشكلة الـ Conversion
});

export default User;