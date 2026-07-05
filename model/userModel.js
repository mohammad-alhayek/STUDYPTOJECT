import { poolPromise } from '../config/db.js';
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


// ADD USER

export const addEmployee = async (user) => {
    const pool = await poolPromise;

    await pool.request()
        .input('id', user.id) 
        .input('email', user.email)
        .input('full_name', employee.full_name)
        .input('password', user.password)
        .input('is_active', user.is_active)
        .input('last_login', user.last_login)
        .query(`
            INSERT INTO Users
            (id, email, full_name, password, is_active, last_login)
            VALUES
            (@id, @email, @full_name, @password, @is_active, @last_login)
        `);
         return users.id; 
};

// UPDATE USER
export const updateEmployee = async (id, employee) => {
    const pool = await poolPromise;

     await pool.request()
        .input('id', user.id) 
        .input('email', user.email)
        .input('full_name', employee.full_name)
        .input('password', user.password)
        .input('is_active', user.is_active)
        .input('last_login', user.last_login)
        .query(`
            UPDATE Users
            SET
    
             id=@id,
             email@email, 
             full_name=@full_name,
            password=@password,
            is_active=@is_active,
            last_login=@last_login)
            WHERE id = @id
        `);
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