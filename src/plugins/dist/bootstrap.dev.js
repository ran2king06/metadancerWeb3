"use strict";

require("bootstrap-vue/dist/bootstrap-vue.css");

require("bootstrap/dist/css/bootstrap.css");

var _bootstrapVue2 = require("bootstrap-vue");

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// plugins/bootstrap.js
// Import Bootstrap an BootstrapVue CSS files (order is important)
// Make BootstrapVue available throughout your project
_vue["default"].use(_bootstrapVue2.BootstrapVue); // Optionally install the BootstrapVue icon components plugin


_vue["default"].use(_bootstrapVue2.IconsPlugin);