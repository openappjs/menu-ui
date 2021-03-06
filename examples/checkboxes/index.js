var mercury = require('mercury');

var Menu = require('../../');

// include app styling
require('./index.css');

// include menu-ui styling
require('../../index.css');

// create menu items
var items = [
  {
    label: "option 1",
    type: "checkbox",
  }, {
    label: "option 2",
    type: "checkbox",
  }, {
    label: "option 3",
    type: "checkbox",
  },
];

// create update functions
var update = {
  log: function (state) {
    return console.log.bind(console);
  },
};

// create input functions
var input = {
  itemClick: function (update) {
    return function (data) {
      update.log(data);
    };
  },
};

// create menu-ui component
var menu = Menu({
  model: {
    label: "menu",
    items: items,
  },
  update: update,
  input: input,
  style: {
    ui: {
      backgroundColor: 'green',
    },
  },
  config: {
//    debug: true,
//    debugToggle: true,
  },
});

// start app
mercury.app(document.body, menu.state, Menu.render);
