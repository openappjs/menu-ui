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
    model: {
      label: "Menu",
      items: items,
    },
  });

  // start app
  var elRm = mercury.app(document.body, menu.state, Menu.render);

  // after render
  raf(function () {
    var el = document.getElementsByClassName('menu ui')[0];

    var button = el.childNodes[0];
    t.ok(button);
    t.equal(button.className, "menu");
    var buttonContent = button.childNodes[0];
    t.equal(buttonContent.textContent || buttonContent.data, "Menu");
    var menu = el.childNodes[1];
    t.ok(menu);
    t.equal(menu.className, "menu");

    for (var i = 0; i < menu.childNodes.length; i++) {
      var itemContainer = menu.childNodes[i];
      t.equal(itemContainer.getAttribute('role'), "presentation");
      t.equal(itemContainer.className, "item");
      t.equal(itemContainer.childNodes.length, 1);
      var item = itemContainer.childNodes[0];
      t.equal(item.getAttribute('role'), "menuitem");
      var itemContent = item.childNodes[0];
      t.equal(
        itemContent.textContent || itemContent.data,
        items[i]
      );
    }

    end(t, el, elRm);
  });
});

test("creating a menu of random grouped content", function (t) {
  // setup
  var items = [
    ["0","one","2"],["three","2*2","25/5"],
  ];
  var menu = Menu({
    model: {
      label: "Grouped Menu",
      items: items,
    },
  });

  // start app
  var elRm = mercury.app(document.body, menu.state, Menu.render);

  // after render
  raf(function () {
    var el = document.getElementsByClassName('menu ui')[0];

    var button = el.childNodes[0];
    t.ok(button);
    t.equal(button.className, "menu");
    var menu = el.childNodes[1];
    t.ok(menu);
    t.equal(menu.className, "menu");

    for (var i = 0; i < menu.childNodes.length; i++) {
      var groupContainer = menu.childNodes[i];
      t.equal(groupContainer.getAttribute('role'), "group");
      t.equal(groupContainer.childNodes.length, 1);
      var group = groupContainer.childNodes[0];
      t.equal(group.className, "group");
      t.equal(group.getAttribute('role'), "presentation");
      t.equal(group.childNodes.length, items[i].length);

      for (var j = 0; j < group.childNodes.length; j++) {
        var itemContainer = group.childNodes[j];
        t.equal(itemContainer.getAttribute('role'), "presentation");
        t.equal(itemContainer.className, "item");
        t.equal(itemContainer.childNodes.length, 1);
        var item = itemContainer.childNodes[0];
        t.equal(item.getAttribute('role'), "menuitem");
        var itemContent = item.childNodes[0];
        t.equal(
          itemContent.textContent || itemContent.data,
          items[i][j]
        );
      }
    }

    end(t, el, elRm);
  });
});
