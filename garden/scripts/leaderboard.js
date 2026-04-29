const searchInput = document.getElementById("search-input");
const leaderboardItems = document.getElementById("leaderboard-items");
const noResults = document.getElementById("no-results");

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
