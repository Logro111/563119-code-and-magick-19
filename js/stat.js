'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
var COLUMN_GAP = 50;
var TEXT_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var DESCRIPTION_INDENT = 20;

var textColor = '#000';

var renderCloud = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var randomizePercent = function () {
  return Math.floor(Math.random() * 101) + '%';
};

var renderText = function (ctx, text, x, y) {
  var stringsArr = text.split('/n');
  stringsArr.forEach(function (string, i) {
    ctx.fillText(string, x, y + FONT_GAP * (i + 1));
  });
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#fff');

  ctx.font = '16px "PT Mono"';
  ctx.fillStyle = textColor;
  renderText(ctx, 'Ура вы победили!/nСписок результатов:', CLOUD_X + GAP, CLOUD_Y + DESCRIPTION_INDENT);

  var renderResult = function (context, text, xCoordinate, n, noResults) {
    context.fillStyle = textColor;
    context.fillText(text, xCoordinate, CLOUD_Y + CLOUD_HEIGHT - GAP);
    if (noResults === false) {
      ctx.fillText(Math.round(times[n]), xCoordinate, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP - BAR_HEIGHT * times[n] / maxTime - GAP);
      if (names[n] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'hsl(255,' + randomizePercent() + ',' + randomizePercent() + ')';
      }
      ctx.fillRect(xCoordinate, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP - BAR_HEIGHT * times[n] / maxTime, BAR_WIDTH, BAR_HEIGHT * times[n] / maxTime);
    }
  };

  var maxTime = getMaxElement(times);

  for (var i = 0; i < Math.min(names.length, times.length); i++) {
    renderResult(ctx, names[i], CLOUD_X + COLUMN_GAP + (TEXT_WIDTH + COLUMN_GAP) * i, i, false);
  }

  if (names.length > times.length) {
    for (i = times.length; i < names.length; i++) {
      renderResult(ctx, names[i], CLOUD_X + COLUMN_GAP + (TEXT_WIDTH + COLUMN_GAP) * i, i, true);
    }
  }

  if (times.length > names.length) {
    for (i = names.length; i < times.length; i++) {
      renderResult(ctx, '???', CLOUD_X + COLUMN_GAP + (TEXT_WIDTH + COLUMN_GAP) * i, i, false);
    }
  }
};
