class Photographer {
    constructor(data) {
        this._name = data.name;
        this._id = data.id;
        this._city = data.city;
        this._country = data.country;
        this._tagline = data.tagline;
        this._price = data.price;
        this._portrait = data.portrait;
    }

    get name() {
        return this._name
    }

    get id() {
        return this._id
    }

    get city() {
        return this._city
    }

    get country() {
        return this._country
    }

    get tagline() {
        return this._tagline
    }

    get price() {
        return this._price
    }

    get portrait() {
        return this._portrait
    }

    get portraitLink() {
        return `/FishEye-Openclassrooms-Projet-6/assets/photographers/${this._portrait}`;
    }

    get profileLink() {
        return `/FishEye-Openclassrooms-Projet-6/photographer.html?id=${this._id}`;
    }

    photographerTemplateCardDOM = () => {
        const article = document.createElement('article');
        const articleContent = document.createElement('div');
        articleContent.classList.add('content');

        /// Profile Picture
        const img = document.createElement('img');
        img.setAttribute("src", this.portraitLink);
        img.setAttribute("alt", this._name);

        const imageLinkToDetails = document.createElement('a');
        imageLinkToDetails.setAttribute('href', this.profileLink);
        imageLinkToDetails.classList.add('card-cover-rounded')

        imageLinkToDetails.appendChild(img);
        article.appendChild(imageLinkToDetails);

        /// Profile Name
        const nameLinkToDetails = document.createElement('a');
        nameLinkToDetails.setAttribute('href', this.profileLink);
        const h2 = document.createElement('h2');
        h2.textContent = this._name;
        nameLinkToDetails.appendChild(h2)
        article.appendChild(nameLinkToDetails);

        /// Profile Location
        const pLocation = document.createElement('p');
        pLocation.textContent = `${this._city}, ${this._country}`;
        pLocation.classList.add('user-location');
        articleContent.appendChild(pLocation);

        /// Profile Description
        const pDescription = document.createElement('p');
        pDescription.textContent = `${this._tagline}`;
        pDescription.classList.add('user-description');

        articleContent.appendChild(pDescription);

        /// Profile Price
        const pPrice = document.createElement('p');
        pPrice.textContent = `${this._price}€/jour`;
        pPrice.classList.add('user-price');
        articleContent.appendChild(pPrice);

        /// Append every information in the DOM article
        article.appendChild(articleContent);
        return (article);
    }
}