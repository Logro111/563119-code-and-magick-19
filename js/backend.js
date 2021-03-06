'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;

  var LOAD_URL = 'https://js.dump.academy/code-and-magick/data';
  var SAVE_URL = 'https://js.dump.academy/code-and-magick';
  var statusCodes = {
    OK: 200
  };

  var createHttpRequest = function (onLoad, onError, mainErrorMessage, url, requestType, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCodes.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError(mainErrorMessage);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(requestType, url);
    xhr.send(data);
  };

  window.backend = {
    loadURL: LOAD_URL,
    saveURL: SAVE_URL,
    createHttpRequest: createHttpRequest
  };
})();
