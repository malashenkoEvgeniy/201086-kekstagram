'use strict';
var pictures = [];
(function () {

  var urlList = [];
  var getLikesRandom = function () {
    return Math.floor(15 + Math.random() * 185);
  };

  var getCommentsRandom = function () {
    var commentsArr = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
    var firstComment = commentsArr[Math.floor(Math.random() * commentsArr.length)];
    var secondComment = commentsArr[Math.floor(Math.random() * commentsArr.length)];
    if (firstComment === secondComment) {
      return firstComment;
    }
    return (firstComment + secondComment);
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
    for (var l = 0; l < window.pictures.length; l++) {
      var picturesChildElement = picturesTemplate.cloneNode(true);
      picturesChildElement.querySelector('.picture img').src = window.pictures[l].url;
      picturesChildElement.querySelector('.picture-likes').textContent = window.pictures[l].likes;
      picturesChildElement.querySelector('.picture-comments').textContent = window.pictures[l].comments;
      picturesChildElement.querySelector('.picture').setAttribute('data-index', l);
      picturesFragment.appendChild(picturesChildElement);
    }
    document.querySelector('.pictures').appendChild(picturesFragment);
    var galleryOverlay = document.querySelector('.gallery-overlay');
    galleryOverlay.querySelector('.gallery-overlay-image').src = window.pictures[0].url;
    galleryOverlay.querySelector('.likes-count').textContent = window.pictures[0].likes;
    galleryOverlay.querySelector('.comments-count').textContent = window.pictures[0].comments;
  };
  addsTemplate();
})();
