'use strict';
window.effectsFilter = 'none';
(function () {
  var DISCRIPTION_ERROR = {
    hashError1: 'хэш-тег начинается с символа `#` (решётка)',
    hashError2: 'один и тот же хэш-тег не может быть использован дважды',
    hashError3: 'нельзя указать больше пяти хэш-тегов',
    hashError4: 'максимальная длина одного хэш-тега 20 символов'
  };
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

  var uploadEffectNone = document.querySelector('#upload-effect-none');
  var dialogAmbit = document.querySelector('.upload-effect-level');


  var effectImagePreview = document.querySelector('.effect-image-preview');
  uploadResizeControlsButtonDec.addEventListener('click', function () {
    var value = parseInt(uploadResizeControlsValue.value, 10) - parseInt(uploadResizeControlsValue.step, 10);
    if (value < 25) {
      value = 25;
    }
    uploadResizeControlsValue.value = value + '%';
    window.initializeScale(uploadResizeControlsValue, onScale);
  });
  uploadResizeControlsButtonInc.addEventListener('click', function () {
    var value = parseInt(uploadResizeControlsValue.value, 10) + parseInt(uploadResizeControlsValue.step, 10);
    if (value > 100) {
      value = 100;
    }
    uploadResizeControlsValue.value = value + '%';
    window.initializeScale(uploadResizeControlsValue, onScale);
  });
  var onScale = function (scale) {
    effectImagePreview.style.transform = 'scale(' + (scale / 100) + ')';
  };
  window.initializeScale(uploadResizeControlsValue, onScale);
  if (uploadEffectNone.checked) {
    dialogAmbit.classList.add('hidden');
  }
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
}());
