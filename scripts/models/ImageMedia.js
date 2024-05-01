class ImageMedia extends Media {
    constructor(data) {
        super(data);
        this._image = data.image;
    }

    get mediaLink() {
        return `./assets/medias/${this._photographerId}/${this._image}`;
    }

    getTemplateCardDom = () => {
        const article = document.createElement('article');
        article.classList.add('media-card');

        const articleContent = document.createElement('div');
        articleContent.classList.add('content');

        /// Media Picture
        const media = document.createElement('img');
        media.setAttribute("alt", this._title);
        media.setAttribute("card-image", this._id);
        media.setAttribute("tabindex", "0");
        media.setAttribute("src", this.mediaLink);

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
