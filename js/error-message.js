'use strict';
(function () {
  var loadErrorMessage = document.querySelector('.load-error-message');
  window.showErrorMessage = function (message) {
    loadErrorMessage.textContent = message;
    loadErrorMessage.classList.remove('hidden');
    setTimeout(function () {
      loadErrorMessage.textContent = '';
      loadErrorMessage.classList.add('hidden');
    }, 10000);
  };
})();

