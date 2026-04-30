const greet = document.getElementById("greet");


if(localStorage.loggedInUser){
    greet.textContent = "Log out";
} else greet.textContent = "Log in";

greet.addEventListener("click", (e) => {
    if(greet.textContent === "Log out"){
        localStorage.loggedInUser = "";
        window.location.href = "../index.html";
        greet.textContent = "Log in";
    }
});