var debug = require('debug')('menu-ui');
var mercury = require('mercury');
var AttributeHook = require('mercury/node_modules/virtual-hyperscript/hooks/attribute-hook');
var h = mercury.h;
var extend = require('xtend');

function Menu (options) {
  options = options || {};
  var model = options.model || {};
  var style = options.style || {};
  var config = options.config || {};

  var events = mercury.input(["setDebug"]);

  // setup state
  var state = mercury.struct({
    model: mercury.struct({
      menuName: mercury.value(model.name),
      items: mercury.array(model.items),
    }),
    style: mercury.struct({
      ui: mercury.value(style.ui || {}),
      menu: mercury.value(style.menu || {}),
      group: mercury.value(style.group || {}),
      item: mercury.value(style.item || {}),
      itemcheckbox: mercury.value(style.itemcheckbox || {}),
      itemradio: mercury.value(style.itemradio || {}),
    }),
    config: mercury.struct({
      debug: mercury.value(config.debug || false),
      debugToggle: mercury.value(config.debugToggle || false),
    }),
    events: events,
    render: mercury.value(Menu.render),
  });

  // setup events
  events.setDebug(function (data) {
    state.config.debug.set(data.debug);
  });

  debug("setup", state);

  return { state: state, events: events };
}

Menu.renderItem = function (state, item) {
  var className = '.item' +
    (item.type && ('.' + item.type) || '')
  ;

  var roleName =
    (item.type && ("menuitem" + item.type)) ||
    "menuitem"
  ;

  var style = item.type &&
    extend(
      state.style.item,
      state.style[item.type]
    ) ||
    state.style.item
  ;

  var content;
  if (typeof item === 'object') {

    content = [
      item.label,
    ];
  } else {
    content = [item];
  }

  return h('li' + className, {
    role: AttributeHook("presentation"),
    style: style,
  }, [
    h('a', {
      role: AttributeHook("menuitem"),
      href: "#",
    }, content),
  ])
  ;
}

Menu.render = function (state, events) {
  debug("render", state, events);

  var menuItems = [];
  for (var i = 0; i < state.model.items.length; i++) {
    var menuItem = state.model.items[i];
    var renderItem = Menu.renderItem.bind(null, state);

    if (typeof menuItem !== 'undefined') {
      if (Array.isArray(menuItem)) {
        menuItems.push(
          h('li', {
            role: AttributeHook("group"),
            style: state.style.group,
          }, [
            h('ul.group', {
              role: AttributeHook("presentation"),
            }, menuItem.map(renderItem))
          ])
        );
      } else {
        menuItems.push(renderItem(menuItem));
      }
    }
  }

  debug("rendering menu items", menuItems);

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
    h('ul.menu', {
      role: AttributeHook("menu"),
      style: state.style.menu,
    }, menuItems),
  ])
  ;
}

module.exports = Menu;
