'use strict';
window.effectsFilter = 'none';
(function () {
  var DiscriptionError = {
    HASH_ERROR_1: 'хэш-тег начинается с символа `#` (решётка)',
    HASH_ERROR_2: 'один и тот же хэш-тег не может быть использован дважды',
    HASH_ERROR_3: 'нельзя указать больше пяти хэш-тегов',
    HASH_ERROR_4: 'максимальная длина одного хэш-тега 20 символов'
  };
  var SUM_HASH = 5;
  var MIN_VALUE = 25;
  var MAX_VALUE = 100;
  var SCALE_NOTATION = 10;
  var MAX_LENGTH_HASH = 20;

  // Открытие и закрытие формы загрузки фотографий
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFormCancel = document.querySelector('.upload-form-cancel');
  var onCloseUploadOverlay = function () {
    uploadOverlay.classList.add('hidden');
  };
  var onUploadOverlayEsc = function (evt) {
    window.util.isEscEvent(evt, function () {
      onCloseUploadOverlay();
      document.removeEventListener('keydown', onUploadOverlayEsc);
    });
  };
  var onUploadCloseOverlayEnter = function (evt) {
    window.util.isEnterEvent(evt, onCloseUploadOverlay);
  };
  uploadFormCancel.addEventListener('click', onCloseUploadOverlay);
  uploadFormCancel.addEventListener('keydown', onUploadCloseOverlayEnter);
  uploadFile.addEventListener('change', function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onUploadOverlayEsc);
    window.initializeScale(uploadResizeControlsValue, onScale);
    window.clearFilter();
    if (uploadEffectNone.checked) {
      dialogAmbit.classList.add('hidden');
    } else {
      dialogAmbit.classList.remove('hidden');
    }

  });

  // Изминение размера изображения
  var uploadResizeControlsValue = document.querySelector('.upload-resize-controls-value');
  var uploadResizeControlsButtonDec = document.querySelector('.upload-resize-controls-button-dec');
  var uploadResizeControlsButtonInc = document.querySelector('.upload-resize-controls-button-inc');

  var uploadEffectNone = document.querySelector('#upload-effect-none');
  var dialogAmbit = document.querySelector('.upload-effect-level');


  var effectImagePreview = document.querySelector('.effect-image-preview');
  uploadResizeControlsButtonDec.addEventListener('click', function () {
    var value = parseInt(uploadResizeControlsValue.value, SCALE_NOTATION) - parseInt(uploadResizeControlsValue.step, SCALE_NOTATION);
    if (value < MIN_VALUE) {
      value = MIN_VALUE;
    }
    uploadResizeControlsValue.value = value + '%';
    window.initializeScale(uploadResizeControlsValue, onScale);
  });
  uploadResizeControlsButtonInc.addEventListener('click', function () {
    var value = parseInt(uploadResizeControlsValue.value, SCALE_NOTATION) + parseInt(uploadResizeControlsValue.step, SCALE_NOTATION);
    if (value > MAX_VALUE) {
      value = MAX_VALUE;
    }
    uploadResizeControlsValue.value = value + '%';
    window.initializeScale(uploadResizeControlsValue, onScale);
  });
  var onScale = function (scale) {
    effectImagePreview.style.transform = 'scale(' + (scale / MAX_VALUE) + ')';
  };
  window.initializeScale(uploadResizeControlsValue, onScale);
  if (uploadEffectNone.checked) {
    dialogAmbit.classList.add('hidden');
  }

  // Валидация поля хеш-тега
  var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
  var getValidHash = function () {
    var valueInput = uploadFormHashtags.value.toLowerCase();
    var valueInputArray = valueInput.split(' ');
    var isValueStartsHash = valueInputArray.every(function (hash) {
      return hash[0] === '#';
    });
    if (!isValueStartsHash) {
      return DiscriptionError.HASH_ERROR_1;
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
      return DiscriptionError.HASH_ERROR_2;
    }
    if (valueInputArray.length > SUM_HASH) {
      return DiscriptionError.HASH_ERROR_3;
    }
    var isValueLengthHash = valueInputArray.every(function (hash) {
      return hash.length <= MAX_LENGTH_HASH;
    });
    if (!isValueLengthHash) {
      return DiscriptionError.HASH_ERROR_4;
    }
    return '';
  };
  uploadFormHashtags.addEventListener('input', function () {
    var validCode = getValidHash();
    if (validCode === DiscriptionError.HASH_ERROR_1) {
      uploadFormHashtags.setCustomValidity(DiscriptionError.HASH_ERROR_1);
    } else if (validCode === DiscriptionError.HASH_ERROR_2) {
      uploadFormHashtags.setCustomValidity(DiscriptionError.HASH_ERROR_2);
    } else if (validCode === DiscriptionError.HASH_ERROR_3) {
      uploadFormHashtags.setCustomValidity(DiscriptionError.HASH_ERROR_3);
    } else if (validCode === DiscriptionError.HASH_ERROR_4) {
      uploadFormHashtags.setCustomValidity(DiscriptionError.HASH_ERROR_4);
    } else {
      uploadFormHashtags.setCustomValidity('');
    }
  });
  uploadFormHashtags.addEventListener('invalid', function () {
    if (getValidHash() !== '') {
      uploadFormHashtags.style.borderColor = 'red';
    }
  });
  var uploadForm = document.querySelector('.upload-form');

  // отправка формы
  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(uploadForm);
    window.backend.save(formData, function () {
      onCloseUploadOverlay();
      uploadForm.reset();
    }, function (error) {
      window.showErrorMessage(error);
    });
  });
}());
