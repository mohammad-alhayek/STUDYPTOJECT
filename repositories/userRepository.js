import { poolPromise } from "../config/db.js";

export const getAllUsers = async () => {
    const pool = await poolPromise;

    const result = await pool.request()
        .query("SELECT * FROM Users");

    return result.recordset;
};

export const getUserById = async (id) => {
    const pool = await poolPromise;

    const result = await pool.request()
        .input("id", id)
        .query("SELECT * FROM Users WHERE id = @id");

    return result.recordset[0];
};

export const getUserByEmail = async (email) => {
    const pool = await poolPromise;

    const result = await pool.request()
        .input("email", email)
        .query("SELECT * FROM Users WHERE email = @email");

    return result.recordset[0];
};

export const addUser = async (user) => {
    const pool = await poolPromise;

    await pool.request()
        .input("id", user.id)
        .input("email", user.email)
        .input("full_name", user.full_name)
        .input("password", user.password)
        .input("is_active", user.is_active)
        .input("last_login", user.last_login || null)
        .query(`
            INSERT INTO Users
            (id, email, full_name, password, is_active, last_login)
            VALUES
            (@id, @email, @full_name, @password, @is_active, @last_login)
        `);

    return user.id;
};

export const updateUser = async (id, user) => {
    const pool = await poolPromise;

    await pool.request()
        .input("id", id)
        .input("email", user.email)
        .input("full_name", user.full_name)
        .input("password", user.password)
        .input("is_active", user.is_active)
        .input("last_login", user.last_login || null)
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

export const deleteUser = async (id) => {
    const pool = await poolPromise;

    await pool.request()
        .input("id", id)
        .query(`
            DELETE FROM Users
            WHERE id = @id
        `);
};

// CREATE USER
export const createUser = async (user) => {
    const pool = await poolPromise;

    await pool.request()
        .input('id', user.id)
        .input('email', user.email)
        .input('password', user.password)
        .query(`
            INSERT INTO Users (id, email, password)
            VALUES (@id, @email, @password)
        `);

    return { id: user.id, email: user.email };
};