'use strict';
(function () {
  var addsTemplate = function (pictures) {
    var picturesTemplate = document.querySelector('#picture-template').content;
    var picturesFragment = document.createDocumentFragment();
    for (var l = 0; l < pictures.length; l++) {
      var picturesChildElement = picturesTemplate.cloneNode(true);
      picturesChildElement.querySelector('.picture img').src = pictures[l].url;
      picturesChildElement.querySelector('.picture-likes').textContent = pictures[l].likes;
      picturesChildElement.querySelector('.picture-comments').textContent = pictures[l].comments;
      picturesChildElement.querySelector('.picture').setAttribute('data-index', l);
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
    addsTemplate(pictures);
  });
})();
