module.exports = function _Menu_input (options, events, update) {
  var optInput = options.input || {};

  events.itemClick(optInput.itemClick(update));

  events.setShowMenu(function (data) {
    update.setShowMenu(data.showMenu);
  });
};
