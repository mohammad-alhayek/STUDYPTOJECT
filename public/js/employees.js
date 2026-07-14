const API_URL = "http://localhost:3000/api/employees";
const AUTH_URL = "http://localhost:3000/api/auth";

const role = localStorage.getItem("role");

// Logout
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

// GET EMPLOYEES

async function loadEmployees() {
  try {
    let url = API_URL;

    // USER GET OWN EMPLOYEE
    if (role !== "admin") {
      url = `${API_URL}/me`;
    }

    // ADMIN FILTERS
    else {
      const minSalary = document.getElementById("minSalary")?.value;

      const maxSalary = document.getElementById("maxSalary")?.value;

      const startDate = document.getElementById("startDate")?.value;

      const endDate = document.getElementById("endDate")?.value;

      const params = new URLSearchParams();

      if (minSalary) {
        params.append("minSalary", minSalary);
      }

      if (maxSalary) {
        params.append("maxSalary", maxSalary);
      }

      if (startDate) {
        params.append("startDate", startDate);
      }

      if (endDate) {
        params.append("endDate", endDate);
      }

      if ([...params].length > 0) {
        url += `?${params.toString()}`;
      }
    }

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(data);

      return;
    }

    const employees = role === "admin" ? data : [data];

    const tbody = document.getElementById("employeesTableBody");

    if (!tbody) {
      console.error("employeesTableBody not found");

      return;
    }

    tbody.innerHTML = "";

    employees.forEach((emp) => {
      tbody.innerHTML += `

        <tr>

          <td>${emp.full_name || ""}</td>


          <td>
            ${emp.User?.email || ""}
          </td>


          <td>
            ${emp.department || "N/A"}
          </td>


          <td>
            $${emp.salary || "0.00"}
          </td>


          <td>
            ${emp.phone || "N/A"}
          </td>



          <td>


          ${
            role === "admin"
              ? `
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
    console.error("Error loading employees:", err);
  }
}

// FILTER BUTTON

document.getElementById("filterBtn")?.addEventListener("click", () => {
  loadEmployees();
});

// CLEAR FILTER

document.getElementById("clearFilterBtn")?.addEventListener("click", () => {
  document.getElementById("minSalary").value = "";

  document.getElementById("maxSalary").value = "";

  document.getElementById("startDate").value = "";

  document.getElementById("endDate").value = "";

  loadEmployees();
});

// ADD EMPLOYEE (ADMIN ONLY)

document
  .getElementById("employeeForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (role !== "admin") {
      alert("Access denied");

      return;
    }

    const employeeData = {
      full_name: document.getElementById("empFullName").value,

      email: document.getElementById("empEmail").value,

      password: document.getElementById("empPassword").value,

      phone: document.getElementById("empPhone").value || null,

      department: document.getElementById("empDept").value || null,

      salary: document.getElementById("empSalary").value
        ? parseFloat(document.getElementById("empSalary").value)
        : null,

      hire_date: document.getElementById("empHireDate").value || null,

      address: document.getElementById("empAddress").value || null,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },

        body: JSON.stringify(employeeData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Employee Added Successfully");

        document.getElementById("employeeForm").reset();

        loadEmployees();
      } else {
        alert(data.message || "Error");
      }
    } catch (err) {
      console.error(err);
    }
  });

// DELETE EMPLOYEE

async function deleteEmployee(id) {
  if (role !== "admin") {
    alert("Access denied");

    return;
  }

  if (!confirm("Delete this employee?")) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (res.ok) {
      alert("Employee deleted");

      loadEmployees();
    }
  } catch (err) {
    console.error(err);
  }
}

// START

loadEmployees();
