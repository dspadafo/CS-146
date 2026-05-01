const greet = document.getElementById("greet");

//vulnerabilities fix: store a randomized session token
const sessionToken = localStorage.getItem("sessionToken");
const listOfUsers = JSON.parse(localStorage.getItem("listOfUsers")) || [];
const loggedInUser = listOfUsers.find(u => u.token === sessionToken) || null;

if (loggedInUser) {
    greet.textContent = "Log out";
} else {
    greet.textContent = "Log in";
}

greet.addEventListener("click", (e) => {
    if (greet.textContent === "Log out") {
        localStorage.removeItem("sessionToken");
        window.location.href = "../index.html";
        greet.textContent = "Log in";
    }
});