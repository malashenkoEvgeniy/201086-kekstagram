'use strict';
(function () {
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var setFilterEffectValue = function (filterValue) {
    var filterEffect = window.effectsFilter;
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
  var filterChangeFoo = null;
  window.onFilterChange = function (foo) {
    filterChangeFoo = foo;
  };
  var uploadEffectControls = document.querySelector('.upload-effect-controls');
  var uploadEffectNone = document.querySelector('#upload-effect-none');
  var dialogAmbit = document.querySelector('.upload-effect-level');
  uploadEffectControls.addEventListener('change', function (evt) {
    effectImagePreview.className = 'effect-image-preview ' + evt.target.id.slice(7);
    effectImagePreview.style.filter = '';
    window.effectsFilter = evt.target.id.slice(7);
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
    dialogHandle.style.left = 20 + '%';
    dialogFat.style.width = 20 + '%';
    uploadEffectLevelValue.value = 20;
    setFilterEffectValue(20);
  });
  window.initializeFilters(setFilterEffectValue);
})();
