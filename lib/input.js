module.exports = function _Menu_input (events, update) {
  events.setShowMenu(function (data) {
    update.setShowMenu(data.showMenu);
  });
  events.setDebug(function (data) {
    update.setDebug(data.setDebug);
  });
};
