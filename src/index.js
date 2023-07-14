import './sass/index.scss';
import { fetchSearch } from './js/api';
import { refs } from './js/tools';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
let currentPage = 1;
let searchtxt = '';
const hitsOnPage = 40;

refs.loadMore.classList.add('hidden');

refs.loadMore.addEventListener('click', onLoad);

function onLoad() {
  currentPage += 1;
  fetchSearch(searchtxt, hitsOnPage, currentPage).then(data => {
    const marktxt = createMarkup(data.hits);
    refs.gallery.insertAdjacentHTML('beforeend', marktxt);
    const maxPage = Math.ceil(Number(data.totalHits / hitsOnPage));
    console.log("maxPage2",maxPage);
    console.log("currentPage2",currentPage);
    if (currentPage = maxPage) {
      refs.loadMore.classList.remove('hidden');
      Notify.failure("We're sorry, but you've reached the end of search results.");
    } else {
      refs.loadMore.classList.add('hidden');
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  });
}

refs.search.addEventListener('submit', onSearchSubmit);

async function onSearchSubmit(event) {
  currentPage = 1;
  refs.gallery.innerHTML = '';
  event.preventDefault();
  const formElements = event.currentTarget.elements;
  searchtxt = formElements.searchQuery.value;
  await fetchSearch(searchtxt, hitsOnPage)
    .then(data => {
      const marktxt = createMarkup(data.hits);
      console.log('VparseInt(data.totalHits)', parseInt(data.totalHits));
      if (parseInt(data.totalHits) > 0) {
        for (hit of data.hits) {
          console.log(hit.pageURL);
        }
      } else {
        // console.log('No hits');
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      refs.gallery.insertAdjacentHTML('beforeend', marktxt);
      const maxPage = Math.ceil(Number(data.totalHits / hitsOnPage));
      console.log("maxPage1",maxPage);
      console.log("currentPage1",currentPage);
      if (currentPage = maxPage) {
        refs.loadMore.classList.add('hidden');
        Notify.failure("We're sorry, but you've reached the end of search results.");
      } else {
        refs.loadMore.classList.remove('hidden');
      }
    })
    .catch(err => console.log(err));
}

function createMarkup(arr) {
  return arr
    .map(
      ({ webformatURL, tags, likes, views, comments, downloads }) =>
        `<div class="photo-card">
        <img src=${webformatURL} alt=${tags} loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p>
        </div>
      </div>`
    )
    .join('');
}
