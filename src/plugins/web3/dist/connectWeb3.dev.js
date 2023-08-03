"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _web = _interopRequireDefault(require("web3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var web3 = new _web["default"](window.ethereum);

var Wallet = function Wallet() {
  return {
    connectWallet: function connectWallet() {
      return regeneratorRuntime.async(function connectWallet$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(window.ethereum.request({
                method: "eth_requestAccounts"
              }));

            case 3:
              return _context.abrupt("return", web3);

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 6]]);
    }
  };
};

var _default = Wallet;
exports["default"] = _default;