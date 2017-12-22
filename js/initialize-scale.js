'use strict';
(function () {
  var SCALE_NOTATION = 10;
  window.initializeScale = function (elem, callback) {
    var scale = parseInt(elem.value, SCALE_NOTATION);
    if (typeof callback === 'function') {
      callback(scale);
    }
  };
})();
