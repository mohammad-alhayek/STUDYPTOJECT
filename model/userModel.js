import { poolPromise } from '../config/db.js';
import bcrypt from "bcrypt";
// GET ALL
export const getAllUsers = async () => {
    const pool = await poolPromise;

    const result = await pool.request()
        .query("SELECT * FROM Users");

    return result.recordset;
};

// GET BY ID
export const getUserById = async (id) => {
    const pool = await poolPromise;

    const result = await pool.request()
        .input('id', id)
        .query("SELECT * FROM Users WHERE id = @id");

    return result.recordset[0];
};
//get user by email
export const getUserByEmail = async (email) => {
    const pool = await poolPromise;

    const result = await pool.request()
        .input('email', email)
        .query(`
            SELECT * FROM Users WHERE email = @email
        `);

    return result.recordset[0];
};

// ADD USER

export const addUser = async (user) => {
    const pool = await poolPromise;
    const hashedPassword = await bcrypt.hash(user.password, 10);

    await pool.request()
        .input('id', user.id) 
        .input('email', user.email)
        .input('full_name', user.full_name)
        .input("password", hashedPassword)
        .input('is_active', user.is_active)
        .input('last_login', user.last_login|| null)
        .query(`
            INSERT INTO Users
            (id, email, full_name, password, is_active, last_login)
            VALUES
            (@id, @email, @full_name, @password, @is_active, @last_login)
        `);
         return user.id; 
};

// UPDATE USER
export const updateUser = async (id, user) => {
    const pool = await poolPromise;

    let hashedPassword = user.password;

    if (user.password) {
        hashedPassword = await bcrypt.hash(user.password, 10);
    }

    await pool.request()
        .input('id', id)
        .input('email', user.email)
        .input('full_name', user.full_name)
        .input('password', hashedPassword)
        .input('is_active', user.is_active)
        .input('last_login', user.last_login|| null)
        .query(`
            UPDATE Users
            SET
                email = @email,
                full_name = @full_name,
                password = @password,
                is_active = @is_active,
                last_login = @last_login
            WHERE id = @id
        `);
                 return id; 

};

// DELETE user
export const deleteUser = async (id) => {
    const pool = await poolPromise;

    await pool.request()
        .input('id', id)
        .query(`
            DELETE FROM Users
            WHERE id = @id
        `);
};