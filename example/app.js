var mercury = require('mercury');

var Menu = require('../');

// include app styling
require('./app.css');

// include menu-ui styling
require('../index.css');

// create menu items
var items = [
  [
    "option 1",
    "option 2",
    "option 3",
  ],
  [
    "option 4",
    "option 5",
  ],
];

// create menu-ui component
var menu = Menu({
  model: items,
  style: {
    ui: {
      backgroundColor: 'green',
    },
  },
  config: {
    debug: true,
    debugToggle: true,
  },
});

// start app
mercury.app(document.body, menu.state, Menu.render);
