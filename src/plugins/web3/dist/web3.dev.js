"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _web = _interopRequireDefault(require("web3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const Web3 = require('web3');
// const Web3 = require('web3');
// HTTP provider
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
// const web3 = new Web3(window.ethereum);
// await window.ethereum.enable();
// web3.eth.accounts.wallet.add('0x644543Bd5B7Ed9A20e6a53154691F08Db79b5B89');
// web3.eth.getBalance('0x644543Bd5B7Ed9A20e6a53154691F08Db79b5B89')
// .then(balance => console.log(balance));
// const abi = require('./abi.json');
// const contract_address = '0x54e02e18f66F44e9B2AE6bcA4451087A8Bd21E2B';
// const contract = new web3.eth.Contract(abi, contract_address);
// console.log(MintDancing);
// contract.methods.read().call().then(result => console.log(result));
// MintDancing.events.Claim();
// web3.eth.sendTransaction({from: '0x644543Bd5B7Ed9A20e6a53154691F08Db79b5B89', data: '0x644543Bd5B7Ed9A20e6a53154691F08Db79b5B89'});
// will be fired once the receipt is mined
// const abi = require('./abi.json');
// const contract_address = 'CONTRACT_ADDRESS';
// // const web3 = new Web3('')
// const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
// const daiToken = web3.eth.Contract(abi, contract_address);
// console.log(web3);
// Token: 0xd2340d5C6F89f4F180D8EF4BD88FB9C2dE1A977F
// Marketplace: 0x7496DB6c4e736aFeCf22c3425Bd802B6c42216C7
// Coach: 0xC2356314ac584c6Acf097F9A2DD705c0CB5a2c25
// Dancer:	0x1b3b0451873f4D549482B1b1eFf0338E21C02D12
// Crew: 0x7496DB6c4e736aFeCf22c3425Bd802B6c42216C7
// RewardPool:0xdB82CB9305fDdABe0F17f032b1fc2D8Aa5cd3E95
// IDO Wallet:	0x54e02e18f66F44e9B2AE6bcA4451087A8Bd21E2B
var ethEnabled = function ethEnabled() {
  if (window.ethereum) {
    window.web3 = new _web["default"](window.ethereum);
    window.ethereum.enable();
    return true;
  }

  return false;
};

ethEnabled(); // eslint-disable-next-line no-unused-vars

var walletAddress = function walletAddress() {
  return regeneratorRuntime.async(function walletAddress$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", new Promise(function _callee(resolve, reject) {
            var web3;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    web3 = new _web["default"](window.ethereum);
                    _context.prev = 1;
                    _context.next = 4;
                    return regeneratorRuntime.awrap(window.ethereum.request({
                      method: "eth_requestAccounts"
                    }));

                  case 4:
                    resolve(web3);
                    _context.next = 10;
                    break;

                  case 7:
                    _context.prev = 7;
                    _context.t0 = _context["catch"](1);
                    reject(_context.t0);

                  case 10:
                  case "end":
                    return _context.stop();
                }
              }
            }, null, null, [[1, 7]]);
          }));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var connectWallet = function connectWallet() {
  return regeneratorRuntime.async(function connectWallet$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", new Promise(function _callee2(resolve, reject) {
            var web3;
            return regeneratorRuntime.async(function _callee2$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    web3 = new _web["default"](window.ethereum);
                    _context3.prev = 1;
                    _context3.next = 4;
                    return regeneratorRuntime.awrap(window.ethereum.request({
                      method: "eth_requestAccounts"
                    }));

                  case 4:
                    resolve(web3);
                    _context3.next = 10;
                    break;

                  case 7:
                    _context3.prev = 7;
                    _context3.t0 = _context3["catch"](1);
                    reject(_context3.t0);

                  case 10:
                  case "end":
                    return _context3.stop();
                }
              }
            }, null, null, [[1, 7]]);
          }));

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var _default = connectWallet;
exports["default"] = _default;