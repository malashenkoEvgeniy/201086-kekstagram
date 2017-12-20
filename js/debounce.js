'use strict';
(function () {
  var savedArguments = [];
  var time = 0;
  var timer;
  window.debounce = function (foo) {
    return function () {
      savedArguments = arguments;
      if (new Date() - time > 500) {
        time = new Date();
        foo.apply(null, savedArguments);
      } else {
        clearTimeout(timer);
        timer = setTimeout(function () {
          foo.apply(null, savedArguments);
        }, 500);
      }
    };
  };
}());
