var mercury = require('mercury');

module.exports = function _Menu_State (options, events) {
  var model = options.model || {};
  var style = options.style || {};
  var config = options.config || {};

  // setup menu item observs
  function normalize (item) {
    // normalize item to object
    if (typeof item !== 'object') {
      return {
        label: item,
      };
    }
    return item;
  }
  var menuItems = [];
  for (var i = 0; i < model.items.length; i++) {
    var menuItem = model.items[i];
    if (typeof menuItem !== 'undefined') {
      if (Array.isArray(menuItem)) {
        var groupItems = [];
        for (var j = 0; j < menuItem.length; j++) {
          menuItem[j] = normalize(menuItem[j]);
          menuItem[j].position = [i, j];
          groupItems.push(mercury.struct(menuItem[j]));
        }
        menuItems.push(mercury.array(groupItems));
      } else {
        menuItem = normalize(menuItem);
        menuItem.position = [i];
        menuItems.push(mercury.struct(menuItem));
      }
    }
  }


  // create state
  return mercury.struct({
    model: mercury.struct({
      label: mercury.value(model.label || ''),
      items: mercury.array(menuItems),
      active: mercury.value(model.active || null),
    }),
    style: mercury.struct({
      ui: mercury.value(style.ui || {}),
      menu: mercury.value(style.menu || {}),
      group: mercury.value(style.group || {}),
      item: mercury.value(style.item || {}),
      itemcheckbox: mercury.value(style.itemcheckbox || {}),
      itemradio: mercury.value(style.itemradio || {}),
    }),
    transient: mercury.struct({
      showMenu: mercury.value(false),
    }),
    config: mercury.struct({}),
    events: events,
    render: mercury.value(require('./render')),
  });
}
