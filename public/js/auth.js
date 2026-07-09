const BASE_URL = "http://localhost:3000/api/auth";

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
      localStorage.setItem("accessToken", data.data.accessToken);

      localStorage.setItem("refreshToken", data.data.refreshToken);

      alert("Welcome back!");

      window.location.href = "/employees";
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error(err);
  }
});

// (Register)
document
  .getElementById("registerForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please login.");
        window.location.href = "login.html";
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
    }
  });
