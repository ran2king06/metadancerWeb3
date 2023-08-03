"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _web = _interopRequireDefault(require("web3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var web3 = new _web["default"](window.ethereum);

var dancerAbi = require('./abi/dancer_abi.json');

var coachAbi = require('./abi/coach_abi.json');

var crewAbi = require('./abi/crew_abi.json');

var rewardpoolAbi = require('./abi/rewardpool_abi.json');

var freehandleAbi = require('./abi/freehandler_abi.json');

var tokenMDC = require('./abi/token_mdc.json');

var tokenAddress = process.env.VUE_APP_TOKEN_ADDRESS;
var dancerAddress = process.env.VUE_APP_DANCER_ADDRESS;
var coachAddress = process.env.VUE_APP_COACH_ADDRESS;
var crewAddress = process.env.VUE_APP_CREW_ADDRESS;
var rewardpoolAddress = process.env.VUE_APP_REWARD_POOL_ADDRESS;
var freehandleAddress = process.env.VUE_APP_FEE_HANDLER; // let noReferralAddress = process.env.VUE_APP_REFERRAL_ADDRESS;

var dancerContract = new web3.eth.Contract(dancerAbi, dancerAddress);
var coachContract = new web3.eth.Contract(coachAbi, coachAddress);
var crewContract = new web3.eth.Contract(crewAbi, crewAddress);
var rewardpoolContract = new web3.eth.Contract(rewardpoolAbi, rewardpoolAddress);
var feehandleContract = new web3.eth.Contract(freehandleAbi, freehandleAddress);
var tokenContract = new web3.eth.Contract(tokenMDC, tokenAddress);

