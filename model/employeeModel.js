class Employee {
    constructor(
        id,
        user_id,
        full_name,
        phone,
        department,
        salary,
        hire_date,
        address,
        created_at
    ) {
        this.id = id;
        this.user_id = user_id;
        this.full_name = full_name;
        this.phone = phone;
        this.department = department;
        this.salary = salary;
        this.hire_date = hire_date;
        this.address = address;
        this.created_at = created_at;
    }
}

export default Employee;