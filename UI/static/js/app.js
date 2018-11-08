function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

function login(user = "") {
    window.location.replace("../home.html")
    if (user) {
        window.location.replace("home.html")
    }
}

function backHome() {
    window.location.replace("home.html")
}