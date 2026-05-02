document.addEventListener('DOMContentLoaded', function () {
    new Splide('#image-carousel').mount();
});

const sessionToken = localStorage.getItem("sessionToken");
const listOfUsers = JSON.parse(localStorage.getItem("listOfUsers")) || [];
const user = listOfUsers.find(u => u.token === sessionToken) || null;

const flowerImgs = [];
const galleryContainer = document.querySelector(".splide__list");
const folderPath = "./images/flower_imgs/flower";

for(let i = 1; i <= 16; i++)
    flowerImgs.push(`${folderPath}_${i}.png`);

function addPlantsToPage(){
    flowerImgs.forEach(img => {
        const flowerImg = document.createElement("li");
        flowerImg.classList.add("splide__slide");
        if(!(user.unlocked.includes(img.split('/').pop()))) flowerImg.style.filter = "blur(10px)";
        flowerImg.innerHTML = `<img src="${img}" alt="flower">`;
        galleryContainer.appendChild(flowerImg);
    });
}

addPlantsToPage();