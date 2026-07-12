const API_URL = "http://localhost:3000/api/employees";
const AUTH_URL = "http://localhost:3000/api/auth";

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

// GET ALL EMPLOYEES

async function loadEmployees() {
  try {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const employees = await res.json();

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

          <td>${emp.user_id || ""}</td>

          <td>${emp.department || "N/A"}</td>

          <td>$${emp.salary || "0.00"}</td>

          <td>${emp.phone || "N/A"}</td>


          <td>

            <button 
              class="btn-delete"
              onclick="deleteEmployee('${emp.id}')">
              Delete
            </button>

          </td>

        </tr>

      `;
    });
  } catch (err) {
    console.error("Error loading employees:", err);
  }
}

// ADD EMPLOYEE

document
  .getElementById("employeeForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

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
        alert("Employee Added Successfully!");

        document.getElementById("employeeForm").reset();

        loadEmployees();
      } else {
        alert(data.message || "Error adding employee");
      }
    } catch (err) {
      console.error(err);
    }
  });

// DELETE EMPLOYEE

async function deleteEmployee(id) {
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

loadEmployees();
