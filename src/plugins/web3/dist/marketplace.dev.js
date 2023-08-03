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

var tokenMDC = require('./abi/token_mdc.json');

var marketplaceAbi = require('./abi/marketplace_abi.json'); // let tokenAddress = process.env.VUE_APP_TOKEN_ADDRESS;


var dancerAddress = process.env.VUE_APP_DANCER_ADDRESS;
var coachAddress = process.env.VUE_APP_COACH_ADDRESS;
var crewAddress = process.env.VUE_APP_CREW_ADDRESS;
var marketplaceAddress = process.env.VUE_APP_MARKETPLACE_ADDRESS;
var tokenAddress = process.env.VUE_APP_TOKEN_ADDRESS;
var dancerContract = new web3.eth.Contract(dancerAbi, dancerAddress);
var coachContract = new web3.eth.Contract(coachAbi, coachAddress);
var crewContract = new web3.eth.Contract(crewAbi, crewAddress);
var tokenContract = new web3.eth.Contract(tokenMDC, tokenAddress);
var marketplaceContract = new web3.eth.Contract(marketplaceAbi, marketplaceAddress);

var MarketPlace = function MarketPlace() {
  return {
    // display Dancers
    marketplaceDancers: function marketplaceDancers() {
      var dancerData;
      return regeneratorRuntime.async(function marketplaceDancers$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(dancerContract.methods.getAllDancers(marketplaceAddress).call());

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
    marketplaceCoach: function marketplaceCoach() {
      var coachData;
      return regeneratorRuntime.async(function marketplaceCoach$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(coachContract.methods.getAllCoachs(marketplaceAddress).call());

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
    marketplaceCrew: function marketplaceCrew() {
      var tokenID, crewData, tokenList, i, crew;
      return regeneratorRuntime.async(function marketplaceCrew$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(crewContract.methods.getTokenIds(marketplaceAddress).call());

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
              // console.log(tokenList);
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
                own: [],
                price: []
              };
              crew.tokenID = tokenID[i];
              crew.name = tokenList[0];
              crew.coachesId = tokenList[1];
              crew.dancersId = tokenList[2];
              crew.supply = tokenList[3];
              crew.dp = tokenList[4];
              _context3.next = 19;
              return regeneratorRuntime.awrap(this.getMarketItemAddress(3, tokenID[i]));

            case 19:
              crew.own = _context3.sent;
              _context3.next = 22;
              return regeneratorRuntime.awrap(this.getMarketItemPrice(3, tokenID[i]));

            case 22:
              crew.price = _context3.sent;
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
    // View market item per seller
    // (1= coach, 2=dancer, else= crew)
    getMarketItemPrice: function getMarketItemPrice(itemType, tokenID) {
      var item;
      return regeneratorRuntime.async(function getMarketItemPrice$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(marketplaceContract.methods.getMarketItem(itemType, tokenID).call());

            case 2:
              item = _context4.sent;
              return _context4.abrupt("return", item[0]);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    getMarketItemAddress: function getMarketItemAddress(itemType, tokenID) {
      var item;
      return regeneratorRuntime.async(function getMarketItemAddress$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(marketplaceContract.methods.getMarketItem(itemType, tokenID).call());

            case 2:
              item = _context5.sent;
              return _context5.abrupt("return", item[1]);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
    // Get Dancers
    getDancers: function getDancers(tokenID) {
      var dancerData;
      return regeneratorRuntime.async(function getDancers$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(dancerContract.methods.getDancer(tokenID).call());

            case 2:
              dancerData = _context6.sent;
              return _context6.abrupt("return", dancerData);

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      });
    },
    // Get Coaches
    getCoaches: function getCoaches(tokenID) {
      var coachData;
      return regeneratorRuntime.async(function getCoaches$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(coachContract.methods.getCoach(tokenID).call());

            case 2:
              coachData = _context7.sent;
              return _context7.abrupt("return", coachData);

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      });
    },
    // Sell Item To The Marketplace
    sellItem: function sellItem(walletAddress, itemType, tokenID, price) {
      var sellItemResult, priceWei;
      return regeneratorRuntime.async(function sellItem$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              priceWei = web3.utils.toWei(price, 'ether'); // await tokenContract.methods.allowance( walletAddress, marketplaceAddress).call().then(async function(res){
              //   // console.log(parseInt(res));
              //   if ( parseInt(res) < web3.utils.toWei('1000', 'ether')) {
              //     await tokenContract.methods.approve( marketplaceAddress, web3.utils.toWei('10000', 'ether')).send({from: walletAddress}).then(async function(){

              if (!(itemType === 'coach')) {
                _context11.next = 6;
                break;
              }

              _context11.next = 4;
              return regeneratorRuntime.awrap(coachContract.methods.approve(marketplaceAddress, tokenID).send({
                from: walletAddress
              }).then(function _callee() {
                return regeneratorRuntime.async(function _callee$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return regeneratorRuntime.awrap(marketplaceContract.methods.sellToken(1, tokenID, priceWei).send({
                          from: walletAddress
                        }).then(function (res) {
                          console.log(res);
                          sellItemResult = true;
                        })["catch"](function () {
                          sellItemResult = false;
                        }));

                      case 2:
                      case "end":
                        return _context8.stop();
                    }
                  }
                });
              })["catch"](function () {
                sellItemResult = false;
              }));

            case 4:
              _context11.next = 14;
              break;

            case 6:
              if (!(itemType === 'dancer')) {
                _context11.next = 11;
                break;
              }

              _context11.next = 9;
              return regeneratorRuntime.awrap(dancerContract.methods.approve(marketplaceAddress, tokenID).send({
                from: walletAddress
              }).then(function _callee2() {
                return regeneratorRuntime.async(function _callee2$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        _context9.next = 2;
                        return regeneratorRuntime.awrap(marketplaceContract.methods.sellToken(2, tokenID, priceWei).send({
                          from: walletAddress
                        }).then(function () {
                          sellItemResult = true;
                        })["catch"](function () {
                          sellItemResult = false;
                        }));

                      case 2:
                      case "end":
                        return _context9.stop();
                    }
                  }
                });
              })["catch"](function () {
                sellItemResult = false;
              }));

            case 9:
              _context11.next = 14;
              break;

            case 11:
              if (!(itemType === 'crew')) {
                _context11.next = 14;
                break;
              }

              _context11.next = 14;
              return regeneratorRuntime.awrap(crewContract.methods.approve(marketplaceAddress, tokenID).send({
                from: walletAddress
              }).then(function _callee3() {
                return regeneratorRuntime.async(function _callee3$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        _context10.next = 2;
                        return regeneratorRuntime.awrap(marketplaceContract.methods.sellToken(3, tokenID, priceWei).send({
                          from: walletAddress
                        }).then(function () {
                          // console.log(res);
                          sellItemResult = true;
                        })["catch"](function () {
                          // console.log(res);
                          sellItemResult = false;
                        }));

                      case 2:
                      case "end":
                        return _context10.stop();
                    }
                  }
                });
              })["catch"](function () {
                sellItemResult = false;
              }));

            case 14:
              return _context11.abrupt("return", sellItemResult);

            case 15:
            case "end":
              return _context11.stop();
          }
        }
      });
    },
    buyToken: function buyToken(walletAddress, itemType, tokenID, price) {
      var buyItemResult, priceWei;
      return regeneratorRuntime.async(function buyToken$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              priceWei = price; // const priceWei = web3.utils.toWei(price, 'ether');

              _context14.next = 3;
              return regeneratorRuntime.awrap(tokenContract.methods.allowance(walletAddress, marketplaceAddress).call().then(function _callee5(res) {
                return regeneratorRuntime.async(function _callee5$(_context13) {
                  while (1) {
                    switch (_context13.prev = _context13.next) {
                      case 0:
                        if (!(parseInt(res) < web3.utils.toWei('10000', 'ether'))) {
                          _context13.next = 5;
                          break;
                        }

                        _context13.next = 3;
                        return regeneratorRuntime.awrap(tokenContract.methods.approve(marketplaceAddress, web3.utils.toWei('10000', 'ether')).send({
                          from: walletAddress
                        }).then(function _callee4() {
                          return regeneratorRuntime.async(function _callee4$(_context12) {
                            while (1) {
                              switch (_context12.prev = _context12.next) {
                                case 0:
                                  if (!(itemType === 'coach')) {
                                    _context12.next = 5;
                                    break;
                                  }

                                  _context12.next = 3;
                                  return regeneratorRuntime.awrap(marketplaceContract.methods.buyToken(1, tokenID, priceWei).send({
                                    from: walletAddress
                                  }).then(function () {
                                    buyItemResult = true;
                                  })["catch"](function () {
                                    buyItemResult = false;
                                  }));

                                case 3:
                                  _context12.next = 13;
                                  break;

                                case 5:
                                  if (!(itemType === 'dancer')) {
                                    _context12.next = 10;
                                    break;
                                  }

                                  _context12.next = 8;
                                  return regeneratorRuntime.awrap(marketplaceContract.methods.buyToken(2, tokenID, priceWei).send({
                                    from: walletAddress
                                  }).then(function () {
                                    buyItemResult = true;
                                  })["catch"](function () {
                                    buyItemResult = false;
                                  }));

                                case 8:
                                  _context12.next = 13;
                                  break;

                                case 10:
                                  if (!(itemType === 'crew')) {
                                    _context12.next = 13;
                                    break;
                                  }

                                  _context12.next = 13;
                                  return regeneratorRuntime.awrap(marketplaceContract.methods.buyToken(3, tokenID, priceWei).send({
                                    from: walletAddress
                                  }).then(function () {
                                    buyItemResult = true;
                                  })["catch"](function (res) {
                                    console.log(res);
                                    buyItemResult = false;
                                  }));

                                case 13:
                                case "end":
                                  return _context12.stop();
                              }
                            }
                          });
                        })["catch"](function (error) {
                          console.log(error);
                        }));

                      case 3:
                        _context13.next = 19;
                        break;

                      case 5:
                        if (!(res >= web3.utils.toWei('1000', 'ether'))) {
                          _context13.next = 19;
                          break;
                        }

                        if (!(itemType === 'coach')) {
                          _context13.next = 11;
                          break;
                        }

                        _context13.next = 9;
                        return regeneratorRuntime.awrap(marketplaceContract.methods.buyToken(1, tokenID, priceWei).send({
                          from: walletAddress
                        }).then(function () {
                          buyItemResult = true;
                        })["catch"](function () {
                          buyItemResult = false;
                        }));

                      case 9:
                        _context13.next = 19;
                        break;

                      case 11:
                        if (!(itemType === 'dancer')) {
                          _context13.next = 16;
                          break;
                        }

                        _context13.next = 14;
                        return regeneratorRuntime.awrap(marketplaceContract.methods.buyToken(2, tokenID, priceWei).send({
                          from: walletAddress
                        }).then(function () {
                          buyItemResult = true;
                        })["catch"](function () {
                          buyItemResult = false;
                        }));

                      case 14:
                        _context13.next = 19;
                        break;

                      case 16:
                        if (!(itemType === 'crew')) {
                          _context13.next = 19;
                          break;
                        }

                        _context13.next = 19;
                        return regeneratorRuntime.awrap(marketplaceContract.methods.buyToken(3, tokenID, priceWei).send({
                          from: walletAddress
                        }).then(function (res) {
                          console.log(res);
                          buyItemResult = true;
                        })["catch"](function (error) {
                          console.log(error);
                          buyItemResult = false;
                        }));

                      case 19:
                      case "end":
                        return _context13.stop();
                    }
                  }
                });
              }));

            case 3:
              return _context14.abrupt("return", buyItemResult);

            case 4:
            case "end":
              return _context14.stop();
          }
        }
      });
    },
    // (1= coach, 2=dancer, else= crew)
    updatePrice: function updatePrice(walletAddress, itemType, tokenID, price) {
      var resUpdate, priceWei;
      return regeneratorRuntime.async(function updatePrice$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              priceWei = web3.utils.toWei(price, 'ether');
              _context15.next = 3;
              return regeneratorRuntime.awrap(marketplaceContract.methods.updatePrice(itemType, tokenID, priceWei).send({
                from: walletAddress
              }).then(function () {
                resUpdate = true;
              })["catch"](function () {
                // console.log(error);
                resUpdate = false;
              }));

            case 3:
              return _context15.abrupt("return", resUpdate);

            case 4:
            case "end":
              return _context15.stop();
          }
        }
      });
    },
    // Cancel item selling in the marketplace
    // (1= coach, 2=dancer, else= crew)
    cancelSelling: function cancelSelling(walletAddress, itemType, tokenID) {
      var resCancel;
      return regeneratorRuntime.async(function cancelSelling$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return regeneratorRuntime.awrap(marketplaceContract.methods.cancelSelling(itemType, tokenID).send({
                from: walletAddress
              }).then(function () {
                // console.log(res);
                resCancel = true;
              })["catch"](function () {
                // console.log(error);
                resCancel = false;
              }));

            case 2:
              return _context16.abrupt("return", resCancel);

            case 3:
            case "end":
              return _context16.stop();
          }
        }
      });
    }
  };
};

var _default = MarketPlace;
exports["default"] = _default;