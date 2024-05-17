async function getPhotographers() {
    return await fetch('https://kihak12.github.io/FishEye-Openclassrooms-Projet-6/data/photographers.json').then(response => response.json());
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const userCardDOM = photographer.getTemplateCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers().then(data =>
        data.photographers.map(photographer => new Photographer(photographer))
    );
    displayData(photographers);
}

init();

