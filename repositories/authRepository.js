// repositories/authRepository.js
import User from '../model/userModel.js';

// CREATE USER
export const createUser = async (user) => {
    // Sequelize بياخد الكائن وتلقائياً بعمل الـ Insert في جدول الـ Users
    const createdUser = await User.create(user);
    
    // بنرجع الـ user كامل (كـ object) عشان يطابق كودك القديم وما يضرب بالـ service
    return createdUser.toJSON(); 
};