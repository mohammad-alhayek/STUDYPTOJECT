const API_URL = "http://localhost:3000/api/employees";
const COMPANY_URL = "http://localhost:3000/api/companies";
const DEPARTMENT_URL = "http://localhost:3000/api/departments";
const AUTH_URL = "http://localhost:3000/api/auth";

const role = localStorage.getItem("role");

let isEditing = false;

// ===============================
// AUTH HEADERS
// ===============================

function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  };
}

// ===============================
// LOGOUT
// ===============================

document.getElementById("logoutBtn")?.addEventListener("click", async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    await fetch(`${AUTH_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken,
      }),
    });
  } catch (err) {
    console.error(err);
  }

  localStorage.clear();

  window.location.href = "/login";
});

// ===============================
// LOAD COMPANIES
// ===============================

async function loadCompanies() {
  try {
    const res = await fetch(COMPANY_URL, {
      headers: getHeaders(),
    });

    const companies = await res.json();

    const select = document.getElementById("companySelect");

    if (!select) return;

    select.innerHTML = `<option value="">Select Company</option>`;

    companies.forEach((company) => {
      select.innerHTML += `
        <option value="${company.id}">
          ${company.name}
        </option>
      `;
    });
  } catch (err) {
    console.error(err);
  }
}

// ===============================
// LOAD DEPARTMENTS
// ===============================

async function loadDepartments(companyId) {
  const select = document.getElementById("departmentSelect");

  if (!select) return;

  select.innerHTML = `<option value="">Select Department</option>`;

  if (!companyId) return;

  try {
    const res = await fetch(`${DEPARTMENT_URL}/company/${companyId}`, {
      headers: getHeaders(),
    });

    const departments = await res.json();

    departments.forEach((department) => {
      select.innerHTML += `
        <option value="${department.id}">
          ${department.name}
        </option>
      `;
    });
  } catch (err) {
    console.error(err);
  }
}

// ===============================
// COMPANY CHANGED
// ===============================

document.getElementById("companySelect")?.addEventListener("change", (e) => {
  loadDepartments(e.target.value);
});

// ===============================
// LOAD EMPLOYEES
// ===============================

async function loadEmployees() {
  try {
    let url = API_URL;

    if (role !== "admin") {
      url = `${API_URL}/me`;
    } else {
      const params = new URLSearchParams();

      const minSalary = document.getElementById("minSalary")?.value;

      const maxSalary = document.getElementById("maxSalary")?.value;

      const startDate = document.getElementById("startDate")?.value;

      const endDate = document.getElementById("endDate")?.value;

      if (minSalary) params.append("minSalary", minSalary);

      if (maxSalary) params.append("maxSalary", maxSalary);

      if (startDate) params.append("startDate", startDate);

      if (endDate) params.append("endDate", endDate);

      if ([...params].length > 0) {
        url += `?${params.toString()}`;
      }
    }

    const res = await fetch(url, {
      headers: getHeaders(),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(data);
      return;
    }

    const employees = role === "admin" ? data : [data];

    const tbody = document.getElementById("employeesTableBody");

    tbody.innerHTML = "";

    employees.forEach((emp) => {
      tbody.innerHTML += `

      <tr>

        <td>${emp.full_name}</td>

        <td>${emp.User?.email || ""}</td>

        <td>${emp.company?.name || ""}</td>

        <td>${emp.department?.name || ""}</td>

        <td>$${emp.salary || 0}</td>

        <td>${emp.phone || ""}</td>

        <td>

          ${
            role === "admin"
              ? `
            <button
              class="btn-edit"
              onclick="editEmployee('${emp.id}')">
              Edit
            </button>

            <button
              class="btn-delete"
              onclick="deleteEmployee('${emp.id}')">
              Delete
            </button>
            `
              : `
            <button
              class="btn-edit"
              onclick="editMyEmployee('${emp.id}')">
              Edit
            </button>
            `
          }

        </td>

      </tr>

      `;
    });
  } catch (err) {
    console.error(err);
  }
}

// ===============================
// FILTER
// ===============================

document.getElementById("filterBtn")?.addEventListener("click", loadEmployees);

document.getElementById("clearFilterBtn")?.addEventListener("click", () => {
  document.getElementById("minSalary").value = "";
  document.getElementById("maxSalary").value = "";
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";

  loadEmployees();
});
// ===============================
// ADD / UPDATE EMPLOYEE
// ===============================

document
  .getElementById("employeeForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("employeeId").value;

    const employeeData = {
      full_name: document.getElementById("empFullName").value,

      email: document.getElementById("empEmail").value,

      phone: document.getElementById("empPhone").value || null,

      company_id: document.getElementById("companySelect").value,

      department_id: document.getElementById("departmentSelect").value,

      salary: document.getElementById("empSalary").value
        ? parseFloat(document.getElementById("empSalary").value)
        : null,

      hire_date: document.getElementById("empHireDate").value || null,

      address: document.getElementById("empAddress").value || null,
    };

    if (!isEditing) {
      employeeData.password = document.getElementById("empPassword").value;
    }

    const method = isEditing ? "PUT" : "POST";

    const url = isEditing ? `${API_URL}/${id}` : API_URL;

    try {
      console.log(employeeData);
      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(employeeData),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert(
          isEditing
            ? "Employee updated successfully"
            : "Employee added successfully",
        );

        resetForm();

        loadEmployees();
      } else {
        alert(data.message || "Operation failed");
      }
    } catch (err) {
      console.error(err);
    }
  });

// ===============================
// EDIT EMPLOYEE
// ===============================

async function editEmployee(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      headers: getHeaders(),
    });

    const emp = await res.json();

    if (!res.ok) return;

    isEditing = true;

    document.getElementById("formTitle").innerText = "Edit Employee";

    document.getElementById("employeeId").value = emp.id;

    document.getElementById("empFullName").value = emp.full_name;

    document.getElementById("empEmail").value = emp.User?.email || "";

    document.getElementById("empPhone").value = emp.phone || "";

    document.getElementById("empSalary").value = emp.salary || "";

    document.getElementById("empHireDate").value = emp.hire_date || "";

    document.getElementById("empAddress").value = emp.address || "";

    document.getElementById("empPassword").style.display = "none";

    document.getElementById("companySelect").value = emp.company_id;

    await loadDepartments(emp.company_id);

    document.getElementById("departmentSelect").value = emp.department_id;

    document.getElementById("cancelEditBtn").style.display = "inline-block";
  } catch (err) {
    console.error(err);
  }
}

// ===============================
// EDIT MY PROFILE
// ===============================

async function editMyEmployee() {
  try {
    const res = await fetch(`${API_URL}/me`, {
      headers: getHeaders(),
    });

    const emp = await res.json();

    if (!res.ok) return;

    isEditing = true;

    document.getElementById("formTitle").innerText = "Edit My Profile";

    document.getElementById("employeeId").value = emp.id;

    document.getElementById("empFullName").value = emp.full_name;

    document.getElementById("empEmail").value = emp.User?.email || "";

    document.getElementById("empPhone").value = emp.phone || "";

    document.getElementById("empSalary").value = emp.salary || "";

    document.getElementById("empHireDate").value = emp.hire_date || "";

    document.getElementById("empAddress").value = emp.address || "";

    document.getElementById("empPassword").style.display = "none";

    document.getElementById("companySelect").value = emp.company_id;

    await loadDepartments(emp.company_id);

    document.getElementById("departmentSelect").value = emp.department_id;

    document.getElementById("cancelEditBtn").style.display = "inline-block";
  } catch (err) {
    console.error(err);
  }
}

// ===============================
// DELETE EMPLOYEE
// ===============================

async function deleteEmployee(id) {
  if (!confirm("Delete this employee?")) {
    return;
  }

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    if (res.ok) {
      alert("Employee deleted");

      loadEmployees();
    }
  } catch (err) {
    console.error(err);
  }
}

// ===============================
// RESET FORM
// ===============================

function resetForm() {
  isEditing = false;

  document.getElementById("formTitle").innerText = "Add New Employee";

  document.getElementById("employeeForm").reset();

  document.getElementById("employeeId").value = "";

  document.getElementById("empPassword").style.display = "block";

  document.getElementById("cancelEditBtn").style.display = "none";

  document.getElementById("departmentSelect").innerHTML =
    `<option value="">Select Department</option>`;
}

document.getElementById("cancelEditBtn")?.addEventListener("click", resetForm);

// ===============================
// START
// ===============================

if (role !== "admin") {
  document.getElementById("addEmployeeCard").style.display = "none";

  document.getElementById("filterEmployeeCard").style.display = "none";
} else {
  loadCompanies();
}

loadEmployees();
