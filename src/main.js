'use strict';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";

let currentPage = 1;
const perPage = 40;
let currentSearchQuery = '';
let apiKey = '41728884-677575adccc9f2c5ba20b621f';
let gallery = document.querySelector(".gallery");

document.querySelector(".form-search").addEventListener("submit", async function (event) {
    event.preventDefault();

    const loader = document.querySelector("span.loader");
    const loadMoreBtn = document.querySelector(".button-loadmore");

    gallery.innerHTML = '';
    loader.classList.add('visible');
    loadMoreBtn.classList.remove('visible');

    const searchImg = document.querySelector(".text-input").value;

    const params = {
        key: apiKey,
        q: searchImg,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: perPage,
    };

    const searchParams = new URLSearchParams(params);
    const apiUrl = `https://pixabay.com/api/?${searchParams}`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        loader.classList.remove('visible');

        if (data.hits.length === 0) {
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again.',
                position: 'topRight',
                messageColor: '#FAFAFB',
                backgroundColor: '#EF4040'
            });
        } else {
            data.hits.forEach(result => {
                const resultItem = document.createElement('li');
                const imgElement = document.createElement('img');
                const aElement = document.createElement('a');
                const infoElement = document.createElement("div");

                imgElement.src = result.webformatURL;
                imgElement.alt = result.tags;

                aElement.href = result.largeImageURL;
                aElement.appendChild(imgElement);

                infoElement.classList.add('image-info');
                infoElement.innerHTML = `
                    <p class="likes">Likes <span>${result.likes}</span></p>
                    <p class="views">Views <span>${result.views}</span></p>
                    <p class="comments">Comments <span>${result.comments}</span></p>
                    <p class="downloads">Downloads <span>${result.downloads}</span></p>
                `;

                resultItem.appendChild(aElement);
                resultItem.appendChild(infoElement);

                gallery.appendChild(resultItem);
            });

            const modal = new SimpleLightbox('.gallery a', {
                captionsData: 'alt',
                captionDelay: 250,
            });

            modal.refresh();

            if (data.hits.length === perPage) {
                loadMoreBtn.classList.add('visible');
            }
        }
    } catch (error) {
        console.error("Error fetching search results:", error);
        loader.classList.remove('visible');
    }
});

document.querySelector(".button-loadmore").addEventListener("click", async function () {
    const loaderMore = document.querySelector(".loader-loadmore");
    const loadMoreBtn = document.querySelector(".button-loadmore");

    loaderMore.classList.add('visible');
    loadMoreBtn.classList.remove('visible');

    try {
        currentPage++;
        const paramsMore = {
            key: apiKey,
            q: currentSearchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: currentPage,
            per_page: perPage,
        };

        const searchParamsMore = new URLSearchParams(paramsMore);
        const apiUrlMore = `https://pixabay.com/api/?${searchParamsMore}`;
        const responseMore = await axios.get(apiUrlMore);
        const dataMore = responseMore.data;

        loaderMore.classList.remove('visible');

        if (dataMore.hits.length > 0) {
            dataMore.hits.forEach(result => {
                const resultItem = document.createElement('li');
                const imgElement = document.createElement('img');
                const aElement = document.createElement('a');
                const infoElement = document.createElement("div");

                imgElement.src = result.webformatURL;
                imgElement.alt = result.tags;

                aElement.href = result.largeImageURL;
                aElement.appendChild(imgElement);

                infoElement.classList.add('image-info');
                infoElement.innerHTML = `
                    <p class="likes">Likes <span>${result.likes}</span></p>
                    <p class="views">Views <span>${result.views}</span></p>
                    <p class="comments">Comments <span>${result.comments}</span></p>
                    <p class="downloads">Downloads <span>${result.downloads}</span></p>
                `;

                resultItem.appendChild(aElement);
                resultItem.appendChild(infoElement);
                gallery.appendChild(resultItem);
            });

            const modalMore = new SimpleLightbox('.gallery a', {
                captionsData: 'alt',
                captionDelay: 250,
            });

            modalMore.refresh();

            makeSmoothScrolling();
            
            if (currentPage * perPage >= dataMore.totalHits) {
                loadMoreBtn.classList.remove('visible');
                iziToast.info({
                    message: "We're sorry, but you've reached the end of search results.",
                    position: 'topRight',
                    messageColor: '#FAFAFB',
                    backgroundColor: '#3498db'
                });
            } else {
                loadMoreBtn.classList.add('visible');
            }
        } else {
            loadMoreBtn.classList.remove('visible');
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
                messageColor: '#FAFAFB',
                backgroundColor: '#3498db'
            });
        }
    } catch (error) {
        console.error("Error fetching more results:", error);
        loaderMore.classList.remove('visible');
        loadMoreBtn.classList.add('visible');
    }
});

function makeSmoothScrolling() {
    const galleryItemHeight = document.querySelector('.gallery li').getBoundingClientRect().height;

    window.scrollBy({
        top: galleryItemHeight * 2,
        left: 0,
        behavior: 'smooth'
    });
}