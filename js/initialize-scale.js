'use strict';
(function () {
  window.initializeScale = function (elem, callback) {
    var scale = parseInt(elem.value);
    if (typeof callback === 'function') {
      callback(scale);
    }
  };
})();
