const promoCodes = JSON.parse(localStorage.getItem("promoCodes")) || {};
const onlineUsers = JSON.parse(localStorage.getItem("onlineUsers")) || {};

// Generate Unique Referral Code
function generateReferralCode(username) {
    return username + Math.random().toString(36).substr(2, 6).toUpperCase();
}

// Generate a Random 12-Character Promo Code
function generatePromoCode(days) {
    let code = Math.random().toString(36).substr(2, 12).toUpperCase();
    promoCodes[code] = { days, used: 0, limit: 1 }; // 1-time use
    localStorage.setItem("promoCodes", JSON.stringify(promoCodes));
    updatePromoList();
    alert(`Generated Promo Code: ${code} for ${days} days.`);
}

// Update Promo Code List
function updatePromoList() {
    let promoList = Object.entries(promoCodes)
        .map(([code, details]) => `${code} - ${details.days} Days (Used: ${details.used}/${details.limit})`)
        .join("\n");
    document.getElementById("promoList").innerText = promoList || "No active promo codes.";
}

// Register a New User
function register() {
    let username = document.getElementById("signupUsername").value;
    let password = document.getElementById("signupPassword").value;
    let promoCode = document.getElementById("promoCode").value.trim().toUpperCase();
    let referralCode = generateReferralCode(username);
    let subscription = "Free";
    let expiry = "N/A";

    if (username === "" || password === "") {
        alert("Please fill all fields.");
        return;
    }

    if (localStorage.getItem(username)) {
        alert("Username already exists!");
        return;
    }

    // Check Promo Code Validity
    if (promoCodes[promoCode] && promoCodes[promoCode].used < promoCodes[promoCode].limit) {
        subscription = "Premium";
        expiry = getExpiryDate(promoCodes[promoCode].days);
        promoCodes[promoCode].used++;
        localStorage.setItem("promoCodes", JSON.stringify(promoCodes));
        updatePromoList();
        alert(`Promo Code Applied! You have ${promoCodes[promoCode].days} days of Premium access.`);
    }

    let userData = { username, password, referralCode, subscription, expiry };
    localStorage.setItem(username, JSON.stringify(userData));

    alert(`Signup successful! Your Referral Code: ${referralCode}`);
    showLogin();
}

// Login User
function login() {
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    // Admin Login
    if (username === "sabbir" && password === "sabbir") {
        alert("Admin Login Successful!");
        localStorage.setItem("loggedInUser", username);
        showAdminPanel();
        return;
    }

    let userData = JSON.parse(localStorage.getItem(username));

    if (userData && userData.password === password) {
        alert("Login successful!");
        localStorage.setItem("loggedInUser", username);
        onlineUsers[username] = new Date().toISOString();
        localStorage.setItem("onlineUsers", JSON.stringify(onlineUsers));
        showDashboard(userData);
    } else {
        alert("Invalid credentials.");
    }
}

// Show Dashboard After Login
function showDashboard(userData) {
    document.getElementById("authSection").style.display = "none";
    document.getElementById("signupSection").style.display = "none";
    document.getElementById("dashboardSection").style.display = "block";

    document.getElementById("userDisplayName").innerText = userData.username;
    document.getElementById("userSubscription").innerText = userData.subscription;
    document.getElementById("userExpiry").innerText = userData.expiry;
    document.getElementById("referralCode").innerText = userData.referralCode;
}

// Logout User
function logout() {
    let username = localStorage.getItem("loggedInUser");
    delete onlineUsers[username];
    localStorage.setItem("onlineUsers", JSON.stringify(onlineUsers));
    localStorage.removeItem("loggedInUser");
    location.reload();
}

// Initialize
window.onload = function () {
    let username = localStorage.getItem("loggedInUser");
    if (username === "sabbir") showAdminPanel();
};
