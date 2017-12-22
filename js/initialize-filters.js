'use strict';
(function () {
  var DEFAULT_VALUE = 20;
  var FILTER_MAX_VALUE = 100;
  var dialogHandle = document.querySelector('.upload-effect-level-pin');
  var dialogFat = document.querySelector('.upload-effect-level-val');
  var uploadEffectLevelValue = document.querySelector('.upload-effect-level-value');
  var callback = null;
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
        uploadEffectLevelValue.value = Math.round(FILTER_MAX_VALUE / max * futureX);
      }
      dialogFat.style.width = dialogHandle.style.left;
      callback(uploadEffectLevelValue.value);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
  window.initializeFilters = function (foo) {
    if (typeof foo === 'function') {
      callback = foo;
    }
  };
  window.clearFilter = function () {
    dialogHandle.style.left = DEFAULT_VALUE + '%';
    dialogFat.style.width = DEFAULT_VALUE + '%';
    uploadEffectLevelValue.value = DEFAULT_VALUE;
    window.setFilterEffectValue(DEFAULT_VALUE);
  };
})();
