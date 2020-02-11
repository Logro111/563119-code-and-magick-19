'use strict';

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var setup = document.querySelector('.setup');
var setupSimilarList = setup.querySelector('.setup-similar-list');
var setupSimularItem = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();
var wizards = [];

var randomizeArrElement = function (propertiesArr) {
  var randomNumber = Math.floor(Math.random() * propertiesArr.length);
  return propertiesArr[randomNumber];
};

var randomizeName = function (namesArr, surnamesArr) {
  if (Math.floor(Math.random() * 2)) {
    return randomizeArrElement(namesArr) + ' ' + randomizeArrElement(surnamesArr);
  }
  return randomizeArrElement(surnamesArr) + ' ' + randomizeArrElement(namesArr);
};

var randomizeProperty = function (objectArr, i, propertyName, propertiesArr) {
  objectArr[i][propertyName] = randomizeArrElement(propertiesArr);
};

var renderWizard = function (wizard, n) {
  var newWizard = setupSimularItem.cloneNode(true);

  newWizard.querySelector('.setup-similar-label').textContent = wizard[n].name;
  newWizard.querySelector('.wizard-coat').setAttribute('fill', wizard[n].coatColor);
  newWizard.querySelector('.wizard-eyes').setAttribute('fill', wizard[n].eyesColor);
  return newWizard;
};

setup.classList.remove('hidden');

for (var i = 0; i < 4; i++) {
  wizards[i] = {name: randomizeName(names, surnames)};
  randomizeProperty(wizards, i, 'coatColor', coatColors);
  randomizeProperty(wizards, i, 'eyesColor', eyesColors);
}

for (var n = 0; n < wizards.length; n++) {
  fragment.appendChild(renderWizard(wizards, n));
}
setupSimilarList.appendChild(fragment);

setup.querySelector('.setup-similar').classList.remove('hidden');
