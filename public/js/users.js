const API_URL = "http://localhost:3000/api/users";
const AUTH_URL = "http://localhost:3000/api/auth";

let isEditing = false;

// Get token header
function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  };
}

// Logout
function setupLogout() {
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
    } finally {
      localStorage.clear();

      window.location.href = "/login";
    }
  });
}

// GET ALL USERS
async function loadUsers() {
  try {
    const res = await fetch(API_URL, {
      headers: getAuthHeaders(),
    });

    const users = await res.json();

    const tbody = document.getElementById("usersTableBody");

    if (!tbody) {
      console.error("usersTableBody not found");
      return;
    }

    tbody.innerHTML = "";

    users.forEach((user) => {
      tbody.innerHTML += `

        <tr>

          <td>${user.full_name || ""}</td>

          <td>${user.email}</td>

          <td>

            <button 
              class="btn-edit"
              onclick="editUser(
                '${user.id}',
                '${user.full_name}',
                '${user.email}'
              )">
              Edit
            </button>


            <button 
              class="btn-delete"
              onclick="deleteUser('${user.id}')">
              Delete
            </button>

          </td>

        </tr>

      `;
    });
  } catch (err) {
    console.error("Error fetching users:", err);
  }
}

// ADD / UPDATE USER

document.getElementById("userForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("userId").value;

  const full_name = document.getElementById("userName").value;

  const email = document.getElementById("userEmail").value;

  const password = document.getElementById("userPassword").value;

  const method = isEditing ? "PUT" : "POST";

  const url = isEditing ? `${API_URL}/${id}` : `${AUTH_URL}/register`;

  const body = isEditing
    ? {
        full_name,
        email,
      }
    : {
        full_name,
        email,
        password,
      };

  try {
    const res = await fetch(url, {
      method,

      headers: isEditing
        ? getAuthHeaders()
        : {
            "Content-Type": "application/json",
          },

      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.ok) {
      alert(
        isEditing ? "User updated successfully" : "User created successfully",
      );

      resetForm();

      loadUsers();
    } else {
      alert(data.message || "Operation failed");
    }
  } catch (err) {
    console.error("User operation error:", err);
  }
}); // EDIT USER

function editUser(id, name, email) {
  isEditing = true;

  document.getElementById("formTitle").innerText = "Edit User";

  document.getElementById("userId").value = id;

  document.getElementById("userName").value = name;

  document.getElementById("userEmail").value = email;

  document.getElementById("userPassword").style.display = "none";

  document.getElementById("cancelEditBtn").style.display = "inline-block";
}

// RESET FORM

function resetForm() {
  isEditing = false;

  document.getElementById("formTitle").innerText = "Add New User";

  document.getElementById("userForm")?.reset();

  document.getElementById("userPassword").style.display = "block";

  document.getElementById("cancelEditBtn").style.display = "none";
}

document.getElementById("cancelEditBtn")?.addEventListener("click", resetForm);

// DELETE USER

async function deleteUser(id) {
  if (!confirm("Are you sure you want to delete this user?")) {
    return;
  }

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",

      headers: getAuthHeaders(),
    });

    if (res.ok) {
      alert("User deleted successfully");

      loadUsers();
    }
  } catch (err) {
    console.error(err);
  }
}

// Start

setupLogout();

loadUsers();
