// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(button => {
  button.addEventListener('click', function () {
    const input = document.getElementById(this.dataset.target);
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    this.textContent = type === 'password' ? '👁️' : '🙈';
  });
});

// Show password strength
document.getElementById("reg-password").addEventListener("input", function () {
  const strengthDisplay = document.getElementById("password-strength");
  const password = this.value;

  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const levels = ["Too Weak", "Weak", "Medium", "Strong"];
  const colors = ["#d9534f", "#f0ad4e", "#5bc0de", "#5cb85c"];

  strengthDisplay.textContent = levels[strength] || "Very Weak";
  strengthDisplay.style.color = colors[strength] || "#d9534f";
});

// Register form submit
document.getElementById("register-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;
  const confirmPassword = document.getElementById("reg-confirm-password").value;
  const errorMsg = document.getElementById("reg-error-msg");

  // Password match check
  if (password !== confirmPassword) {
    errorMsg.textContent = "Passwords do not match.";
    return;
  }

  // Password strength rules
  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    errorMsg.textContent =
      "Password must be at least 8 characters and include a capital letter and a number.";
    return;
  }

  // Firebase register
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Registration successful!");
      window.location.href = "login.html";
    })
    .catch((error) => {
      errorMsg.textContent = error.message;
    });
});
