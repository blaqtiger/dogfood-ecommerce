// 👁️ Toggle password visibility
document.getElementById('togglePassword')?.addEventListener('click', function () {
  const passwordInput = document.getElementById('password');
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  this.textContent = type === 'password' ? '👁️' : '🙈';
});

// 🔐 Login with Firebase + Remember Me
document.getElementById("login-form")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const rememberMe = document.getElementById("rememberMe").checked;

  const persistence = rememberMe
    ? firebase.auth.Auth.Persistence.LOCAL   // Stay logged in
    : firebase.auth.Auth.Persistence.SESSION; // Logout on tab close

  firebase.auth().setPersistence(persistence)
    .then(() => {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .then((userCredential) => {
      alert("Login successful!");
      window.location.href = "shop.html"; // You can change to "index.html"
    })
    .catch((error) => {
      document.getElementById("error-msg").textContent = error.message;
    });
});
