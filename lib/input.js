module.exports = function _Menu_input (options, events, update) {
  var optInput = options.input || {};

  events.buttonClick(function (data) {
    update.setShowMenu(data.showMenu);
  });

  events.itemClick(function (data) {
    if (data.item.type === 'checkbox' || data.item.type === 'radio') {
      update.checkItem(data.item);
    }

    // additional handler
    if (typeof optInput.itemClick === 'function') {
      optInput.itemClick(update)(data);
    }
  });
};
