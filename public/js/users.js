const API_URL = "http://localhost:3000/api/users";
const AUTH_URL = "http://localhost:3000/api/auth";

const role = localStorage.getItem("role");

let isEditing = false;

// Headers

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
    }

    localStorage.clear();

    window.location.href = "/login";
  });
}

// GET USERS

async function loadUsers() {
  try {
    let url = API_URL;

    // normal user

    if (role !== "admin") {
      url = `${API_URL}/me`;
    }

    const res = await fetch(url, {
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(data);

      return;
    }

    const users = role === "admin" ? data : [data];

    const tbody = document.getElementById("usersTableBody");

    if (!tbody) {
      console.error("usersTableBody not found");

      return;
    }

    tbody.innerHTML = "";

    users.forEach((user) => {
      tbody.innerHTML += `

      <tr>

        <td>
          ${user.full_name || ""}
        </td>


        <td>
          ${user.email || ""}
        </td>


        <td>


        <button 
          class="btn-edit"
          onclick="
          editUser(
          '${user.id}',
          '${user.full_name}',
          '${user.email}'
          )">

          Edit

        </button>



        ${
          role === "admin"
            ? `
          <button
          class="btn-delete"
          onclick="deleteUser('${user.id}')">

          Delete

          </button>
          `
            : ""
        }


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

  let url;
  let method;
  let body;

  // user update himself

  if (role !== "admin") {
    url = `${API_URL}/me`;

    method = "PUT";

    body = {
      full_name,

      email,
    };
  }

  // admin
  else {
    method = isEditing ? "PUT" : "POST";

    url = isEditing ? `${API_URL}/${id}` : `${AUTH_URL}/register`;

    body = isEditing
      ? {
          full_name,
          email,
        }
      : {
          full_name,
          email,
          password,
        };
  }

  try {
    const res = await fetch(url, {
      method,

      headers:
        role !== "admin" || isEditing
          ? getAuthHeaders()
          : {
              "Content-Type": "application/json",
            },

      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.ok) {
      alert("User saved successfully");

      resetForm();

      loadUsers();
    } else {
      alert(data.message || "Operation failed");
    }
  } catch (err) {
    console.error(err);
  }
});

// EDIT USER

function editUser(id, name, email) {
  isEditing = true;

  document.getElementById("formTitle").innerText = "Edit User";

  document.getElementById("userId").value = id;

  document.getElementById("userName").value = name;

  document.getElementById("userEmail").value = email;

  document.getElementById("userPassword").style.display = "none";

  document.getElementById("cancelEditBtn").style.display = "inline-block";
}

// RESET

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
  if (role !== "admin") {
    alert("Access denied");

    return;
  }

  if (!confirm("Are you sure you want to delete this user?")) return;

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

// START

setupLogout();

loadUsers();
