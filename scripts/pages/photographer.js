//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographerDetails(photographerId) {
    const photographersDetails = await fetch('https://kihak12.github.io/FishEye-Openclassrooms-Projet-6/data/photographers.json').then(response => response.json());
    return photographersDetails.photographers.find(photographer => photographer.id === parseInt(photographerId));
}

async function displayData(photographer) {
    const photographersSection = document.querySelector(".photographer_section");

    const photographersProfilePicture = document.querySelector("#photographer-portrait")
    photographersProfilePicture.setAttribute('src', photographer.portraitLink);
    photographersProfilePicture.setAttribute('alt', photographer.name);

    const photographersDetailsSection = document.querySelector(".user-details");
    photographersDetailsSection.appendChild(photographer.getTemplateDetailsDOM());
}


async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    // Récupère les détails du photographe
    const photographerDetails = await getPhotographerDetails(urlParams.get('id')).then(photographerDetails => new Photographer(photographerDetails));
    displayData(photographerDetails);
}

init();