const searchInput = document.getElementById("search-input");
const leaderboardItems = document.getElementById("leaderboard-items");
const noResults = document.getElementById("no-results");

const listOfUsers = JSON.parse(localStorage.getItem("listOfUsers")) || [];
listOfUsers.sort((a, b) => (b.score || 0) - (a.score || 0));

listOfUsers.forEach(user => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="player-name">${user.username}</span><span>${user.score || 0}</span>`;
    leaderboardItems.appendChild(li);
});

searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim().toLowerCase();
    const items = leaderboardItems.querySelectorAll("li");
    let anyVisible = false;

    items.forEach(function (item) {
        const name = item.querySelector(".player-name").textContent.toLowerCase();
        if (name.includes(query)) {
            item.style.display = "flex";
            anyVisible = true;
        } else {
            item.style.display = "none";
        }
    });

    noResults.style.display = anyVisible ? "none" : "block";
});
