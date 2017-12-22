'use strict';
(function () {
  var BACKEND_URL = 'https://1510.dump.academy/kekstagram/data';
  var BACKEND_SAVE_URL = 'https://1510.dump.academy/kekstagram';
  var Error = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORISED: 401,
    NOT_FOUND: 404
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', BACKEND_URL);
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case Error.OK:
            onLoad(xhr.response);
            break;
          case Error.BAD_REQUEST:
            error = 'Неверный запрос';
            break;
          case Error.UNAUTHORISED:
            error = 'Пользователь не авторизирован ';
            break;
          case Error.NOT_FOUND:
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
      xhr.open('POST', BACKEND_SAVE_URL);
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case Error.OK:
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
