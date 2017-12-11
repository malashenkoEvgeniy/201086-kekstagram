'use strict';
(function () {
  var DISCRIPTION_ERROR = {
    hashError1: 'хэш-тег начинается с символа `#` (решётка)',
    hashError2: 'один и тот же хэш-тег не может быть использован дважды',
    hashError3: 'нельзя указать больше пяти хэш-тегов',
    hashError4: 'максимальная длина одного хэш-тега 20 символов'
  };
  var pictures = [];
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
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFormCancel = document.querySelector('.upload-form-cancel');
  var onCloseUploadOverlay = function () {
    uploadOverlay.classList.add('hidden');
  };
  var onUploadOverlayEsc = function (evt) {
    window.util.isEscEvent(evt, onCloseUploadOverlay);
    document.removeEventListener('keydown', onUploadOverlayEsc);
  };
  var onUploadCloseOverlayEnter = function (evt) {
    window.util.isEnterEvent(evt, onCloseUploadOverlay);
    onCloseUploadOverlay();
  };
  uploadFile.addEventListener('change', function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onUploadOverlayEsc);
  });
  uploadFormCancel.addEventListener('click', onCloseUploadOverlay);
  uploadFormCancel.addEventListener('keydown', onUploadCloseOverlayEnter);

  var uploadResizeControlsValue = document.querySelector('.upload-resize-controls-value');
  var uploadResizeControlsButtonDec = document.querySelector('.upload-resize-controls-button-dec');
  var uploadResizeControlsButtonInc = document.querySelector('.upload-resize-controls-button-inc');
  var uploadEffectControls = document.querySelector('.upload-effect-controls');
  var effectImagePreview = document.querySelector('.effect-image-preview');
  uploadResizeControlsButtonDec.addEventListener('click', function () {
    var value = parseInt(uploadResizeControlsValue.value, 10) - parseInt(uploadResizeControlsValue.step, 10);
    if (value >= 25) {
      uploadResizeControlsValue.value = value + '%';
      effectImagePreview.style.transform = 'scale(' + (value / 100) + ')';
    } else {
      uploadResizeControlsValue.value = 25 + '%';
      effectImagePreview.style.transform = 'scale(' + 0.25 + ')';
    }

  });
  uploadResizeControlsButtonInc.addEventListener('click', function () {
    var value = parseInt(uploadResizeControlsValue.value, 10) + parseInt(uploadResizeControlsValue.step, 10);
    if (value <= 100) {
      uploadResizeControlsValue.value = value + '%';
      effectImagePreview.style.transform = 'scale(' + (value / 100) + ')';
    } else {
      uploadResizeControlsValue.value = 100 + '%';
      effectImagePreview.style.transform = 'scale(' + 1 + ')';
    }
  });

  uploadEffectControls.addEventListener('change', function (evt) {
    effectImagePreview.className = 'effect-image-preview ' + evt.target.id.slice(7);
  }, true);

  var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
  var getValidHash = function () {
    var valueInput = uploadFormHashtags.value.toLowerCase();
    var valueInputArray = valueInput.split(' ');
    var isValueStartsHash = valueInputArray.every(function (hash) {
      return hash[0] === '#';
    });
    if (!isValueStartsHash) {
      return DISCRIPTION_ERROR.hashError1;
    }

    var isValuesUniqeHash = valueInputArray.every(function (hash, index, arr) {
      var flag = true;
      for (var i = index + 1; i < arr.length; i++) {
        if (hash === arr[i]) {
          flag = false;
        }
      }
      return flag;
    });
    if (!isValuesUniqeHash) {
      return DISCRIPTION_ERROR.hashError2;
    }
    if (valueInputArray.length > 5) {
      return DISCRIPTION_ERROR.hashError3;
    }
    var isValueLengthHash = valueInputArray.every(function (hash) {
      return hash.length <= 20;
    });
    if (!isValueLengthHash) {
      return DISCRIPTION_ERROR.hashError4;
    }
    return '';
  };
  uploadFormHashtags.addEventListener('input', function () {
    var validCode = getValidHash();
    if (validCode === DISCRIPTION_ERROR.hashError1) {
      uploadFormHashtags.setCustomValidity(DISCRIPTION_ERROR.hashError1);
    } else if (validCode === DISCRIPTION_ERROR.hashError2) {
      uploadFormHashtags.setCustomValidity(DISCRIPTION_ERROR.hashError2);
    } else if (validCode === DISCRIPTION_ERROR.hashError3) {
      uploadFormHashtags.setCustomValidity(DISCRIPTION_ERROR.hashError3);
    } else if (validCode === DISCRIPTION_ERROR.hashError4) {
      uploadFormHashtags.setCustomValidity(DISCRIPTION_ERROR.hashError4);
    } else {
      uploadFormHashtags.setCustomValidity('');
    }
  });
  uploadFormHashtags.addEventListener('invalid', function () {
    if (getValidHash() !== '') {
      uploadFormHashtags.style.borderColor = 'red';
    }
  });
})();
