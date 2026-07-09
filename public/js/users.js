const API_URL = "http://localhost:3000/api/users";
let isEditing = false;

// دالة مشتركة لتسجيل الخروج وحذف التوكنز
function setupLogout() {
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
}

async function loadUsers() {
  try {
    const res = await fetch(API_URL);
    const users = await res.json();
    const tbody = document.getElementById("usersTableBody");
    tbody.innerHTML = "";

    users.forEach((user) => {
      tbody.innerHTML += `
                <tr>
                    <td>${user.full_name}</td>
                    <td>${user.email}</td>
                    <td>
                        <button class="btn-edit" onclick="editUser('${user.id}', '${user.full_name}', '${user.email}')">Edit</button>
                        <button class="btn-delete" onclick="deleteUser('${user.id}')">Delete</button>
                    </td>
                </tr>
            `;
    });
  } catch (err) {
    console.error("Error fetching users:", err);
  }
}

// add / update
document.getElementById("userForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("userId").value;
  const full_name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;
  const password = document.getElementById("userPassword").value;

  const method = isEditing ? "PUT" : "POST";
  const url = isEditing ? `${API_URL}/${id}` : API_URL;
  const payload = isEditing
    ? { full_name, email }
    : { full_name, email, password };

  try {
    const res = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert(isEditing ? "User updated!" : "User created!");
      resetForm();
      loadUsers();
    }
  } catch (err) {
    console.error(err);
  }
});

function editUser(id, name, email) {
  isEditing = true;
  document.getElementById("formTitle").innerText = "Edit User";
  document.getElementById("userId").value = id;
  document.getElementById("userName").value = name;
  document.getElementById("userEmail").value = email;
  document.getElementById("userPassword").style.display = "none"; // إخفاء الباسورد بالتعديل
  document.getElementById("cancelEditBtn").style.display = "inline-block";
}

function resetForm() {
  isEditing = false;
  document.getElementById("formTitle").innerText = "Add New User";
  document.getElementById("userForm").reset();
  document.getElementById("userPassword").style.display = "block";
  document.getElementById("cancelEditBtn").style.display = "none";
}

document.getElementById("cancelEditBtn")?.addEventListener("click", resetForm);

async function deleteUser(id) {
  if (confirm("Are you sure you want to delete this user?")) {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      loadUsers();
    } catch (err) {
      console.error(err);
    }
  }
}

setupLogout();
loadUsers();
