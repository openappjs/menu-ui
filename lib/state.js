var mercury = require('mercury');

module.exports = function _Menu_State (options, events) {
  var model = options.model || {};
  var style = options.style || {};
  var config = options.config || {};

  return mercury.struct({
    model: mercury.struct({
      label: mercury.value(model.label || ''),
      items: mercury.array(model.items || []),
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
