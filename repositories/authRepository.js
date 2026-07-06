import { poolPromise } from '../config/db.js';

// CREATE USER
export const createUser = async (user) => {
    const pool = await poolPromise;

    await pool.request()
        .input('id', user.id)
        .input('email', user.email)
        .input('password', user.password)
        .input('full_name', user.full_name)
        .input('is_active', user.is_active)
        .input('created_at', user.created_at)
        .input('last_login', user.last_login)
        .query(`
            INSERT INTO Users
            (id, email, password, full_name, is_active, created_at, last_login)
            VALUES
            (@id, @email, @password, @full_name, @is_active, @created_at, @last_login)
        `);

    return user;
};