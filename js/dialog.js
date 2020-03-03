'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userName = setup.querySelector('.setup-user-name');

  var onSetupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopupSetup);
  };

  var onUserNameEscPress = function (evt) {
    if (evt.key === window.util.esc) {
      evt.stopPropagation();
    }
  };

  var openPopupSetup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onSetupEscPress);
    window.dialogMove.reset();
  };

  var closePopupSetup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onSetupEscPress);
    window.dialogMove.reset();
  };

  setupOpen.addEventListener('click', function () {
    openPopupSetup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopupSetup);
  });

  setupClose.addEventListener('click', function () {
    closePopupSetup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopupSetup);
  });

  userName.addEventListener('keydown', onUserNameEscPress);
})();
