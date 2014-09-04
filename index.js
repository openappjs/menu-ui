var debug = require('debug')('menu-ui');
var mercury = require('mercury');

function Menu (options) {
  options = options || {};

  var events = mercury.input(["setShowMenu", "setActive", "setDebug"]);

  var state = require('./lib/state')(options, events);

  // setup events
  events.setShowMenu(function (data) {
    debug("setShowMenu", data);
    state.transient.showMenu.set(data.showMenu);
  });
  events.setDebug(function (data) {
    debug("setDebug", data);
    state.config.debug.set(data.debug);
  });

  debug("setup", state);

  return { state: state, events: events };
}

Menu.renderItem = require('./lib/render-item');
Menu.render = require('./lib/render');

module.exports = Menu;
