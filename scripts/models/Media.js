class Media {
    constructor(data) {
        this._id = data.id;
        this._photographerId = data.photographerId;
        this._title = data.title;
        this._image = data.image;
        this._video = data.video;
        this._likes = data.likes;
        this._liked = false;
        this._date = data.date;
        this._price = data.price;
    }

    get id() {
        return this._id
    }
    get photographerId() {
        return this._photographerId
    }
    get title() {
        return this._title
    }
    get image() {
        return this._image
    }
    get likes() {
        return this._likes
    }
    get date() {
        return this._date
    }
    get price() {
        return this._price
    }

    get imageLink() {
        return `./assets/medias/${this._photographerId}/${this._image}`;
    }

    get videoLink() {
        return `./assets/medias/${this._photographerId}/${this._video}`;
    }

    addLike = () => {
        this._liked = true;
        this._likes += 1;
    }

    removeLike = () => {
        this._liked = false;
        this._likes -= 1;
    }

    getTemplateCardDom = () => {
        const article = document.createElement('article');
        article.classList.add('media-card');

        const articleContent = document.createElement('div');
        articleContent.classList.add('content');

        /// Media Picture
        const media = this._image ? document.createElement('img') : document.createElement('video');
        media.setAttribute("alt", this._title);
        media.setAttribute("card-image", this._id);
        media.setAttribute("tabindex", "0");

        if(this._image) {
            media.setAttribute("src", this.imageLink);
        }
        else{
            media.setAttribute("src", this.videoLink);
            media.setAttribute("muted", '');
            media.setAttribute("autoplay", '');
            media.setAttribute("loop", '');
        }


        /// Media Name
        const mediaName = document.createElement('p');
        mediaName.textContent = this._title;
        mediaName.classList.add('media-title');
        articleContent.appendChild(mediaName);

        /// Media Likes
        const mediaLikes = document.createElement('button');
        mediaLikes.onclick = () => {
            mediaLikes.classList.contains('-liked') ? this.removeLike() : this.addLike();
            mediaLikes.classList.toggle('-liked');
            numberOfLikes.textContent = this.likes;
            displayPhotographerTotalLikes();
        };
        this._liked && mediaLikes.classList.add('-liked');
        const numberOfLikes = document.createElement('p');
        numberOfLikes.textContent = this.likes;
        mediaLikes.appendChild(numberOfLikes);

        const heartIcon = document.createElement('img');
        heartIcon.setAttribute('src', './assets/icons/heart.svg');
        mediaLikes.appendChild(heartIcon);

        mediaLikes.classList.add('media-likes');
        articleContent.appendChild(mediaLikes);

        article.appendChild(media);
        article.appendChild(articleContent);
        return (article);
    }
}