var debug = require('debug')('menu-ui:render');
var mercury = require('mercury');
var h = mercury.h;
var extend = require('xtend');

module.exports = function _Menu_render (state, events) {
  debug(state, events);

  var menuItems = [];
  for (var i = 0; i < state.model.items.length; i++) {
    var menuItem = state.model.items[i];
    var renderItem = require('./render-item').bind(null, state);

    if (typeof menuItem !== 'undefined') {
      if (Array.isArray(menuItem)) {
        menuItems.push(
          h('li', {
            attributes: {
              role: "group",
            },
            style: state.style.group,
          }, [
            h('ul.group', {
              attributes: {
                role: "presentation",
              },
            }, menuItem.map(renderItem))
          ])
        );
      } else {
        menuItems.push(renderItem(menuItem));
      }
    }
  }

  debug("rendering menu items", menuItems);

  var transient = state.transient;
  var style = state.style;
  style.menu = style.menu || {};
  var config = state.config;

  return h('div.menu.ui', {
    style: state.style.ui,
  }, [
    config.debugToggle ? h('input.debug.toggle', {
      type: "checkbox",
      name: "debug",
      checked: config.debug,
      'ev-event': mercury.changeEvent(state.events.setDebug),
    }) : [],
    h('div.controls', {
      style: state.style.controls,
    }, config.debug ? [
    ] : []),
    h('button.menu', {
      name: "showMenu",
      'ev-click': mercury.event(state.events.setShowMenu, {
        showMenu: !transient.showMenu,
      }),
    }, state.model.label),
    h('ul.menu', {
      attributes: {
        role: "menu",
      },
      style: extend(style.menu, {
        position: transient.showMenu ? "relative" : "absolute",
        top: transient.showMenu ? "0": "100%",
        display: transient.showMenu ? style.menu.display : "none",
      }),
    }, menuItems),
  ])
  ;
}
