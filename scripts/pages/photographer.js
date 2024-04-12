//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographerDetails(photographerId) {
    const photographersDetails = await fetch('/FishEye-Openclassrooms-Projet-6/data/photographers.json').then(response => response.json());
    return {
        photographer: new Photographer(photographersDetails.photographers.find(photographer => photographer.id === parseInt(photographerId))),
        medias: photographersDetails.media.filter(media => media.photographerId === parseInt(photographerId)).map(media => new Media(media)),
    };
}

let photographerDetails;
let sortedMediasList;

async function displayData(photographerDetails) {
    const photographer = photographerDetails.photographer;

    const photographerProfilePicture = document.querySelector("#photographer-portrait")
    photographerProfilePicture.setAttribute('src', photographer.portraitLink);
    photographerProfilePicture.setAttribute('alt', photographer.name);

    const photographerDetailsSection = document.querySelector(".user-details");
    photographerDetailsSection.appendChild(photographer.getTemplateDetailsDOM());

    displayPhotographerTotalLikes();
    displayPhotographerPrice();
    displayPhotographerMedia();
}


function sortMedias(mediaList, sort = 'Popularité') {
    switch (sort) {
        case 'Popularité':
            return mediaList.sort((media1, media2) => media1._likes < media2._likes ? 1 : -1);
        case 'Date':
            return mediaList.sort((media1, media2) => media1._date < media2._date ? -1 : 1);
        default:
            return mediaList.sort((media1, media2) => media1._title < media2._title ? -1 : 1);
    }
}

function displayPhotographerMedia(){
    const photographerMediasSection = document.querySelector(".media-grid");
    photographerMediasSection.innerHTML = '';
    photographerDetails.medias.forEach(media => {
        photographerMediasSection.appendChild(media.getTemplateCardDom());
    });
    initLightboxModalNavigation(photographerDetails.medias);
}

function initLightboxModalNavigation(mediaList) {
    document.querySelectorAll('[card-image]').forEach(card => {
        card.addEventListener('click', () => {
            const indexOfCardClicked = mediaList.indexOf(mediaList.find(i => i._id === parseInt(card.getAttribute('card-image').valueOf())))
            displayLightboxModal(indexOfCardClicked);
        });
    });
}

function displayPhotographerTotalLikes() {
    document.getElementById('user-total-likes').textContent = photographerDetails.medias.reduce((acc, media) => acc + media._likes, 0);
}

function displayPhotographerPrice() {
    document.getElementById('user-price').textContent = photographerDetails.photographer.dailyPrice;
}

function displayLightboxModal(indexOfCardClicked) {
    const currentMedia = sortedMediasList[indexOfCardClicked];

    const article = document.createElement('article');
    article.classList.add('media-modal')
    article.ariaLabel = "image closeup view";

    const previousButton = document.createElement('button');
    previousButton.className ='slider-button-icon -reverse';
    /// If a previous media exist
    if(sortedMediasList[indexOfCardClicked - 1]) {
        const previousIcon =  document.createElement('img');
        previousIcon.setAttribute("alt", currentMedia._title);
        previousIcon.setAttribute("src", '/assets/icons/arrow.svg');
        previousButton.classList.add('-clickable');

        previousButton.onclick = () => displayLightboxModal(indexOfCardClicked - 1);
        previousButton.appendChild(previousIcon);
    }
    article.appendChild(previousButton);

    const div =  document.createElement('div');
    const title =  document.createElement('h1');
    title.textContent = currentMedia._title;

    const media = currentMedia._image ? document.createElement('img') : document.createElement('video');
    media.setAttribute("alt", currentMedia._title);

    if(currentMedia._image) {
        media.setAttribute("src", currentMedia.imageLink);
    }
    else {
        media.setAttribute("src", currentMedia.videoLink);
        media.setAttribute("controls", '');
    }
    div.appendChild(media);
    div.appendChild(title);
    article.appendChild(div);

    const closeButton = document.createElement('button');
    const closeIcon =  document.createElement('img');
    closeIcon.setAttribute("alt", currentMedia._title);
    closeIcon.setAttribute("src", '/assets/icons/close-red.svg');
    closeButton.appendChild(closeIcon);
    closeButton.className = 'slider-button-icon -close';
    closeButton.onclick = () => document.getElementById('lightbox_modal').close()

    article.appendChild(closeButton);

    const nextButton = document.createElement('button');
    nextButton.classList.add('slider-button-icon');
    /// If a next media exist
    if(sortedMediasList[indexOfCardClicked + 1]) {
        const nextIcon =  document.createElement('img');
        nextIcon.setAttribute("alt", currentMedia._title);
        nextIcon.setAttribute("src", '/assets/icons/arrow.svg');
        nextButton.classList.add('-clickable');

        nextButton.onclick = () => displayLightboxModal(indexOfCardClicked + 1);
        nextButton.appendChild(nextIcon);
    }

    article.appendChild(nextButton);

    const lightbox_modal = document.getElementById('lightbox_modal')
    lightbox_modal.innerHTML = '';
    lightbox_modal.appendChild(article);
    lightbox_modal.showModal()
}

async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    // Récupère les détails du photographe
    photographerDetails = await getPhotographerDetails(urlParams.get('id'));
    sortedMediasList = sortMedias(photographerDetails.medias);
    displayData(photographerDetails);
}

init();