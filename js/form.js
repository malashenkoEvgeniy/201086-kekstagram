'use strict';
(function () {
  var DEFAULT_VALUE = 20;
  var GRAYSCALE_RATE = 0.01;
  var SEPIA_RATE = 0.01;
  var BLUR_RATE = 0.03;
  var BRIGHTNESS_RATE = 0.03;
  var START_SYMBOL = 7;
  var effectImagePreview = document.querySelector('.effect-image-preview');
  window.setFilterEffectValue = function (filterValue) {
    var filterEffect = document.querySelector('input[name="effect"]:checked').id.slice(START_SYMBOL);
    if (filterEffect === 'effect-chrome') {
      effectImagePreview.style.filter = 'grayscale(' + (filterValue * GRAYSCALE_RATE) + ')';
    } else if (filterEffect === 'effect-sepia') {
      effectImagePreview.style.filter = 'sepia(' + (filterValue * SEPIA_RATE) + ')';
    } else if (filterEffect === 'effect-marvin') {
      effectImagePreview.style.filter = 'invert(' + filterValue + '%)';
    } else if (filterEffect === 'effect-phobos') {
      effectImagePreview.style.filter = 'blur(' + filterValue * BLUR_RATE + 'px)';
    } else if (filterEffect === 'effect-heat') {
      effectImagePreview.style.filter = 'brightness(' + filterValue * BRIGHTNESS_RATE + ')';
    } else {
      effectImagePreview.style.filter = '';
    }
  };
  var filterChangeFoo = null;
  window.onFilterChange = function (foo) {
    filterChangeFoo = foo;
  };
  var uploadEffectControls = document.querySelector('.upload-effect-controls');
  var uploadEffectNone = document.querySelector('#upload-effect-none');
  var dialogAmbit = document.querySelector('.upload-effect-level');
  uploadEffectControls.addEventListener('change', function (evt) {
    effectImagePreview.style.filter = '';
    window.effectsFilter = evt.target.id.slice(START_SYMBOL);
    filterChangeFoo();

    if (uploadEffectNone.checked) {
      dialogAmbit.classList.add('hidden');
    } else {
      dialogAmbit.classList.remove('hidden');
    }
  }, true);

  var dialogHandle = document.querySelector('.upload-effect-level-pin');
  var dialogFat = document.querySelector('.upload-effect-level-val');

  var uploadEffectLevelValue = document.querySelector('.upload-effect-level-value');
  window.onFilterChange(function () {
    dialogHandle.style.left = DEFAULT_VALUE + '%';
    dialogFat.style.width = DEFAULT_VALUE + '%';
    uploadEffectLevelValue.value = DEFAULT_VALUE;
    window.setFilterEffectValue(DEFAULT_VALUE);
  });
  window.initializeFilters(window.setFilterEffectValue);
})();