var Display = function Display() {
  return {
    // display Dancers
    displayDancer: function displayDancer(walletAddress) {
      var dancerData;
      return regeneratorRuntime.async(function displayDancer$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(dancerContract.methods.getAllDancers(walletAddress).call());

            case 2:
              dancerData = _context.sent;
              return _context.abrupt("return", dancerData);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    // display Coach
    displayCoach: function displayCoach(walletAddress) {
      var coachData;
      return regeneratorRuntime.async(function displayCoach$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(coachContract.methods.getAllCoachs(walletAddress).call());

            case 2:
              coachData = _context2.sent;
              return _context2.abrupt("return", coachData);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    // display Crew
    displayCrew: function displayCrew(walletAddress) {
      var tokenID, crewData, tokenList, i, crew;
      return regeneratorRuntime.async(function displayCrew$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(crewContract.methods.getTokenIds(walletAddress).call());

            case 2:
              tokenID = _context3.sent;
              crewData = [];
              tokenList = [];
              i = 0;

            case 6:
              if (!(i < tokenID.length)) {
                _context3.next = 28;
                break;
              }

              _context3.next = 9;
              return regeneratorRuntime.awrap(crewContract.methods.getCrew(tokenID[i]).call());

            case 9:
              tokenList = _context3.sent;
              crew = {
                name: '',
                tokenID: 0,
                supply: 0,
                dp: 0,
                member: null,
                checkCrew: 'dancer',
                check: false,
                dancersId: null,
                coachesId: null,
                dancers: [],
                coaches: [],
                lastBattleTime: [],
                canBattle: 0,
                dancersCount: 0,
                coachesCount: 0
              }; // console.log(crew);

              crew.tokenID = tokenID[i];
              crew.name = tokenList[0];
              crew.coachesId = tokenList[1];
              crew.dancersId = tokenList[2];
              crew.supply = tokenList[3];
              crew.dp = tokenList[4];
              crew.lastBattleTime = tokenList[5];
              crew.coachesCount = tokenList[1].length;
              crew.dancersCount = tokenList[2].length;
              _context3.next = 22;
              return regeneratorRuntime.awrap(this.canBattleDance(tokenID[i]));

            case 22:
              crew.canBattle = _context3.sent;
              crew.member = 'D/' + tokenList[2].length + ',' + 'C/' + tokenList[1].length;
              crewData.push(crew);

            case 25:
              i++;
              _context3.next = 6;
              break;

            case 28:
              return _context3.abrupt("return", crewData);

            case 29:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    },
    // Get Crew Info 
    getCrew: function getCrew(crewId) {
      var crewInfo;
      return regeneratorRuntime.async(function getCrew$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(crewContract.methods.getCrew(crewId).call());

            case 2:
              crewInfo = _context4.sent;
              return _context4.abrupt("return", crewInfo);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    // Get Dancers
    getDancers: function getDancers(tokenID) {
      var dancerData;
      return regeneratorRuntime.async(function getDancers$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(dancerContract.methods.getDancer(tokenID).call());

            case 2:
              dancerData = _context5.sent;
              return _context5.abrupt("return", dancerData);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
    // Get Dancers
    getCoaches: function getCoaches(tokenID) {
      var coachData;
      return regeneratorRuntime.async(function getCoaches$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(coachContract.methods.getCoach(tokenID).call());

            case 2:
              coachData = _context6.sent;
              return _context6.abrupt("return", coachData);

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      });
    },
    balanceOfDancer: function balanceOfDancer(acc) {
      var res;
      return regeneratorRuntime.async(function balanceOfDancer$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(dancerContract.methods.balanceOf(acc).call());

            case 2:
              res = _context7.sent;
              return _context7.abrupt("return", res);

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      });
    },
    balanceOfCoach: function balanceOfCoach(acc) {
      var res;
      return regeneratorRuntime.async(function balanceOfCoach$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(coachContract.methods.balanceOf(acc).call());

            case 2:
              res = _context8.sent;
              return _context8.abrupt("return", res);

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      });
    },
    balanceOfCrew: function balanceOfCrew(acc) {
      var res;
      return regeneratorRuntime.async(function balanceOfCrew$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(crewContract.methods.balanceOf(acc).call());

            case 2:
              res = _context9.sent;
              return _context9.abrupt("return", res);

            case 4:
            case "end":
              return _context9.stop();
          }
        }
      });
    },
    // async getNextBattleTime(acc) {
    //   const res = await crewContract.methods.getNextBattleTime(acc).call();
    //   return res;
    // },
    canBattleDance: function canBattleDance(tokenID) {
      var canBattle;
      return regeneratorRuntime.async(function canBattleDance$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(crewContract.methods.canBattleDance(tokenID).call());

            case 2:
              canBattle = _context10.sent;
              return _context10.abrupt("return", canBattle);

            case 4:
            case "end":
              return _context10.stop();
          }
        }
      });
    },
    getAvailableCrewsCount: function getAvailableCrewsCount(acc) {
      var res;
      return regeneratorRuntime.async(function getAvailableCrewsCount$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return regeneratorRuntime.awrap(crewContract.methods.getAvailableCrewsCount(acc).call());

            case 2:
              res = _context11.sent;
              return _context11.abrupt("return", res);

            case 4:
            case "end":
              return _context11.stop();
          }
        }
      });
    },
    viewBonusReferrer: function viewBonusReferrer(acc) {
      var res;
      return regeneratorRuntime.async(function viewBonusReferrer$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return regeneratorRuntime.awrap(crewContract.methods.viewBonusReferrer(acc).call());

            case 2:
              res = _context12.sent;

              if (!(res > 0)) {
                _context12.next = 7;
                break;
              }

              return _context12.abrupt("return", parseFloat(res).toFixed(2));

            case 7:
              return _context12.abrupt("return", 0);

            case 8:
            case "end":
              return _context12.stop();
          }
        }
      });
    },
    claimRefferalBonus: function claimRefferalBonus(acc) {
      var claimBonus;
      return regeneratorRuntime.async(function claimRefferalBonus$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return regeneratorRuntime.awrap(crewContract.methods.claimRefferalBonus().send({
                from: acc
              }).then(function _callee() {
                return regeneratorRuntime.async(function _callee$(_context13) {
                  while (1) {
                    switch (_context13.prev = _context13.next) {
                      case 0:
                        claimBonus = true;

                      case 1:
                      case "end":
                        return _context13.stop();
                    }
                  }
                });
              })["catch"](function () {
                claimBonus = false;
              }));

            case 2:
              return _context14.abrupt("return", claimBonus);

            case 3:
            case "end":
              return _context14.stop();
          }
        }
      });
    },
    RewardAfterTax: function RewardAfterTax(acc) {
      var res;
      return regeneratorRuntime.async(function RewardAfterTax$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return regeneratorRuntime.awrap(crewContract.methods.RewardAfterTax().call({
                from: acc
              }));

            case 2:
              res = _context15.sent;
              return _context15.abrupt("return", parseFloat(web3.utils.fromWei(res, 'ether')).toFixed(2));

            case 4:
            case "end":
              return _context15.stop();
          }
        }
      });
    },
    getMaxBattlePower: function getMaxBattlePower(acc) {
      var res;
      return regeneratorRuntime.async(function getMaxBattlePower$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return regeneratorRuntime.awrap(crewContract.methods.getMaxBattlePower(acc).call());

            case 2:
              res = _context16.sent;
              return _context16.abrupt("return", res);

            case 4:
            case "end":
              return _context16.stop();
          }
        }
      });
    },
    getTaxLeftDays: function getTaxLeftDays(acc) {
      var res;
      return regeneratorRuntime.async(function getTaxLeftDays$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return regeneratorRuntime.awrap(crewContract.methods.getTaxLeftDays(acc).call());

            case 2:
              res = _context17.sent;
              return _context17.abrupt("return", res);

            case 4:
            case "end":
              return _context17.stop();
          }
        }
      });
    },
    // USD to MDC
    getMDCAmountFromUSD: function getMDCAmountFromUSD(usd) {
      var res;
      return regeneratorRuntime.async(function getMDCAmountFromUSD$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return regeneratorRuntime.awrap(feehandleContract.methods.getMDCAmountFromUSD(usd).call());

            case 2:
              res = _context18.sent;
              return _context18.abrupt("return", parseFloat(web3.utils.fromWei(res, 'ether')).toFixed(3));

            case 4:
            case "end":
              return _context18.stop();
          }
        }
      });
    },
    // MDC to USD  
    getUSDAmountFromMDC: function getUSDAmountFromMDC(mdc) {
      var res;
      return regeneratorRuntime.async(function getUSDAmountFromMDC$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return regeneratorRuntime.awrap(feehandleContract.methods.getUSDAmountInMDC(mdc).call());

            case 2:
              res = _context19.sent;
              return _context19.abrupt("return", res);

            case 4:
            case "end":
              return _context19.stop();
          }
        }
      });
    },
    // Show Energy Drinks Price
    buyDrink: function buyDrink(walletAddress, tokenID, supply, fromWallet) {
      var buyDrinkRes;
      return regeneratorRuntime.async(function buyDrink$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              _context24.next = 2;
              return regeneratorRuntime.awrap(tokenContract.methods.allowance(walletAddress, crewAddress).call().then(function _callee5(res) {
                return regeneratorRuntime.async(function _callee5$(_context23) {
                  while (1) {
                    switch (_context23.prev = _context23.next) {
                      case 0:
                        if (!(parseInt(res) < web3.utils.toWei('1000', 'ether'))) {
                          _context23.next = 5;
                          break;
                        }

                        _context23.next = 3;
                        return regeneratorRuntime.awrap(tokenContract.methods.approve(crewAddress, web3.utils.toWei('10000', 'ether')).send({
                          from: walletAddress
                        }).then(function _callee3() {
                          return regeneratorRuntime.async(function _callee3$(_context21) {
                            while (1) {
                              switch (_context21.prev = _context21.next) {
                                case 0:
                                  _context21.next = 2;
                                  return regeneratorRuntime.awrap(crewContract.methods.addSupply(tokenID, supply, fromWallet).send({
                                    from: walletAddress
                                  }).then(function _callee2() {
                                    return regeneratorRuntime.async(function _callee2$(_context20) {
                                      while (1) {
                                        switch (_context20.prev = _context20.next) {
                                          case 0:
                                            buyDrinkRes = true;

                                          case 1:
                                          case "end":
                                            return _context20.stop();
                                        }
                                      }
                                    });
                                  })["catch"](function () {
                                    buyDrinkRes = false;
                                  }));

                                case 2:
                                case "end":
                                  return _context21.stop();
                              }
                            }
                          });
                        }));

                      case 3:
                        _context23.next = 8;
                        break;

                      case 5:
                        if (!(parseInt(res) >= web3.utils.toWei('1000', 'ether'))) {
                          _context23.next = 8;
                          break;
                        }

                        _context23.next = 8;
                        return regeneratorRuntime.awrap(crewContract.methods.addSupply(tokenID, supply, fromWallet).send({
                          from: walletAddress
                        }).then(function _callee4() {
                          return regeneratorRuntime.async(function _callee4$(_context22) {
                            while (1) {
                              switch (_context22.prev = _context22.next) {
                                case 0:
                                  buyDrinkRes = true;

                                case 1:
                                case "end":
                                  return _context22.stop();
                              }
                            }
                          });
                        })["catch"](function () {
                          buyDrinkRes = false;
                        }));

                      case 8:
                      case "end":
                        return _context23.stop();
                    }
                  }
                });
              }));

            case 2:
              return _context24.abrupt("return", buyDrinkRes);

            case 3:
            case "end":
              return _context24.stop();
          }
        }
      });
    },
    // Buy Energy Drinks
    getSupplyCost: function getSupplyCost(dancerCount, supply) {
      var drinkPrice;
      return regeneratorRuntime.async(function getSupplyCost$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              _context26.next = 2;
              return regeneratorRuntime.awrap(feehandleContract.methods.getSupplyCost(dancerCount, supply).call().then(function _callee6(res) {
                return regeneratorRuntime.async(function _callee6$(_context25) {
                  while (1) {
                    switch (_context25.prev = _context25.next) {
                      case 0:
                        drinkPrice = res;

                      case 1:
                      case "end":
                        return _context25.stop();
                    }
                  }
                });
              }));

            case 2:
              return _context26.abrupt("return", parseFloat(web3.utils.fromWei(drinkPrice, 'ether')).toFixed(2));

            case 3:
            case "end":
              return _context26.stop();
          }
        }
      });
    },
    // Update Crew
    updateCrew: function updateCrew(walletAddress, crewID, coachID, dancerID) {
      var updateCrewRes;
      return regeneratorRuntime.async(function updateCrew$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              _context28.next = 2;
              return regeneratorRuntime.awrap(crewContract.methods.updateCrew(crewID, dancerID, dancerID).send({
                from: walletAddress
              }).then(function _callee7() {
                return regeneratorRuntime.async(function _callee7$(_context27) {
                  while (1) {
                    switch (_context27.prev = _context27.next) {
                      case 0:
                        updateCrewRes = true;

                      case 1:
                      case "end":
                        return _context27.stop();
                    }
                  }
                });
              })["catch"](function () {
                updateCrewRes = false;
              }));

            case 2:
              return _context28.abrupt("return", updateCrewRes);

            case 3:
            case "end":
              return _context28.stop();
          }
        }
      });
    },
    //  Claim Reward
    claimReward: function claimReward(walletAddress) {
      var claimReward;
      return regeneratorRuntime.async(function claimReward$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              _context30.next = 2;
              return regeneratorRuntime.awrap(crewContract.methods.claimReward().send({
                from: walletAddress
              }).then(function _callee8() {
                return regeneratorRuntime.async(function _callee8$(_context29) {
                  while (1) {
                    switch (_context29.prev = _context29.next) {
                      case 0:
                        claimReward = true;

                      case 1:
                      case "end":
                        return _context29.stop();
                    }
                  }
                });
              })["catch"](function () {
                claimReward = false;
              }));

            case 2:
              return _context30.abrupt("return", claimReward);

            case 3:
            case "end":
              return _context30.stop();
          }
        }
      });
    },
    //  Get unclaimed reward
    getUnclaimedMDC: function getUnclaimedMDC(walletAddress) {
      var unclaimReward;
      return regeneratorRuntime.async(function getUnclaimedMDC$(_context32) {
        while (1) {
          switch (_context32.prev = _context32.next) {
            case 0:
              _context32.next = 2;
              return regeneratorRuntime.awrap(rewardpoolContract.methods.getUnclaimedMDC().send({
                from: walletAddress
              }).then(function _callee9() {
                return regeneratorRuntime.async(function _callee9$(_context31) {
                  while (1) {
                    switch (_context31.prev = _context31.next) {
                      case 0:
                        unclaimReward = true;

                      case 1:
                      case "end":
                        return _context31.stop();
                    }
                  }
                });
              })["catch"](function () {
                unclaimReward = false;
              }));

            case 2:
              return _context32.abrupt("return", unclaimReward);

            case 3:
            case "end":
              return _context32.stop();
          }
        }
      });
    },
    getMinClaimTax: function getMinClaimTax(walletAddress) {
      var tax;
      return regeneratorRuntime.async(function getMinClaimTax$(_context34) {
        while (1) {
          switch (_context34.prev = _context34.next) {
            case 0:
              _context34.next = 2;
              return regeneratorRuntime.awrap(feehandleContract.methods.getMinClaimTax().call({
                from: walletAddress
              }).then(function _callee10(res) {
                return regeneratorRuntime.async(function _callee10$(_context33) {
                  while (1) {
                    switch (_context33.prev = _context33.next) {
                      case 0:
                        // console.log(res);
                        tax = res;

                      case 1:
                      case "end":
                        return _context33.stop();
                    }
                  }
                });
              })["catch"](function () {}));

            case 2:
              return _context34.abrupt("return", tax);

            case 3:
            case "end":
              return _context34.stop();
          }
        }
      });
    },
    // Mass Dismiss
    // bool isCoach = true (if coach), false (if dancer)
    dismiss: function dismiss(walletAddress, tokenID, isCoach) {
      var dismissRes;
      return regeneratorRuntime.async(function dismiss$(_context36) {
        while (1) {
          switch (_context36.prev = _context36.next) {
            case 0:
              _context36.next = 2;
              return regeneratorRuntime.awrap(crewContract.methods.Dismiss(tokenID, isCoach).send({
                from: walletAddress
              }).then(function _callee11(res) {
                return regeneratorRuntime.async(function _callee11$(_context35) {
                  while (1) {
                    switch (_context35.prev = _context35.next) {
                      case 0:
                        console.log(res);
                        dismissRes = parseFloat(web3.utils.fromWei(res.events.Dismissed.returnValues.amount, 'ether')).toFixed(2);

                      case 2:
                      case "end":
                        return _context35.stop();
                    }
                  }
                });
              })["catch"](function (error) {
                console.log(error);
                dismissRes = false;
              }));

            case 2:
              return _context36.abrupt("return", dismissRes);

            case 3:
            case "end":
              return _context36.stop();
          }
        }
      });
    },
    getTrainingCost: function getTrainingCost(walletAddress, amount) {
      var total;
      return regeneratorRuntime.async(function getTrainingCost$(_context38) {
        while (1) {
          switch (_context38.prev = _context38.next) {
            case 0:
              _context38.next = 2;
              return regeneratorRuntime.awrap(feehandleContract.methods.getTrainingCost(amount).call().then(function _callee12(res) {
                return regeneratorRuntime.async(function _callee12$(_context37) {
                  while (1) {
                    switch (_context37.prev = _context37.next) {
                      case 0:
                        total = res;

                      case 1:
                      case "end":
                        return _context37.stop();
                    }
                  }
                });
              }));

            case 2:
              return _context38.abrupt("return", total);

            case 3:
            case "end":
              return _context38.stop();
          }
        }
      });
    },
    getCostForAddingDancer: function getCostForAddingDancer(dancerCount, remainingDrinks) {
      var total;
      return regeneratorRuntime.async(function getCostForAddingDancer$(_context40) {
        while (1) {
          switch (_context40.prev = _context40.next) {
            case 0:
              _context40.next = 2;
              return regeneratorRuntime.awrap(feehandleContract.methods.getCostForAddingDancer(dancerCount, remainingDrinks).call().then(function _callee13(res) {
                return regeneratorRuntime.async(function _callee13$(_context39) {
                  while (1) {
                    switch (_context39.prev = _context39.next) {
                      case 0:
                        total = res;

                      case 1:
                      case "end":
                        return _context39.stop();
                    }
                  }
                });
              }));

            case 2:
              return _context40.abrupt("return", total);

            case 3:
            case "end":
              return _context40.stop();
          }
        }
      });
    },
    dateBonusClaim: function dateBonusClaim(walletAddress) {
      var date;
      return regeneratorRuntime.async(function dateBonusClaim$(_context42) {
        while (1) {
          switch (_context42.prev = _context42.next) {
            case 0:
              _context42.next = 2;
              return regeneratorRuntime.awrap(rewardpoolContract.methods.dateBonusClaim(walletAddress).call().then(function _callee14(res) {
                return regeneratorRuntime.async(function _callee14$(_context41) {
                  while (1) {
                    switch (_context41.prev = _context41.next) {
                      case 0:
                        // console.log(res);
                        date = res;

                      case 1:
                      case "end":
                        return _context41.stop();
                    }
                  }
                });
              }));

            case 2:
              return _context42.abrupt("return", date);

            case 3:
            case "end":
              return _context42.stop();
          }
        }
      });
    }
  };
};

var _default = Display;
exports["default"] = _default;