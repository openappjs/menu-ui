var debug = require('debug')('menu-ui:render');
var mercury = require('mercury');
var h = mercury.h;
var extend = require('xtend');

module.exports = function _Menu_render (state, events) {
  debug(state, events);

  var renderItem = require('./render-item').bind(null, state);

  var menuItems = [];
  for (var i = 0; i < state.model.items.length; i++) {
    var menuItem = state.model.items[i];

    if (typeof menuItem !== 'undefined') {
      if (Array.isArray(menuItem)) {
        var groupItems = [];
        for (var j = 0; j < menuItem.length; j++) {
          groupItems.push(renderItem(menuItem[j], [i, j]));
        }
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
            }, groupItems)
          ])
        );
      } else {
        menuItems.push(renderItem(menuItem, [i]));
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
    h('button.menu', {
      name: "showMenu",
      'ev-click': mercury.event(state.events.buttonClick, {
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
