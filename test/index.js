var test = require('tape');
var mercury = require('mercury');
var raf = require('raf');
var event = require('synthetic-dom-events');
var document = require('global/document');

var Menu = require('../');

// if we are in a browser
if (process.browser) {
  // include example app styles
  require('../example/app.css');

  // include menu-ui styles
  require('../index.css');
}

function end (t, el, elRm) {
  // cleanup
  elRm();
  document.body.removeChild(el);
  t.end();
}

test("creating a menu of random content", function (t) {
  // setup
  var items = [
    "0","one","2","three","2*2","25/5",
  ];
  var menu = Menu({
    model: items,
  });

  // start app
  var elRm = mercury.app(document.body, menu.state, Menu.render);

  // after render
  raf(function () {
    var el = document.getElementsByClassName('menu ui')[0];

    var controls = el.childNodes[0];
    t.ok(controls);
    t.equal(controls.className, "controls");
    var menu = el.childNodes[1];
    t.ok(menu);
    t.equal(menu.className, "menu");

    for (var i = 0; i < menu.childNodes.length; i++) {
      var itemContainer = menu.childNodes[i];
      t.equal(itemContainer.className, "item");
      t.equal(itemContainer.childNodes.length, 1);
      var item = itemContainer.childNodes[0];
      t.equal(
        item.textContent || item.data,
        items[i]
      );
    }

    end(t, el, elRm);
  });
});
