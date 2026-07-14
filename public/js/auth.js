const BASE_URL = "http://localhost:3000/api/auth";

// SAVE USER DATA FROM TOKEN
function saveAuthData(accessToken, refreshToken) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  const payload = JSON.parse(atob(accessToken.split(".")[1]));

  localStorage.setItem("role", payload.role);
  localStorage.setItem("userId", payload.id);
}

// REDIRECT BASED ON ROLE
function redirectByRole() {
  const role = localStorage.getItem("role");

  if (role === "admin") {
    window.location.href = "/users";
  } else {
    window.location.href = "/employees";
  }
}

// LOGIN
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      saveAuthData(data.data.accessToken, data.data.refreshToken);

      alert("Welcome back!");

      redirectByRole();
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error(err);

    alert("Something went wrong");
  }
});

// REGISTER
document
  .getElementById("registerForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const full_name = document.getElementById("regName").value;

    const email = document.getElementById("regEmail").value;

    const password = document.getElementById("regPassword").value;

    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          full_name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        saveAuthData(data.data.accessToken, data.data.refreshToken);

        alert("Registration successful!");

        redirectByRole();
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);

      alert("Something went wrong");
    }
  });
