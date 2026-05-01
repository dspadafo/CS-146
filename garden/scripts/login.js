const form = document.getElementById("login-form");
const errorMsg = document.getElementById("error");

//vulnerabilities fix: hash passwords
async function hashPassword(password) {
    const encoded = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!(username && password)) {
        errorMsg.textContent = "All fields are required.";
        return;
    }

    const listOfUsers = JSON.parse(localStorage.getItem("listOfUsers")) || [];
    const hashedPassword = await hashPassword(password);

    const user = listOfUsers.find(x => x.username === username && x.password === hashedPassword);

    if (user) {
        localStorage.setItem("sessionToken", user.token);
        setTimeout(() => {
            window.location.href = "./index.html";
        }, 1000);
    } else {
        errorMsg.textContent = "Invalid info.";
    }
});
