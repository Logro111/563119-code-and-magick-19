'use strict';

(function () {
  var rateWizards = function (wizard) {
    var raiting = 0;
    if (window.setup.coatColor === wizard.colorCoat) {
      raiting += 2;
    }
    if (window.setup.eyesColor === wizard.colorEyes) {
      raiting += 1;
    }
    return raiting;
  };

  var rateNames = function (firstName, secondName) {
    var result = 0;
    if (firstName > secondName) {
      result = 1;
    } else if (firstName < secondName) {
      result = -1;
    }
    return result;
  };
  var sortWizards = function (wizards) {

    wizards.sort(function (first, second) {
      var result = rateWizards(second) - rateWizards(first);
      if (result === 0) {
        result = rateNames(first.name, second.name);
      }
      return result;
    });

    return wizards;

  };

  window.sortWizards = sortWizards;
})();
