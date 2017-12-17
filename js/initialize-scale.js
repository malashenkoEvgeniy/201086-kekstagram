'use strict';
(function () {
  window.initializeScale = function (elem, callback) {
    var scale = parseInt(elem.value, 10);
    if (typeof callback === 'function') {
      callback(scale);
    }
  };
})();
