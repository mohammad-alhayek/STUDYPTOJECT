const API_URL = "http://localhost:3000/api/companies";
const AUTH_URL = "http://localhost:3000/api/auth";

let isEditing = false;

// =========================
// AUTH HEADERS
// =========================

function getAuthHeaders() {
  return {
    "Content-Type": "application/json",

    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  };
}

// =========================
// LOGOUT
// =========================

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

// =========================
// GET ALL COMPANIES
// =========================

async function loadCompanies() {
  try {
    const res = await fetch(API_URL, {
      method: "GET",

      headers: getAuthHeaders(),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error(result);

      return;
    }

    const companies = result.data || result;

    const tbody = document.getElementById("companiesTableBody");

    tbody.innerHTML = "";

    companies.forEach((company) => {
      tbody.innerHTML += `


<tr>


<td>
${company.name || ""}
</td>



<td>
${company.registration_number || ""}
</td>



<td>
${company.address || ""}
</td>



<td>
${company.services || ""}
</td>



<td>

${
  company.latitude && company.longitude
    ? `

<button
class="btn-secondary"
onclick="openMap(
'${company.latitude}',
'${company.longitude}'
)">
🌍 Map
</button>

`
    : ""
}



</td>



<td>


<button
class="btn-edit"
onclick="
editCompany(
'${company.id}',
'${company.name}',
'${company.registration_number}',
'${company.address || ""}',
'${company.services || ""}',
'${company.latitude || ""}',
'${company.longitude || ""}'
)">
Edit
</button>



<button
class="btn-delete"
onclick="
deleteCompany('${company.id}')
">
Delete
</button>



</td>


</tr>


`;
    });
  } catch (err) {
    console.error("Error loading companies:", err);
  }
}

// =========================
// ADD / UPDATE COMPANY
// =========================

document
  .getElementById("companyForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("companyId").value;

    const companyData = {
      name: document.getElementById("companyName").value,

      registration_number: document.getElementById("registrationNumber").value,

      address: document.getElementById("companyAddress").value,

      services: document.getElementById("companyServices").value,

      latitude: document.getElementById("companyLatitude").value
        ? parseFloat(document.getElementById("companyLatitude").value)
        : null,

      longitude: document.getElementById("companyLongitude").value
        ? parseFloat(document.getElementById("companyLongitude").value)
        : null,
    };

    const method = isEditing ? "PUT" : "POST";

    const url = isEditing ? `${API_URL}/${id}` : API_URL;

    try {
      const res = await fetch(url, {
        method,

        headers: getAuthHeaders(),

        body: JSON.stringify(companyData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(
          isEditing
            ? "Company updated successfully"
            : "Company created successfully",
        );

        resetForm();

        loadCompanies();
      } else {
        alert(data.message || "Operation failed");
      }
    } catch (err) {
      console.error(err);
    }
  });

// =========================
// EDIT COMPANY
// =========================

function editCompany(
  id,
  name,
  registration_number,
  address,
  services,
  latitude,
  longitude,
) {
  isEditing = true;

  document.getElementById("formTitle").innerText = "Edit Company";

  document.getElementById("companyId").value = id;

  document.getElementById("companyName").value = name;

  document.getElementById("registrationNumber").value = registration_number;

  document.getElementById("companyAddress").value = address;

  document.getElementById("companyServices").value = services;

  document.getElementById("companyLatitude").value = latitude;

  document.getElementById("companyLongitude").value = longitude;

  document.getElementById("cancelEditBtn").style.display = "inline-block";
}

// =========================
// RESET FORM
// =========================

function resetForm() {
  isEditing = false;

  document.getElementById("companyForm").reset();

  document.getElementById("companyId").value = "";

  document.getElementById("formTitle").innerText = "Add New Company";

  document.getElementById("cancelEditBtn").style.display = "none";
}

document.getElementById("cancelEditBtn")?.addEventListener("click", resetForm);

// =========================
// DELETE COMPANY
// =========================

async function deleteCompany(id) {
  if (!confirm("Delete this company?")) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",

      headers: getAuthHeaders(),
    });

    if (res.ok) {
      alert("Company deleted successfully");

      loadCompanies();
    }
  } catch (err) {
    console.error(err);
  }
}

// =========================
// GOOGLE MAP
// =========================

function openMap(lat, lng) {
  window.open(
    `https://www.google.com/maps?q=${lat},${lng}`,

    "_blank",
  );
}

// =========================
// GET CURRENT LOCATION
// =========================

document.getElementById("getLocationBtn")?.addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");

    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      document.getElementById("companyLatitude").value =
        position.coords.latitude;

      document.getElementById("companyLongitude").value =
        position.coords.longitude;

      alert("Location added successfully");
    },

    () => {
      alert("Cannot get location");
    },
  );
});

// =========================
// OPEN MAP BUTTON
// =========================

document.getElementById("openMapBtn")?.addEventListener("click", () => {
  const lat = document.getElementById("companyLatitude").value;

  const lng = document.getElementById("companyLongitude").value;

  if (!lat || !lng) {
    alert("Please select location first");

    return;
  }

  openMap(lat, lng);
});

// =========================
// START
// =========================

loadCompanies();
