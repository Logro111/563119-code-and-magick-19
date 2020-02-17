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

setup.classList.remove('hidden');

var wizardsArr = createWizards(NUMBER_OF_WIZARDS);

renderWizards(wizardsArr);

setup.querySelector('.setup-similar').classList.remove('hidden');
