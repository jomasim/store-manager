function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

function backHome() {
    window.location.replace("home.html")
}

if (document.getElementById("current-user")) {
    let span = document.getElementById("current-user")
    let current_user = localStorage.getItem("current_user")
    span.innerText = "Logged in as " + current_user
}