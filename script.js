// Show Signup Form
function showSignup() {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("signupSection").style.display = "block";
}

// Show Login Form
function showLogin() {
    document.getElementById("signupSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";
}

// Generate a Random 12-Digit User ID
function generateUserId() {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
}

// Register a New User
function register() {
    let username = document.getElementById("signupUsername").value;
    let password = document.getElementById("signupPassword").value;
    let userId = generateUserId();
    let isPremium = false;

    if (username === "" || password === "") {
        alert("Please fill all fields.");
        return;
    }

    if (localStorage.getItem(username)) {
        alert("Username already exists! Choose a different one.");
        return;
    }

    let userData = { username, password, userId, isPremium };
    localStorage.setItem(username, JSON.stringify(userData));

    // Simulate saving to data.txt (for real-world use, this should be backend-controlled)
    saveToFile(`User: ${username}, ID: ${userId}, Premium: ${isPremium}`);

    alert(`Signup successful! Your User ID: ${userId}`);
    showLogin();
}

// Simulate saving to data.txt (Only works in backend)
function saveToFile(data) {
    console.log("Saving to data.txt:", data);
}

// Login an Existing User
function login() {
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;
    let userData = JSON.parse(localStorage.getItem(username));

    if (userData && userData.password === password) {
        alert("Login successful!");
        localStorage.setItem("loggedInUser", username);
        showTVSection(userData);
    } else {
        alert("Invalid credentials. Try again.");
    }
}

// Show TV Channels After Login
function showTVSection(userData) {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("signupSection").style.display = "none";
    document.getElementById("tvSection").style.display = "block";

    let channels = [
        { name: "Sky Sports", url: "http://20.255.58.170/cric/test.php?id=skysme&e.m3u8", premium: false },
        { name: "ESPN", url: "https://c3s9.vfruitfairy.com/com5/tracks-v1a1/mono.m3u8", premium: false },
        { name: "HBO Max", url: "https://hbo-premium-stream.com/live.m3u8", premium: true },
        { name: "Netflix Live", url: "https://netflix-premium.com/stream.m3u8", premium: true }
    ];

    let channelList = document.getElementById("channelList");
    channelList.innerHTML = "";

    channels.forEach(channel => {
        let channelItem = document.createElement("div");
        channelItem.innerHTML = `<p>${channel.name}</p>`;

        if (channel.premium && !userData.isPremium) {
            channelItem.innerHTML += "<p>🔒 Premium Only</p>";
        } else {
            channelItem.innerHTML += `<button onclick="playChannel('${channel.url}')">Play</button>`;
        }

        channelList.appendChild(channelItem);
    });
}

// Play Selected Channel
function playChannel(url) {
    alert(`Streaming: ${url}`);
}

// Upgrade to Premium
function upgradeToPremium() {
    let username = localStorage.getItem("loggedInUser");
    let userData = JSON.parse(localStorage.getItem(username));

    if (!userData) return;

    userData.isPremium = true;
    localStorage.setItem(username, JSON.stringify(userData));

    alert("You are now a Premium User!");
    showTVSection(userData);
}

// Initialize
window.onload = function () {
    let username = localStorage.getItem("loggedInUser");
    if (username) {
        let userData = JSON.parse(localStorage.getItem(username));
        showTVSection(userData);
    }
};
