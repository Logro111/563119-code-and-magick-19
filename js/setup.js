'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var NUMBER_OF_WIZARDS = 4;

var setup = document.querySelector('.setup');
var setupSimilarList = setup.querySelector('.setup-similar-list');
var setupSimularItem = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

var randomizeArrElement = function (propertiesArr) {
  var randomNumber = Math.floor(Math.random() * propertiesArr.length);
  return propertiesArr[randomNumber];
};

var randomizeName = function (namesArr, surnamesArr) {
  var name;
  name = randomizeArrElement(surnamesArr) + ' ' + randomizeArrElement(namesArr);
  if (Math.floor(Math.random() * 2)) {
    name = randomizeArrElement(namesArr) + ' ' + randomizeArrElement(surnamesArr);
  }
  return name;
};

var randomizeProperty = function (object, propertyName, propertiesArr) {
  object[propertyName] = randomizeArrElement(propertiesArr);
};

var renderWizard = function (wizard) {
  var newWizard = setupSimularItem.cloneNode(true);

  newWizard.querySelector('.setup-similar-label').textContent = wizard.name;
  newWizard.querySelector('.wizard-coat').setAttribute('fill', wizard.coatColor);
  newWizard.querySelector('.wizard-eyes').setAttribute('fill', wizard.eyesColor);
  return newWizard;
};

var createWizards = function (amountOfWizards) {
  var wizard;
  var wizards = [];
  for (var i = 0; i < amountOfWizards; i++) {
    wizard = {
      name: randomizeName(NAMES, SURNAMES)
    };
    randomizeProperty(wizard, 'coatColor', COAT_COLORS);
    randomizeProperty(wizard, 'eyesColor', EYES_COLORS);
    wizards.push(wizard);
  }
  return wizards;
};

var renderWizards = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(arr[i]));
  }
  setupSimilarList.appendChild(fragment);
};

var wizardsArr = createWizards(NUMBER_OF_WIZARDS);

renderWizards(wizardsArr);

setup.querySelector('.setup-similar').classList.remove('hidden');

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userName = setup.querySelector('.setup-user-name');
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

var onSetupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopupSetup();
  }
};

var onUserNameEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    evt.stopPropagation();
  }
};

var openPopupSetup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscPress);
};

var closePopupSetup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onSetupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopupSetup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopupSetup();
  }
});

setupClose.addEventListener('click', function () {
  closePopupSetup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopupSetup();
  }
});

userName.addEventListener('keydown', onUserNameEscPress);
