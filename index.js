var debug = require('debug')('menu-ui');
var mercury = require('mercury');

function Menu (options) {
  options = options || {};

  var events = mercury.input(["setShowMenu", "setActive", "setDebug"]);
  var state = require('./lib/state')(options, events);
  var update = require('./lib/update')(state);
  require('./lib/input')(events, update);

  debug("setup", state());

  return { state: state, events: events };
}

Menu.renderItem = require('./lib/render-item');
Menu.render = require('./lib/render');

module.exports = Menu;
