'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDS_AMOUNT = 4;

  var setup = document.querySelector('.setup');
  var setupSimilarList = setup.querySelector('.setup-similar-list');
  var setupSimularItem = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();
  var form = setup.querySelector('.setup-wizard-form');

  var renderWizard = function (wizard) {
    var newWizard = setupSimularItem.cloneNode(true);

    newWizard.querySelector('.setup-similar-label').textContent = wizard.name;
    newWizard.querySelector('.wizard-coat').setAttribute('fill', wizard.colorCoat);
    newWizard.querySelector('.wizard-eyes').setAttribute('fill', wizard.colorEyes);
    return newWizard;
  };

  var onLoadSuccess = function (wizards) {
    for (var i = 0; i < WIZARDS_AMOUNT; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    setupSimilarList.appendChild(fragment);
    setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  window.backend.createHttpRequest(onLoadSuccess, window.onError, 'Ошибка загрузки', window.backend.loadURL, 'GET');

  var setupWizard = setup.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var fireball = setup.querySelector('.setup-fireball-wrap');
  var coatColorField = setup.querySelector('[name="coat-color"]');
  var eyesColorField = setup.querySelector('[name="eyes-color"]');
  var fireballColorField = setup.querySelector('[name="fireball-color"]');

  var changeColor = function (arrElement, stylizedElement, propertyName, inputName) {
    var i = 1;
    return function () {
      if (i >= arrElement.length) {
        i = 0;
      }
      stylizedElement.style[propertyName] = arrElement[i];
      inputName.value = arrElement[i];
      i++;
    };
  };

  var onWizardCoatClick = changeColor(COAT_COLORS, wizardCoat, 'fill', coatColorField);
  var onWizardEyesClick = changeColor(EYES_COLORS, wizardEyes, 'fill', eyesColorField);
  var onFireballClick = changeColor(FIREBALL_COLORS, fireball, 'background-color', fireballColorField);

  wizardEyes.addEventListener('click', function () {
    onWizardEyesClick();
  });

  wizardCoat.addEventListener('click', function () {
    onWizardCoatClick();
  });

  fireball.addEventListener('click', function () {
    onFireballClick();
  });

  var onSaveSuccess = function () {
    setup.classList.add('hidden');
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    var data = new FormData(form);
    window.backend.createHttpRequest(onSaveSuccess, window.onError, 'Ошибка отправки данных', window.backend.saveURL, 'POST', data);
  };

  form.addEventListener('submit', onFormSubmit);
})();
