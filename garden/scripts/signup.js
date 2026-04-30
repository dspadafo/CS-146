const form = document.getElementById("signup-form");
const errorMsg = document.getElementById("error");

form.addEventListener("submit", (e) => {
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

    const users = JSON.parse(localStorage.getItem("users")) || [];

    users.push({username, email, password})
    
    localStorage.setItem("users", JSON.stringify(users));

    setTimeout(() => {
        window.location.href = "./index.html";
    }, 1000);
});