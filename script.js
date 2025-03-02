let channels = [
    { name: "Sky Sports", url: "http://20.255.58.170/cric/test.php?id=skysme&e.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/f/f7/Sky_Sports_logo_2020.svg", type: "video", premium: false },
    { name: "ESPN", url: "https://c3s9.vfruitfairy.com/com5/tracks-v1a1/mono.m3u8", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/ESPN_wordmark.svg", type: "video", premium: false },
    { name: "BBC News", url: "http://20.255.58.170/cric/test.php?id=hdchnl2&e.m3u8", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/BBC_News_2019.svg", type: "video", premium: false },
    { name: "YouTube Live", url: "https://www.youtube.com/embed/live_stream?channel=UC4R8DWoMoI7CAwX8_LjQHig", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg", type: "embed", premium: true }
];

let isLoggedIn = localStorage.getItem("loggedIn") === "true";

// AI-Based Recommendations
function generateRecommendations() {
    let recommendedList = document.getElementById("recommendedList");
    recommendedList.innerHTML = channels.map(channel => `
        <div class="channel-box" onclick="changeChannel('${channel.url}', '${channel.type}')">
            <img src="${channel.logo}" alt="${channel.name}"><p>${channel.name}</p>
        </div>
    `).join('');
}

// Live Notifications
function showNotification(message) {
    let notificationBox = document.getElementById("notifications");
    notificationBox.innerText = message;
    notificationBox.style.display = "block";
    setTimeout(() => notificationBox.style.display = "none", 5000);
}

// Chat System
function sendMessage() {
    let message = document.getElementById("chatInput").value;
    if (message.trim() !== "") {
        document.getElementById("chatBox").innerHTML += `<p>${message}</p>`;
        document.getElementById("chatInput").value = "";
    }
}

// Initialize
window.onload = function () {
    if (isLoggedIn) generateRecommendations();
    showNotification("🔥 New Live Event: FIFA Final at 8PM!");
};
