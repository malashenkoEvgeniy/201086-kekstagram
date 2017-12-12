'use strict';
(function () {

  var pictureGlobal = document.querySelector('.pictures');
  var pictureCloseItem = document.querySelector('.gallery-overlay-close');
  var pictureClosePopup = document.querySelector('.gallery-overlay');
  var closePopup = function () {
    pictureClosePopup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var showGalleryOverly = function (k) {
    var galleryOverlay = document.querySelector('.gallery-overlay');
    galleryOverlay.querySelector('.gallery-overlay-image').src = window.pictures[k].url;
    galleryOverlay.querySelector('.likes-count').textContent = window.pictures[k].likes;
    galleryOverlay.querySelector('.comments-count').textContent = window.pictures[k].comments;
    galleryOverlay.classList.remove('hidden');
    pictureCloseItem.addEventListener('keydown', onPopupEnterClose);
    pictureCloseItem.addEventListener('click', onPopupClickClose);
  };
  var onPopupEnterClose = function (evt) {
    window.util.isEnterEvent(evt, closePopup);
    pictureCloseItem.removeEventListener('keydown', onPopupEnterClose);
  };
  var onPopupClickClose = function () {
    closePopup();
    pictureCloseItem.removeEventListener('click', onPopupClickClose);
  };
  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };
  pictureGlobal.addEventListener('click', function (evt) {
    evt.preventDefault();
    var parentEl = evt.target;
    while (!parentEl.classList.contains('picture')) {
      parentEl = parentEl.parentNode;
    }
    var index = parentEl.getAttribute('data-index');
    showGalleryOverly(+index);
  });
})();
