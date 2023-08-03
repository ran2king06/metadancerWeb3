"use strict";

require("@/assets/css/main.css");

require("ant-design-vue/dist/antd.css");

require("bootstrap");

require("bootstrap/dist/css/bootstrap.min.css");

var _vue = require("vue");

var _App = _interopRequireDefault(require("./App.vue"));

var _battle = _interopRequireDefault(require("./plugins/web3/battle"));

var _display = _interopRequireDefault(require("./plugins/web3/display"));

var _marketplace = _interopRequireDefault(require("./plugins/web3/marketplace"));

var _mint = _interopRequireDefault(require("./plugins/web3/mint"));

var _wallet = _interopRequireDefault(require("./plugins/web3/wallet"));

var _router = _interopRequireDefault(require("./router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import App from './App.vue';
var app = (0, _vue.createApp)(_App["default"]);
app.provide('Wallet', _wallet["default"]);
app.provide('Mint', _mint["default"]);
app.provide('Display', _display["default"]);
app.provide('Battle', _battle["default"]);
app.provide('MarketPlace', _marketplace["default"]);
app.use(_router["default"]).mount('#app');