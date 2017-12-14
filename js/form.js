'use strict';
(function () {
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var setFilterEffectValue = function (filterEffect, filterValue) {
    if (filterEffect === 'effect-chrome') {
      effectImagePreview.style.filter = 'grayscale(' + (filterValue * 0.01) + ')';
    } else if (filterEffect === 'effect-sepia') {
      effectImagePreview.style.filter = 'sepia(' + (filterValue * 0.01) + ')';
    } else if (filterEffect === 'effect-marvin') {
      effectImagePreview.style.filter = 'invert(' + filterValue + '%)';
    } else if (filterEffect === 'effect-phobos') {
      effectImagePreview.style.filter = 'blur(' + filterValue * 0.03 + 'px)';
    } else if (filterEffect === 'effect-heat') {
      effectImagePreview.style.filter = 'brightness(' + filterValue * 0.03 + ')';
    }
  };
  var dialogHandle = document.querySelector('.upload-effect-level-pin');
  var dialogFat = document.querySelector('.upload-effect-level-val');

  var uploadEffectLevelValue = document.querySelector('.upload-effect-level-value');
  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
      };
      var futureX = dialogHandle.offsetLeft - shift.x;
      var min = 0;
      var max = dialogHandle.offsetParent.offsetWidth;
      if (futureX > max) {
        dialogHandle.style.left = max + 'px';
      } else if (futureX < min) {
        dialogHandle.style.left = min;
      } else {
        dialogHandle.style.left = (futureX) + 'px';
        uploadEffectLevelValue.value = Math.round(100 / max * futureX);
      }
      dialogFat.style.width = dialogHandle.style.left;
      setFilterEffectValue(window.effectsFilter, uploadEffectLevelValue.value);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
  window.onFilterChange(function (filterEffect) {
    dialogHandle.style.left = 20 + '%';
    dialogFat.style.width = 20 + '%';
    uploadEffectLevelValue.value = 20;
    setFilterEffectValue(filterEffect, 20);
  });
})();
