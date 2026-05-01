const form = document.getElementById("signup-form");
const errorMsg = document.getElementById("error");

//vulnerabilities fix: hash passwords
async function hashPassword(password) {
    const encoded = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

//vulnerabilities fix: store a randomized session token
function generateToken() {
    return crypto.randomUUID();
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    
    if(username.length < 5 || username.length > 12){
        errorMsg.textContent = "Username must be 5 to 12 characters long.";
        return;
    }

    if(password.length < 8 || password.length > 20){
        errorMsg.textContent = "Password must be 8 to 20 characters long."
        return;
    }

    const listOfUsers = JSON.parse(localStorage.getItem("listOfUsers")) || [];

    const exists = listOfUsers.some(u => u.username === username || u.email === email);
    if (exists) {
        errorMsg.textContent = "Username or email already in use.";
        return;
    }

    const hashedPassword = await hashPassword(password);
    const token = generateToken();

    listOfUsers.push({ username, email, password: hashedPassword, score: 0});
    localStorage.setItem("listOfUsers", JSON.stringify(listOfUsers));
    localStorage.setItem("sessionToken", token);

    setTimeout(() => {
        window.location.href = "./index.html";
    }, 1000);
});