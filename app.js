// ================================
// Aung Sales Manager
// Login + Sign Up + 7-Day Trial
// ================================

function showLogin() {
  document.getElementById("loginForm").classList.remove("hidden");
  document.getElementById("signupForm").classList.add("hidden");

  document.getElementById("loginTab").classList.add("active");
  document.getElementById("signupTab").classList.remove("active");

  clearMessage();
}

function showSignup() {
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("signupForm").classList.remove("hidden");

  document.getElementById("loginTab").classList.remove("active");
  document.getElementById("signupTab").classList.add("active");

  clearMessage();
}

// ================================
// SIGN UP
// ================================

function signup() {

  const name = document.getElementById("signupName").value.trim();
  const username = document.getElementById("signupUsername").value.trim();
  const password = document.getElementById("signupPassword").value;

  if (!name || !username || !password) {
    showMessage("⚠️ Please fill in all fields.");
    return;
  }

  if (password.length < 4) {
    showMessage("⚠️ Password must be at least 4 characters.");
    return;
  }

  const existingUser = localStorage.getItem("aungSalesUser");

  if (existingUser) {
    showMessage("⚠️ An account already exists. Please Login.");
    return;
  }

  const today = new Date();
  const trialEnd = new Date(today);

  trialEnd.setDate(today.getDate() + 7);

  const user = {
    name: name,
    username: username,
    password: password,
    trialStart: today.toISOString(),
    trialEnd: trialEnd.toISOString()
  };

  localStorage.setItem("aungSalesUser", JSON.stringify(user));

  showMessage("✅ Account created! Your 7-Day FREE Trial has started.");

  setTimeout(() => {
    showLogin();

    document.getElementById("loginUsername").value = username;

  }, 1200);
}

// ================================
// LOGIN
// ================================

function login() {

  const username =
    document.getElementById("loginUsername").value.trim();

  const password =
    document.getElementById("loginPassword").value;

  if (!username || !password) {
    showMessage("⚠️ Please enter username and password.");
    return;
  }

  const savedUser =
    localStorage.getItem("aungSalesUser");

  if (!savedUser) {
    showMessage("⚠️ No account found. Please Sign Up first.");
    return;
  }

  const user = JSON.parse(savedUser);

  if (
    username === user.username &&
    password === user.password
  ) {

    localStorage.setItem("aungSalesLoggedIn", "true");

    showMessage("✅ Login successful!");

    setTimeout(() => {
      openDashboard(user);
    }, 700);

  } else {

    showMessage("❌ Incorrect username or password.");

  }
}

// ================================
// DASHBOARD
// ================================

function openDashboard(user) {

  document.querySelector(".app").innerHTML = `

    <div class="dashboard">

      <div class="dashboard-header">

        <div>
          <h1>📊 Aung Sales Manager</h1>
          <p>Welcome back, ${user.name} 👋</p>
        </div>

        <button class="logout-btn" onclick="logout()">
          Logout
        </button>

      </div>

      <div class="trial-status">
        🎁 <strong>7-Day FREE Trial</strong>
        <span id="trialDays"></span>
      </div>

      <div class="stats">

        <div class="stat-card">
          <span>💰</span>
          <h3>Today Sales</h3>
          <strong>0 Ks</strong>
        </div>

        <div class="stat-card">
          <span>📈</span>
          <h3>Today Profit</h3>
          <strong>0 Ks</strong>
        </div>

        <div class="stat-card">
          <span>🛒</span>
          <h3>Orders</h3>
          <strong>0</strong>
        </div>

        <div class="stat-card">
          <span>👥</span>
          <h3>Customers</h3>
          <strong>0</strong>
        </div>

      </div>

      <div class="section">

        <h2>⚡ Quick Actions</h2>

        <div class="quick-actions">

          <button onclick="addSale()">
            ➕ Add Sale
          </button>

          <button onclick="showComingSoon('Products')">
            📦 Products
          </button>

          <button onclick="showComingSoon('Customers')">
            👤 Customers
          </button>

          <button onclick="showComingSoon('Reports')">
            📊 Reports
          </button>

        </div>

      </div>

      <div class="section">

        <h2>🎯 Sales Performance</h2>

        <div class="performance">

          <p>Monthly Target</p>

          <div class="progress">
            <div class="progress-bar"></div>
          </div>

          <p class="target-text">
            0% Achievement
          </p>

        </div>

      </div>

      <div class="section">

        <h2>💼 Management</h2>

        <div class="management-grid">

          <button onclick="showComingSoon('Sales Team')">
            👥 Sales Team
          </button>

          <button onclick="showComingSoon('Customers')">
            🏪 Customers
          </button>

          <button onclick="showComingSoon('Products')">
            📦 Products
          </button>

          <button onclick="showComingSoon('Expenses')">
            💸 Expenses
          </button>

          <button onclick="showComingSoon('Targets')">
            🎯 Targets
          </button>

          <button onclick="showComingSoon('AI Sales Assistant')">
            🤖 AI Sales Assistant
          </button>

        </div>

      </div>

      <footer>
        © 2026 Aung Sales Manager
      </footer>

    </div>
  `;

  updateTrialDays(user);
}

// ================================
// TRIAL DAYS
// ================================

function updateTrialDays(user) {

  const today = new Date();
  const end = new Date(user.trialEnd);

  const difference = end - today;

  const days = Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );

  const trialElement =
    document.getElementById("trialDays");

  if (!trialElement) return;

  if (days > 0) {

    trialElement.innerHTML =
      ` — ${days} day${days === 1 ? "" : "s"} remaining`;

  } else {

    trialElement.innerHTML =
      ` — Trial expired`;

  }
}

// ================================
// ADD SALE
// ================================

function addSale() {

  const amount = prompt(
    "Enter today's sale amount (Ks):"
  );

  if (amount === null) return;

  const sale = Number(amount);

  if (isNaN(sale) || sale < 0) {

    alert("Please enter a valid amount.");

    return;
  }

  localStorage.setItem(
    "todaySales",
    sale
  );

  alert(
    "✅ Sale added successfully: " +
    sale.toLocaleString() +
    " Ks"
  );
}

// ================================
// COMING SOON
// ================================

function showComingSoon(feature) {

  alert(
    "🚀 " +
    feature +
    " module is coming next!"
  );
}

// ================================
// LOGOUT
// ================================

function logout() {

  localStorage.removeItem("aungSalesLoggedIn");

  location.reload();
}

// ================================
// MESSAGE
// ================================

function showMessage(text) {

  const message =
    document.getElementById("message");

  if (message) {
    message.innerText = text;
  }
}

function clearMessage() {

  const message =
    document.getElementById("message");

  if (message) {
    message.innerText = "";
  }
}
