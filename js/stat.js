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
var textColor = '#000';
var DESCRIPTION_INDENT = 20;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
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

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px "PT Mono"';
  ctx.fillStyle = textColor;
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + DESCRIPTION_INDENT + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + DESCRIPTION_INDENT + FONT_GAP * 2);

  var renderLabels = function (context, text, n) {
    context.fillStyle = textColor;
    context.fillText(text, CLOUD_X + COLUMN_GAP + (TEXT_WIDTH + COLUMN_GAP) * n, CLOUD_Y + CLOUD_HEIGHT - GAP);
  };

  var maxTime = getMaxElement(times);

  for (var i = 0; i < Math.min(names.length, times.length); i++) {
    renderLabels(ctx, names[i], i);
    ctx.fillText(Math.round(times[i]), CLOUD_X + COLUMN_GAP + (TEXT_WIDTH + COLUMN_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP - BAR_HEIGHT * times[i] / maxTime - GAP);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(255,' + randomizePercent() + ',' + randomizePercent() + ')';
    }
    ctx.fillRect(CLOUD_X + COLUMN_GAP + (BAR_WIDTH + COLUMN_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP - BAR_HEIGHT * times[i] / maxTime, BAR_WIDTH, BAR_HEIGHT * times[i] / maxTime);
  }

  if (names.length > times.length) {
    for (i = times.length; i < names.length; i++) {
      renderLabels(ctx, names[i], i);
      ctx.fillText(Math.round(times[i]), CLOUD_X + COLUMN_GAP + (TEXT_WIDTH + COLUMN_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP - BAR_HEIGHT * times[i] / maxTime - GAP);
    }
  }

  if (times.length > names.length) {
    for (i = names.length; i < times.length; i++) {
      renderLabels(ctx, '???', i);
      ctx.fillText(Math.round(times[i]), CLOUD_X + COLUMN_GAP + (TEXT_WIDTH + COLUMN_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP - BAR_HEIGHT * times[i] / maxTime - GAP);
      ctx.fillStyle = 'hsl(255,' + randomizePercent() + ',' + randomizePercent() + ')';
      ctx.fillRect(CLOUD_X + COLUMN_GAP + (BAR_WIDTH + COLUMN_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP - BAR_HEIGHT * times[i] / maxTime, BAR_WIDTH, BAR_HEIGHT * times[i] / maxTime);
    }
  }
};
