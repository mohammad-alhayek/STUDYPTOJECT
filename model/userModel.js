class User {
    constructor(
        id,
        email,
        password,
        is_active,
        created_at,
        last_login,
        full_name
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.is_active = is_active;
        this.created_at = created_at;
        this.last_login = last_login;
        this.full_name = full_name;
    }
}

export default User;