'use strict';
(function () {
  var backendUrl = 'https://1510.dump.academy/kekstagram/data';
  var backendSaveUrl = 'https://1510.dump.academy/kekstagram';

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', backendUrl);
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });
      xhr.addEventListener('error', function () {
        onError(xhr.status + ':' + xhr.statusText);
      });
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', backendSaveUrl);
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });
      xhr.addEventListener('error', function () {
        onError(xhr.status + ':' + xhr.statusText);
      });
      xhr.send(data);
    }

  };
}());
