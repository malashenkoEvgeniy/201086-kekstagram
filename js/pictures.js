'use strict';
var pictures = [];
var urlList = [];
var likesRandom = function () {
  var likesArr = [];
  var j = 0;
  var timeVariable = 0;
  while (j < 25) {
    if (timeVariable > 15) {
      likesArr[j] = timeVariable;
      j++;
    }
    timeVariable = Math.floor(Math.random() * 200);
  }
  return likesArr;
};
var commentsRandom = function () {
  var commentsArr = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var commentsRezult = [];
  var firsctComment = 0;
  var secondComment = 0;
  var j = 0;
  while (j < 25) {
    firsctComment = commentsArr[Math.floor(Math.random() * commentsArr.length)];
    secondComment = commentsArr[Math.floor(Math.random() * commentsArr.length)];
    commentsRezult[j] = firsctComment + secondComment;
    j++;
  }
  return commentsRezult;
};
for (var i = 0; i < 25; i++) {
  var k = i + 1;
  urlList.push('photos/' + k + '.jpg');
  pictures[i] = {
    url: urlList[i],
    likes: likesRandom()[i],
    comments: commentsRandom()[i]
  };
}
var picturesTemplate = document.querySelector('#picture-template').content;
var picturesFragment = document.createDocumentFragment();
for (var l = 0; l < pictures.length; l++) {
  var picturesChildElement = picturesTemplate.cloneNode(true);
  picturesChildElement.querySelector('.picture img').src = pictures[l].url;
  picturesChildElement.querySelector('.picture-likes').textContent = pictures[l].likes;
  picturesChildElement.querySelector('.picture-comments').textContent = pictures[l].comments;
  picturesFragment.appendChild(picturesChildElement);
}
document.querySelector('.pictures').appendChild(picturesFragment);
var galleryOverlay = document.querySelector('.gallery-overlay');
galleryOverlay.classList.remove('hidden');
galleryOverlay.querySelector('.gallery-overlay-image').src = pictures[1].url;
galleryOverlay.querySelector('.likes-count').textContent = pictures[1].likes;
galleryOverlay.querySelector('.comments-count').textContent = pictures[1].comments;

