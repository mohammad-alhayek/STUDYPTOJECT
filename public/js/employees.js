const API_URL = "http://localhost:3000/api/employees";

// تهيئة زر الخروج
document.getElementById("logoutBtn")?.addEventListener("click", async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
  } catch (err) {
    console.error(err);
  } finally {
    localStorage.clear();
    window.location.href = "../auth/login.html";
  }
});

// جلب وعرض الموظفين
async function loadEmployees() {
  try {
    const res = await fetch(API_URL);
    const employees = await res.json();
    const tbody = document.getElementById("employeesTableBody");
    tbody.innerHTML = "";

    employees.forEach((emp) => {
      tbody.innerHTML += `
                <tr>
                    <td>${emp.full_name}</td>
                    <td>${emp.user_id}</td>
                    <td>${emp.department || "N/A"}</td>
                    <td>$${emp.salary || "0.00"}</td>
                    <td>${emp.phone || "N/A"}</td>
                    <td>
                        <button class="btn-delete" onclick="deleteEmployee('${emp.id}')">Delete</button>
                    </td>
                </tr>
            `;
    });
  } catch (err) {
    console.error(err);
  }
}

// إضافة موظف جديد بناءً على الـ Endpoint اللي جهزناها
document
  .getElementById("employeeForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const employeeData = {
      user_id: document.getElementById("empUserId").value,
      full_name: document.getElementById("empFullName").value,
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData),
      });

      if (res.ok) {
        alert("Employee Added Successfully!");
        document.getElementById("employeeForm").reset();
        loadEmployees();
      } else {
        const errData = await res.json();
        alert(`Error: ${errData.message}`);
      }
    } catch (err) {
      console.error(err);
    }
  });

async function deleteEmployee(id) {
  if (confirm("Delete this record?")) {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      loadEmployees();
    } catch (err) {
      console.error(err);
    }
  }
}

loadEmployees();
