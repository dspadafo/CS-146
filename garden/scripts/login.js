const form = document.getElementById("login-form");
const errorMsg = document.getElementById("error");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    
    if(!(username && password)){
        errorMsg.textContent = "All fields are required."   
    }
    const listOfUsers = JSON.parse(localStorage.getItem("listOfUsers")) || [];

    const user = listOfUsers.find(x => (x.username === username && x.password === password));
    if(user){
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        
        setTimeout(() => {
            window.location.href = "./index.html";
        }, 1000);
    } else{
        errorMsg.textContent = "Invalid info."
        return;
    }
});
