"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _web = _interopRequireDefault(require("web3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var web3 = new _web["default"](window.ethereum);

var tokenMDC = require('./abi/token_mdc.json');

var crewAbi = require('./abi/crew_abi.json');

var rewardpoolAbi = require('./abi/rewardpool_abi.json');

var tokenAddress = process.env.VUE_APP_TOKEN_ADDRESS;
var crewAddress = process.env.VUE_APP_CREW_ADDRESS;
var rewardpoolAdress = process.env.VUE_APP_REWARD_POOL_ADDRESS;
var crewContract = new web3.eth.Contract(crewAbi, crewAddress);
var rewardpoolContract = new web3.eth.Contract(rewardpoolAbi, rewardpoolAdress);
var walletAddress;
var chainId = 56; // 137 Polygon Mainnet //97 bsc tesnet

var Wallet = function Wallet() {
  return {
    getAccount: function getAccount() {
      return regeneratorRuntime.async(function getAccount$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(typeof window.ethereum !== 'undefined')) {
                _context.next = 12;
                break;
              }

              _context.prev = 1;
              _context.next = 4;
              return regeneratorRuntime.awrap(window.ethereum.request({
                method: "eth_accounts"
              }).then(function (acc) {
                walletAddress = acc[0];
              }));

            case 4:
              _context.next = 10;
              break;

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](1);
              console.log(_context.t0);
              walletAddress = 0;

            case 10:
              _context.next = 14;
              break;

            case 12:
              alert("Please install metamask.");
              return _context.abrupt("return", 0);

            case 14:
              return _context.abrupt("return", walletAddress);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 6]]);
    },
    connectWallet: function connectWallet() {
      return regeneratorRuntime.async(function connectWallet$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(typeof window.ethereum !== 'undefined')) {
                _context2.next = 13;
                break;
              }

              _context2.prev = 1;
              _context2.next = 4;
              return regeneratorRuntime.awrap(window.ethereum.request({
                method: "eth_requestAccounts"
              }).then(function (acc) {
                // console.log(acc[0]);
                walletAddress = acc[0];
              }));

            case 4:
              _context2.next = 10;
              break;

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](1);
              console.log(_context2.t0);
              walletAddress = 0;

            case 10:
              return _context2.abrupt("return", walletAddress);

            case 13:
              alert("Please install metamask.");
              return _context2.abrupt("return", 0);

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[1, 6]]);
    },
    // chainName: 'Polygon Mainnet',
    // nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
    // rpcUrls: ['https://polygon-rpc.com/']
    switchNetwork: function switchNetwork() {
      return regeneratorRuntime.async(function switchNetwork$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(window.ethereum.networkVersion !== chainId)) {
                _context3.next = 12;
                break;
              }

              _context3.prev = 1;
              _context3.next = 4;
              return regeneratorRuntime.awrap(window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{
                  chainId: web3.utils.toHex(chainId)
                }]
              }));

            case 4:
              return _context3.abrupt("return", true);

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](1);

              if (!(_context3.t0.code === 4902)) {
                _context3.next = 12;
                break;
              }

              _context3.next = 12;
              return regeneratorRuntime.awrap(window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainName: 'Binance Smart Chain',
                  chainId: web3.utils.toHex(chainId),
                  nativeCurrency: {
                    name: 'Binance Smart Chain',
                    decimals: 18,
                    symbol: 'BNB'
                  },
                  rpcUrls: ['https://bsc-dataseed.binance.org/']
                }]
              }));

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[1, 7]]);
    },
    checkBalanceBNB: function checkBalanceBNB() {
      var web3MDC, balance;
      return regeneratorRuntime.async(function checkBalanceBNB$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.switchNetwork());

            case 2:
              // const testnet = process.env.VUE_APP_TESTNET;
              web3MDC = new _web["default"](_web["default"].givenProvider || 'ws://some.local-or-remote.node:8546');
              _context4.next = 5;
              return regeneratorRuntime.awrap(web3MDC.eth.getBalance(walletAddress));

            case 5:
              balance = _context4.sent;
              return _context4.abrupt("return", web3.utils.fromWei(balance, 'ether'));

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    },
    checkBalanceMDC: function checkBalanceMDC() {
      var tokenContract, balance;
      return regeneratorRuntime.async(function checkBalanceMDC$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.switchNetwork());

            case 2:
              // const testnet = process.env.VUE_APP_TESTNET;
              tokenContract = new web3.eth.Contract(tokenMDC, tokenAddress);
              _context5.next = 5;
              return regeneratorRuntime.awrap(tokenContract.methods.balanceOf(walletAddress).call());

            case 5:
              balance = _context5.sent;
              return _context5.abrupt("return", web3.utils.fromWei(balance, 'ether'));

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    },
    // Get unclaimed reward USD
    getUnclaimedUSD: function getUnclaimedUSD() {
      var getRes;
      return regeneratorRuntime.async(function getUnclaimedUSD$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(rewardpoolContract.methods.getUnclaimedUSD(walletAddress).call().then(function _callee(res) {
                return regeneratorRuntime.async(function _callee$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        // console.log(res);
                        getRes = res;

                      case 1:
                      case "end":
                        return _context6.stop();
                    }
                  }
                });
              })["catch"](function () {// console.log(error); 
                // getRes = false;
              }));

            case 2:
              return _context7.abrupt("return", getRes / 10000);

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      });
    },
    // Get unclaimed reward
    getUnclaimed: function getUnclaimed() {
      var getRes;
      return regeneratorRuntime.async(function getUnclaimed$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(rewardpoolContract.methods.getUnclaimedMDC(walletAddress).call().then(function _callee2(res) {
                return regeneratorRuntime.async(function _callee2$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        // console.log(res);
                        getRes = res;

                      case 1:
                      case "end":
                        return _context8.stop();
                    }
                  }
                });
              })["catch"](function () {// console.log(error); 
                // getRes = false;
              }));

            case 2:
              return _context9.abrupt("return", web3.utils.fromWei(getRes, 'ether'));

            case 3:
            case "end":
              return _context9.stop();
          }
        }
      });
    },
    claimReward: function claimReward(walletAddress) {
      var rewardRes;
      return regeneratorRuntime.async(function claimReward$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return regeneratorRuntime.awrap(crewContract.methods.claimReward().send({
                from: walletAddress
              }).then(function _callee3() {
                return regeneratorRuntime.async(function _callee3$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        rewardRes = true;

                      case 1:
                      case "end":
                        return _context10.stop();
                    }
                  }
                });
              })["catch"](function () {
                // getRes = false;
                rewardRes = false;
              }));

            case 2:
              return _context11.abrupt("return", rewardRes);

            case 3:
            case "end":
              return _context11.stop();
          }
        }
      });
    }
  };
};

var _default = Wallet;
exports["default"] = _default;