'use strict';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var pictures = [];
var urlList = [];
var getLikesRandom = function () {
  return Math.floor(15 + Math.random() * 185);
};
var getCommentsRandom = function () {
  var commentsArr = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var firsctComment = commentsArr[Math.floor(Math.random() * commentsArr.length)];
  var secondComment = commentsArr[Math.floor(Math.random() * commentsArr.length)];
  if (firsctComment === secondComment) {
    return firsctComment;
  }
  return (firsctComment + secondComment);
};
var getObjectRandom = function () {
  for (var i = 0; i < 25; i++) {
    var k = i + 1;
    urlList.push('photos/' + k + '.jpg');
    pictures[i] = {
      url: urlList[i],
      likes: getLikesRandom(),
      comments: getCommentsRandom()
    };
  }
};
var addsTemplate = function () {
  getObjectRandom();
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
addsTemplate();
var pictureGlobal = document.querySelector('.pictures');
var pictureCloseItem = document.querySelector('.gallery-overlay-close');
var pictureClosePopup = document.querySelector('.gallery-overlay');
var closePopup = function () {
  pictureClosePopup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};
var showGalleryOverly = function (k) {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  galleryOverlay.querySelector('.gallery-overlay-image').src = pictures[k].url;
  galleryOverlay.querySelector('.likes-count').textContent = pictures[k].likes;
  galleryOverlay.querySelector('.comments-count').textContent = pictures[k].comments;
  galleryOverlay.classList.remove('hidden');
  pictureCloseItem.addEventListener('keydown', onPopupEnterClose);
  pictureCloseItem.addEventListener('click', onPopupClickClose);
};
var onPopupEnterClose = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
    pictureCloseItem.removeEventListener('keydown', onPopupEnterClose);
  }
};
var onPopupClickClose = function (evt) {
  closePopup();
  pictureCloseItem.removeEventListener('click', onPopupClickClose);
};
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
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

