'use strict';
(function () {
  var RANDOM_NUMBER = 0.5;
  window.pictures = [];
  var showFilters = function () {
    var filters = document.querySelector('.filters');
    filters.classList.remove('filters-inactive');
  };
  var addTemplates = function (pictures) {
    var picturesTemplate = document.querySelector('#picture-template').content;
    var picturesFragment = document.createDocumentFragment();
    for (var l = 0; l < pictures.length; l++) {
      var picturesChildElement = picturesTemplate.cloneNode(true);
      picturesChildElement.querySelector('.picture img').src = pictures[l].url;
      picturesChildElement.querySelector('.picture-likes').textContent = pictures[l].likes;
      picturesChildElement.querySelector('.picture-comments').textContent = pictures[l].comments;
      picturesChildElement.querySelector('.picture').setAttribute('data-index', pictures[l].id);
      picturesFragment.appendChild(picturesChildElement);
    }
    document.querySelector('.pictures').appendChild(picturesFragment);
    var galleryOverlay = document.querySelector('.gallery-overlay');
    galleryOverlay.querySelector('.gallery-overlay-image').src = pictures[0].url;
    galleryOverlay.querySelector('.likes-count').textContent = pictures[0].likes;
    galleryOverlay.querySelector('.comments-count').textContent = pictures[0].comments;
  };
  window.backend.load(function (pictures) {
    window.pictures = pictures;
    window.pictures.map(function (item, index) {
      item.id = index;
      return item;
    });
    addTemplates(pictures);
    showFilters();
  }, function (error) {
    window.showErrorMessage(error);
  });
  var pictureFilters = document.querySelector('.filters');
  pictureFilters.addEventListener('change', function (evt) {
    var sortedPictures = getSortedPictures(evt.target.value);
    debounceUpdateTemplates(sortedPictures);
  }, true);
  var clearPictures = function () {
    var pictures = document.querySelector('.pictures');
    pictures.innerHTML = '';
  };
  var getSortedPictures = function (feature) {
    var sortArr = window.pictures.slice();
    switch (feature) {
      case 'recommend': break;
      case 'popular':
        sortArr.sort(function (first, second) {
          return second.likes - first.likes;
        });
        break;
      case 'discussed':
        sortArr.sort(function (first, second) {
          return second.comments.length - first.comments.length;
        });
        break;
      case 'random':
        sortArr.sort(function () {
          return (Math.random() - RANDOM_NUMBER);
        });
        break;
    }
    return sortArr;
  };
  var updateTemplates = function (pictures) {
    clearPictures();
    addTemplates(pictures);
  };
  var debounceUpdateTemplates = window.debounce(updateTemplates);
})();
