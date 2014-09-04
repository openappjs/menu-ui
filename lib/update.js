module.exports = function _Menu_update (state) {
  return {
    setDebug: function (debug) {
      state.config.setDebug(debug);
    },
    setShowMenu: function (showMenu) {
      state.transient.showMenu.set(showMenu);
    },
  };
};
