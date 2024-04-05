//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographerDetails(photographerId) {
    const photographersDetails = await fetch('/FishEye-Openclassrooms-Projet-6/data/photographers.json').then(response => response.json());
    return {
        photographer: new Photographer(photographersDetails.photographers.find(photographer => photographer.id === parseInt(photographerId))),
        medias: photographersDetails.media.filter(media => media.photographerId === parseInt(photographerId)).map(media => new Media(media)),
    };
}

var photographerDetails;

async function displayData(photographerDetails) {
    console.log(photographerDetails);
    const photographer = photographerDetails.photographer;
    const medias = photographerDetails.medias;

    const photographerProfilePicture = document.querySelector("#photographer-portrait")
    photographerProfilePicture.setAttribute('src', photographer.portraitLink);
    photographerProfilePicture.setAttribute('alt', photographer.name);

    const photographerDetailsSection = document.querySelector(".user-details");
    photographerDetailsSection.appendChild(photographer.getTemplateDetailsDOM());

    displayPhotographerMedia(medias);
}

function displayPhotographerMedia(mediaList, sort = 'Popularité'){
    const photographerMediasSection = document.querySelector(".media-grid");
    console.log(sort);
    switch (sort) {
        case 'Popularité':
            mediaList.sort((media1, media2) => media1._likes < media2._likes ? 1 : -1);
            break;
        case 'Date':
            mediaList.sort((media1, media2) => media1._date < media2._date ? -1 : 1);
            break;
        default:
            mediaList.sort((media1, media2) => media1._title < media2._title ? -1 : 1);
            break;
    }
    photographerMediasSection.innerHTML = '';

    mediaList.forEach(media => {
        photographerMediasSection.appendChild(media.getTemplateCardDom());
    });
}

async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    // Récupère les détails du photographe
    photographerDetails = await getPhotographerDetails(urlParams.get('id'));
    displayData(photographerDetails);
}

init();