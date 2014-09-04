var mercury = require('mercury');
var h = mercury.h;
var extend = require('xtend');

module.exports = function _Menu_renderItem (state, item) {
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
    attributes: {
      role: "presentation",
    },
    style: style,
  }, [
    h('a', {
      attributes: {
        role: "menuitem",
      },
      href: "#",
    }, content),
  ])
  ;
}
