"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _web = _interopRequireDefault(require("web3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var web3 = new _web["default"](window.ethereum); // const dancerAbi = require('./abi/dancer_abi.json');
// const coachAbi = require('./abi/coach_abi.json');

var crewAbi = require('./abi/crew_abi.json');

var battleAbi = require('./abi/battle_abi.json'); // let tokenAddress = process.env.VUE_APP_TOKEN_ADDRESS;
// let dancerAddress = process.env.VUE_APP_DANCER_ADDRESS;
// let coachAddress = process.env.VUE_APP_COACH_ADDRESS;


var crewAddress = process.env.VUE_APP_CREW_ADDRESS;
var battleAddress = process.env.VUE_APP_BATTLE_ADDRESS; // let dancerContract = new web3.eth.Contract(dancerAbi, dancerAddress);
// let coachContract = new web3.eth.Contract(coachAbi, coachAddress);

var crewContract = new web3.eth.Contract(crewAbi, crewAddress);
var battleContract = new web3.eth.Contract(battleAbi, battleAddress); // let battleStart;

var Battle = function Battle() {
  return {
    // display Dancers
    battleInfo: function battleInfo(id) {
      var info, enemy;
      return regeneratorRuntime.async(function battleInfo$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(battleContract.methods.getBatlleInfo(id).call());

            case 2:
              info = _context.sent;
              enemy = {
                name: info['0'],
                percent: info['1'],
                dancing_power: info['2'],
                reward: info['3']
              };
              return _context.abrupt("return", enemy);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    // Battle
    battleRandom: function battleRandom(walletAddress) {
      var getRandom;
      return regeneratorRuntime.async(function battleRandom$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              getRandom = null;
              _context3.next = 3;
              return regeneratorRuntime.awrap(crewContract.methods.requestRandomWords().send({
                from: walletAddress
              }).then(function _callee() {
                return regeneratorRuntime.async(function _callee$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        getRandom = true;

                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }
                });
              })["catch"](function () {
                getRandom = false;
              }));

            case 3:
              return _context3.abrupt("return", getRandom);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    // Battle BEGIN 
    battleStart: function battleStart(walletAddress, crewID, battleID) {
      var battleResult;
      return regeneratorRuntime.async(function battleStart$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(crewContract.methods.dance(crewID, battleID, 0).send({
                from: walletAddress
              }).then(function _callee2(res) {
                return regeneratorRuntime.async(function _callee2$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        // console.log(res);
                        battleResult = {
                          address: res.events.Danced.returnValues['0'],
                          name: res.events.Danced.returnValues['1'],
                          crewId: res.events.Danced.returnValues['2'],
                          battleId: res.events.Danced.returnValues['3'],
                          roll: res.events.Danced.returnValues['4'],
                          percent: res.events.Danced.returnValues['5'],
                          success: res.events.Danced.returnValues['6'],
                          reward: res.events.Danced.returnValues['7'],
                          ok: true
                        }; // console.log(battleResult);

                      case 1:
                      case "end":
                        return _context4.stop();
                    }
                  }
                });
              })["catch"](function () {
                // console.log(res);
                battleResult = false;
              }));

            case 2:
              return _context5.abrupt("return", battleResult);

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
    // Mass Battle
    massBattle: function massBattle(walletAddress) {
      var battleInfo;
      return regeneratorRuntime.async(function massBattle$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(crewContract.methods.requestRandomWords().send({
                from: walletAddress
              }).then(function _callee4() {
                return regeneratorRuntime.async(function _callee4$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return regeneratorRuntime.awrap(crewContract.methods.massDance().send({
                          from: walletAddress
                        }).then(function _callee3(res) {
                          return regeneratorRuntime.async(function _callee3$(_context6) {
                            while (1) {
                              switch (_context6.prev = _context6.next) {
                                case 0:
                                  console.log(res);
                                  battleInfo = {
                                    success: true,
                                    list: res
                                  };

                                case 2:
                                case "end":
                                  return _context6.stop();
                              }
                            }
                          });
                        })["catch"](function (res) {
                          console.log(res);
                          battleInfo = {
                            success: false,
                            list: []
                          };
                        }));

                      case 2:
                      case "end":
                        return _context7.stop();
                    }
                  }
                });
              })["catch"](function () {
                // console.log(res);
                battleInfo = {
                  success: false,
                  list: []
                };
              }));

            case 2:
              return _context8.abrupt("return", battleInfo);

            case 3:
            case "end":
              return _context8.stop();
          }
        }
      });
    },
    // Battle history
    battleHistory: function battleHistory() {
      var history;
      return regeneratorRuntime.async(function battleHistory$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(crewContract.methods.getAllBattleCrewInfo().call());

            case 2:
              history = _context9.sent;
              return _context9.abrupt("return", history);

            case 4:
            case "end":
              return _context9.stop();
          }
        }
      });
    },
    getAllBattle: function getAllBattle() {
      var getAllBattle;
      return regeneratorRuntime.async(function getAllBattle$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(battleContract.methods.getAllBattle().call());

            case 2:
              getAllBattle = _context10.sent;
              return _context10.abrupt("return", getAllBattle);

            case 4:
            case "end":
              return _context10.stop();
          }
        }
      });
    },
    // Get History
    getHistory: function getHistory(acc) {
      var history;
      return regeneratorRuntime.async(function getHistory$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              history = [];
              _context11.next = 3;
              return regeneratorRuntime.awrap(crewContract.methods.getHistory().call({
                from: acc,
                gas: 500000000
              }).then(function (res) {
                // console.log(res);
                for (var i = 0; i < res['0'].length; i++) {
                  if (res['0'][i] == acc) {
                    var item = {
                      address: res['0'][i],
                      name: res['1'][i],
                      crewId: res['2'][i],
                      battleTime: res['3'][i],
                      battleID: res['4'][i],
                      percentage: res['5'][i],
                      result: res['6'][i],
                      reward: res['7'][i]
                    };
                    history.push(item);
                  }
                }
              }));

            case 3:
              return _context11.abrupt("return", history);

            case 4:
            case "end":
              return _context11.stop();
          }
        }
      });
    }
  };
};

var _default = Battle;
exports["default"] = _default;