const API_URL = "http://localhost:3000/api/departments";
const COMPANY_URL = "http://localhost:3000/api/companies";
const AUTH_URL = "http://localhost:3000/api/auth";

let isEditing = false;

// ======================
// AUTH HEADERS
// ======================

function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  };
}

// ======================
// LOGOUT
// ======================

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

// ======================
// LOAD COMPANIES
// ======================

async function loadCompanies() {
  try {
    const res = await fetch(COMPANY_URL, {
      headers: getAuthHeaders(),
    });

    const companies = await res.json();

    const select = document.getElementById("companySelect");

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

// ======================
// LOAD DEPARTMENTS
// ======================

async function loadDepartments() {
  try {
    const res = await fetch(API_URL, {
      headers: getAuthHeaders(),
    });

    const departments = await res.json();

    console.log(departments);

    if (!res.ok) {
      return;
    }

    const tbody = document.getElementById("departmentsTableBody");

    tbody.innerHTML = "";

    departments.forEach((department) => {
      tbody.innerHTML += `
      <tr>

        <td>${department.name}</td>

        <td>
          ${department.company?.name || ""}
        </td>

        <td>

          <button
            class="btn-edit"
            onclick="editDepartment(
              '${department.id}',
              '${department.name}',
              '${department.company_id}'
            )">

            Edit

          </button>

          <button
            class="btn-delete"
            onclick="deleteDepartment('${department.id}')">

            Delete

          </button>

        </td>

      </tr>
      `;
    });
  } catch (err) {
    console.error(err);
  }
}

// ======================
// ADD / UPDATE
// ======================

document
  .getElementById("departmentForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("departmentId").value;

    const departmentData = {
      name: document.getElementById("departmentName").value,

      company_id: document.getElementById("companySelect").value,
    };

    const method = isEditing ? "PUT" : "POST";

    const url = isEditing ? `${API_URL}/${id}` : API_URL;

    try {
      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(departmentData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(
          isEditing
            ? "Department updated successfully"
            : "Department created successfully",
        );

        resetForm();

        loadDepartments();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  });

// ======================
// EDIT
// ======================

function editDepartment(id, name, companyId) {
  isEditing = true;

  document.getElementById("formTitle").innerText = "Edit Department";

  document.getElementById("departmentId").value = id;

  document.getElementById("departmentName").value = name;

  document.getElementById("companySelect").value = companyId;

  document.getElementById("cancelEditBtn").style.display = "inline-block";
}

// ======================
// RESET
// ======================

function resetForm() {
  isEditing = false;

  document.getElementById("formTitle").innerText = "Add New Department";

  document.getElementById("departmentForm").reset();

  document.getElementById("departmentId").value = "";

  document.getElementById("cancelEditBtn").style.display = "none";
}

document.getElementById("cancelEditBtn")?.addEventListener("click", resetForm);

// ======================
// DELETE
// ======================

async function deleteDepartment(id) {
  if (!confirm("Delete this department?")) {
    return;
  }

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (res.ok) {
      alert("Department deleted successfully");

      loadDepartments();
    }
  } catch (err) {
    console.error(err);
  }
}

// ======================
// START
// ======================

loadCompanies();

loadDepartments();
