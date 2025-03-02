let channels = [
    { name: "Sky Sports", url: "http://20.255.58.170/cric/test.php?id=skysme&e.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/f/f7/Sky_Sports_logo_2020.svg" },
    { name: "ESPN", url: "https://c3s9.vfruitfairy.com/com5/tracks-v1a1/mono.m3u8", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/ESPN_wordmark.svg" },
    { name: "CNN", url: "https://sendgbxt.ruscfd.lat/720p.m3u8", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/CNN.svg" },
    { name: "BBC News", url: "http://20.255.58.170/cric/test.php?id=hdchnl2&e.m3u8", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/BBC_News_2019.svg" }
];

let isLoggedIn = localStorage.getItem("loggedIn") === "true";

// Show/Hide Login & Channels Based on Authentication
function checkLoginStatus() {
    if (isLoggedIn) {
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("logoutBtn").style.display = "block";
        document.getElementById("channelTitle").style.display = "block";
        document.getElementById("channelList").style.display = "flex";
        displayChannels();
    } else {
        document.getElementById("loginSection").style.display = "block";
        document.getElementById("logoutBtn").style.display = "none";
        document.getElementById("channelTitle").style.display = "none";
        document.getElementById("channelList").style.display = "none";
    }
}

// Display Channels with Logos
function displayChannels() {
    let channelList = document.getElementById("channelList");
    channelList.innerHTML = "";
    channels.forEach((channel, index) => {
        let channelBox = document.createElement("div");
        channelBox.className = "channel-box";
        channelBox.innerHTML = `<img src="${channel.logo}" alt="${channel.name}"><p>${channel.name}</p>`;
        channelBox.onclick = () => changeChannel(index);
        channelList.appendChild(channelBox);
    });
}

// Change Channel
function changeChannel(index) {
    if (!isLoggedIn) {
        alert("Please login to watch!");
        return;
    }
    document.getElementById('videoSource').src = channels[index].url;
    document.getElementById('tvPlayer').load();
}

// Login Function
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
        isLoggedIn = true;
        localStorage.setItem("loggedIn", "true");
        alert("Login Successful!");
        checkLoginStatus();
    } else {
        alert("Invalid Credentials!");
    }
}

// Logout Function
function logout() {
    isLoggedIn = false;
    localStorage.removeItem("loggedIn");
    alert("Logged Out!");
    checkLoginStatus();
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Initialize
window.onload = checkLoginStatus;
