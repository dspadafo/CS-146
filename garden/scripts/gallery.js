document.addEventListener('DOMContentLoaded', function () {
    new Splide('#image-carousel').mount();
});

const flowerImgs = [];
const galleryContainer = document.querySelector(".splide__list");
const folderPath = "./images/flower_imgs/flower ";
for(let i = 1; i <= 16; i++){
    flowerImgs.push(`${folderPath}(${i}).png`);
}

function addPlantsToPage(){
    flowerImgs.forEach(img => {
        const flowerImg = document.createElement("li");
        flowerImg.classList.add("splide__slide");
        flowerImg.innerHTML = `<img src="${img}" alt="flower">`;
        galleryContainer.appendChild(flowerImg);
    });
}

addPlantsToPage();