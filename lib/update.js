module.exports = function _Menu_update (options, state) {
  var optUpdate = options.update || {};

  // setup default update functions
  var update =  {
    setDebug: function (debug) {
      state.config.setDebug(debug);
    },
    setShowMenu: function (showMenu) {
      state.transient.showMenu.set(showMenu);
    },
  };
  // mixin update functions from options
  for (var key in optUpdate) {
    if (typeof optUpdate[key] === 'function') {
      update[key] = optUpdate[key](state);
    }
  }
  return update;
};
