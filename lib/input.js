module.exports = function _Menu_input (options, events, update) {
  var optInput = options.input || {};

  events.itemClick(optInput.itemClick(update));

  events.buttonClick(function (data) {
    update.setShowMenu(data.showMenu);
  });
};
