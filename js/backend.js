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
        var error;
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          case 400:
            error = 'Неверный запрос';
            break;
          case 401:
            error = 'Пользователь не авторизирован ';
            break;
          case 404:
            error = 'Ничего не найдено! ';
            break;
          default:
            error = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;

        }
        if (error) {
          onError(error);
        }
      });
      xhr.addEventListener('error', function () {
        onError(xhr.status + ':' + xhr.statusText);
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', backendSaveUrl);
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;

          default:
            onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError(xhr.status + ':' + xhr.statusText);
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.send(data);
    }
  };
}());
