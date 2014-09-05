module.exports = function _Menu_input (options, events, update) {
  var optInput = options.input || {};

  events.buttonClick(function (data) {
    update.setShowMenu(data.showMenu);
  });

  // mixin input functions from options
  for (var key in optInput) {
    if (typeof optInput[key] === 'function') {
      events[key](optInput[key](update));
    }
  }
};
