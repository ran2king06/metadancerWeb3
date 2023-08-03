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

var feeAbi = require('./abi/freehandler_abi.json');

var tokenAddress = process.env.VUE_APP_TOKEN_ADDRESS;
var dancerAddress = process.env.VUE_APP_DANCER_ADDRESS;
var coachAddress = process.env.VUE_APP_COACH_ADDRESS;
var crewAddress = process.env.VUE_APP_CREW_ADDRESS;
var feeHandlerAddress = process.env.VUE_APP_FEE_HANDLER;
var noReferralAddress = process.env.VUE_APP_REFERRAL_ADDRESS;
var dancerTokenContract = new web3.eth.Contract(dancerAbi, tokenAddress);
var dancerContract = new web3.eth.Contract(dancerAbi, dancerAddress);
var coachTokenContract = new web3.eth.Contract(coachAbi, tokenAddress);
var coachContract = new web3.eth.Contract(coachAbi, coachAddress);
var crewTokenContract = new web3.eth.Contract(crewAbi, tokenAddress);
var crewContract = new web3.eth.Contract(crewAbi, crewAddress);
var tokenContract = new web3.eth.Contract(tokenMDC, tokenAddress);
var feehandlerContract = new web3.eth.Contract(feeAbi, feeHandlerAddress);
var mintResultDancer;
var mintResultCoach;
var mintResultCrew;

var Mint = function Mint() {
  return {
    // Mint Dancers
    mintDancer: function mintDancer(walletAddress, quantity, referralAddress) {
      var refAdd;
      return regeneratorRuntime.async(function mintDancer$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (referralAddress !== null && referralAddress !== undefined && referralAddress !== '') {
                refAdd = referralAddress;
              } else {
                refAdd = noReferralAddress;
              } // allowance


              _context5.next = 3;
              return regeneratorRuntime.awrap(tokenContract.methods.allowance(walletAddress, dancerAddress).call().then(function _callee4(res) {
                return regeneratorRuntime.async(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        if (!(parseInt(res) < web3.utils.toWei('1000', 'ether'))) {
                          _context4.next = 5;
                          break;
                        }

                        _context4.next = 3;
                        return regeneratorRuntime.awrap(dancerTokenContract.methods.approve(dancerAddress, web3.utils.toWei('10000', 'ether')).send({
                          from: walletAddress
                        }).then(function _callee2() {
                          return regeneratorRuntime.async(function _callee2$(_context2) {
                            while (1) {
                              switch (_context2.prev = _context2.next) {
                                case 0:
                                  _context2.next = 2;
                                  return regeneratorRuntime.awrap(dancerContract.methods.requestRandomWords().send({
                                    from: walletAddress
                                  }).then(function _callee() {
                                    return regeneratorRuntime.async(function _callee$(_context) {
                                      while (1) {
                                        switch (_context.prev = _context.next) {
                                          case 0:
                                            _context.next = 2;
                                            return regeneratorRuntime.awrap(dancerContract.methods.mint(quantity, refAdd).send({
                                              from: walletAddress
                                            }).then(function (res) {
                                              // Mint Success
                                              console.log(res);
                                              mintResultDancer = true;
                                            })["catch"](function () {
                                              mintResultDancer = false;
                                              return;
                                            }));

                                          case 2:
                                          case "end":
                                            return _context.stop();
                                        }
                                      }
                                    });
                                  })["catch"](function () {
                                    mintResultDancer = false;
                                    return;
                                  }));

                                case 2:
                                case "end":
                                  return _context2.stop();
                              }
                            }
                          });
                        })["catch"](function () {
                          mintResultDancer = false;
                          return;
                        }));

                      case 3:
                        _context4.next = 8;
                        break;

                      case 5:
                        if (!(parseInt(res) >= web3.utils.toWei('1000', 'ether'))) {
                          _context4.next = 8;
                          break;
                        }

                        _context4.next = 8;
                        return regeneratorRuntime.awrap(dancerContract.methods.requestRandomWords().send({
                          from: walletAddress
                        }).then(function _callee3() {
                          return regeneratorRuntime.async(function _callee3$(_context3) {
                            while (1) {
                              switch (_context3.prev = _context3.next) {
                                case 0:
                                  _context3.next = 2;
                                  return regeneratorRuntime.awrap(dancerContract.methods.mint(quantity, refAdd).send({
                                    from: walletAddress
                                  }).then(function () {
                                    // Mint Success
                                    // console.log(res);
                                    mintResultDancer = true;
                                  })["catch"](function () {
                                    mintResultDancer = false;
                                    return;
                                  }));

                                case 2:
                                case "end":
                                  return _context3.stop();
                              }
                            }
                          });
                        })["catch"](function () {
                          mintResultDancer = false;
                          return;
                        }));

                      case 8:
                      case "end":
                        return _context4.stop();
                    }
                  }
                });
              })["catch"](function (error) {
                console.log(error);
                return;
              }));

            case 3:
              return _context5.abrupt("return", mintResultDancer);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
    // Mint Coach
    mintCoach: function mintCoach(walletAddress, quantity, referralAddress) {
      var refAdd;
      return regeneratorRuntime.async(function mintCoach$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (referralAddress !== null && referralAddress !== undefined && referralAddress !== '') {
                refAdd = referralAddress;
              } else {
                refAdd = noReferralAddress;
              } // allowance


              _context10.next = 3;
              return regeneratorRuntime.awrap(tokenContract.methods.allowance(walletAddress, coachAddress).call().then(function _callee8(res) {
                return regeneratorRuntime.async(function _callee8$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        if (!(parseInt(res) < web3.utils.toWei('1000', 'ether'))) {
                          _context9.next = 5;
                          break;
                        }

                        _context9.next = 3;
                        return regeneratorRuntime.awrap(coachTokenContract.methods.approve(coachAddress, web3.utils.toWei('10000', 'ether')).send({
                          from: walletAddress
                        }).then(function _callee6() {
                          return regeneratorRuntime.async(function _callee6$(_context7) {
                            while (1) {
                              switch (_context7.prev = _context7.next) {
                                case 0:
                                  _context7.next = 2;
                                  return regeneratorRuntime.awrap(coachContract.methods.requestRandomWords().send({
                                    from: walletAddress
                                  }).then(function _callee5() {
                                    return regeneratorRuntime.async(function _callee5$(_context6) {
                                      while (1) {
                                        switch (_context6.prev = _context6.next) {
                                          case 0:
                                            _context6.next = 2;
                                            return regeneratorRuntime.awrap(coachContract.methods.mint(quantity, refAdd).send({
                                              from: walletAddress
                                            }).then(function () {
                                              // Mint Success
                                              mintResultCoach = true;
                                            })["catch"](function () {
                                              mintResultCoach = false;
                                              return;
                                            }));

                                          case 2:
                                          case "end":
                                            return _context6.stop();
                                        }
                                      }
                                    });
                                  })["catch"](function () {
                                    mintResultCoach = false;
                                    return;
                                  }));

                                case 2:
                                case "end":
                                  return _context7.stop();
                              }
                            }
                          });
                        })["catch"](function () {
                          mintResultCoach = false;
                          return;
                        }));

                      case 3:
                        _context9.next = 8;
                        break;

                      case 5:
                        if (!(parseInt(res) >= web3.utils.toWei('1000', 'ether'))) {
                          _context9.next = 8;
                          break;
                        }

                        _context9.next = 8;
                        return regeneratorRuntime.awrap(coachContract.methods.requestRandomWords().send({
                          from: walletAddress
                        }).then(function _callee7() {
                          return regeneratorRuntime.async(function _callee7$(_context8) {
                            while (1) {
                              switch (_context8.prev = _context8.next) {
                                case 0:
                                  _context8.next = 2;
                                  return regeneratorRuntime.awrap(coachContract.methods.mint(quantity, refAdd).send({
                                    from: walletAddress
                                  }).then(function () {
                                    // Mint Success
                                    mintResultCoach = true;
                                  })["catch"](function () {
                                    mintResultCoach = false;
                                    return;
                                  }));

                                case 2:
                                case "end":
                                  return _context8.stop();
                              }
                            }
                          });
                        })["catch"](function () {
                          mintResultCoach = false;
                          return;
                        }));

                      case 8:
                      case "end":
                        return _context9.stop();
                    }
                  }
                });
              })["catch"](function (error) {
                console.log(error);
                return;
              }));

            case 3:
              return _context10.abrupt("return", mintResultCoach);

            case 4:
            case "end":
              return _context10.stop();
          }
        }
      });
    },
    // Mint Crew
    // eslint-disable-next-line no-unused-vars
    mintCrew: function mintCrew(walletAddress, name, coachIds, dancerIds) {
      return regeneratorRuntime.async(function mintCrew$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _context21.next = 2;
              return regeneratorRuntime.awrap(tokenContract.methods.allowance(walletAddress, crewAddress).call().then(function _callee18(res) {
                return regeneratorRuntime.async(function _callee18$(_context20) {
                  while (1) {
                    switch (_context20.prev = _context20.next) {
                      case 0:
                        if (!(parseInt(res) < web3.utils.toWei('1000', 'ether'))) {
                          _context20.next = 5;
                          break;
                        }

                        _context20.next = 3;
                        return regeneratorRuntime.awrap(crewTokenContract.methods.approve(crewAddress, web3.utils.toWei('10000', 'ether')).send({
                          from: walletAddress
                        }).then(function _callee11() {
                          return regeneratorRuntime.async(function _callee11$(_context13) {
                            while (1) {
                              switch (_context13.prev = _context13.next) {
                                case 0:
                                  _context13.next = 2;
                                  return regeneratorRuntime.awrap(coachContract.methods.setApprovalForAll(crewAddress, true).send({
                                    from: walletAddress
                                  }).then(function _callee10() {
                                    return regeneratorRuntime.async(function _callee10$(_context12) {
                                      while (1) {
                                        switch (_context12.prev = _context12.next) {
                                          case 0:
                                            _context12.next = 2;
                                            return regeneratorRuntime.awrap(dancerContract.methods.setApprovalForAll(crewAddress, true).send({
                                              from: walletAddress
                                            }).then(function _callee9() {
                                              return regeneratorRuntime.async(function _callee9$(_context11) {
                                                while (1) {
                                                  switch (_context11.prev = _context11.next) {
                                                    case 0:
                                                      _context11.next = 2;
                                                      return regeneratorRuntime.awrap(crewContract.methods.mint(name, coachIds, dancerIds).send({
                                                        from: walletAddress
                                                      }).then(function () {
                                                        mintResultCrew = true;
                                                      })["catch"](function () {
                                                        mintResultCrew = false;
                                                        return;
                                                      }));

                                                    case 2:
                                                    case "end":
                                                      return _context11.stop();
                                                  }
                                                }
                                              });
                                            })["catch"](function () {
                                              mintResultCrew = false;
                                              return;
                                            }));

                                          case 2:
                                          case "end":
                                            return _context12.stop();
                                        }
                                      }
                                    });
                                  })["catch"](function () {
                                    mintResultCrew = false;
                                    return;
                                  }));

                                case 2:
                                case "end":
                                  return _context13.stop();
                              }
                            }
                          });
                        })["catch"](function () {
                          mintResultCrew = false;
                          return;
                        }));

                      case 3:
                        _context20.next = 8;
                        break;

                      case 5:
                        if (!(parseInt(res) >= web3.utils.toWei('1000', 'ether'))) {
                          _context20.next = 8;
                          break;
                        }

                        _context20.next = 8;
                        return regeneratorRuntime.awrap(coachContract.methods.isApprovedForAll(walletAddress, crewAddress).call().then(function _callee17(approveAllRes) {
                          return regeneratorRuntime.async(function _callee17$(_context19) {
                            while (1) {
                              switch (_context19.prev = _context19.next) {
                                case 0:
                                  if (!(approveAllRes === false)) {
                                    _context19.next = 5;
                                    break;
                                  }

                                  _context19.next = 3;
                                  return regeneratorRuntime.awrap(coachContract.methods.setApprovalForAll(crewAddress, true).send({
                                    from: walletAddress
                                  }).then(function _callee14() {
                                    return regeneratorRuntime.async(function _callee14$(_context16) {
                                      while (1) {
                                        switch (_context16.prev = _context16.next) {
                                          case 0:
                                            _context16.next = 2;
                                            return regeneratorRuntime.awrap(dancerContract.methods.isApprovedForAll(walletAddress, crewAddress).send({
                                              from: walletAddress
                                            }).then(function _callee13(resDan) {
                                              return regeneratorRuntime.async(function _callee13$(_context15) {
                                                while (1) {
                                                  switch (_context15.prev = _context15.next) {
                                                    case 0:
                                                      if (!(resDan === false)) {
                                                        _context15.next = 5;
                                                        break;
                                                      }

                                                      _context15.next = 3;
                                                      return regeneratorRuntime.awrap(dancerContract.methods.setApprovalForAll(crewAddress, true).send({
                                                        from: walletAddress
                                                      }).then(function _callee12() {
                                                        return regeneratorRuntime.async(function _callee12$(_context14) {
                                                          while (1) {
                                                            switch (_context14.prev = _context14.next) {
                                                              case 0:
                                                                _context14.next = 2;
                                                                return regeneratorRuntime.awrap(crewContract.methods.mint(name, coachIds, dancerIds).send({
                                                                  from: walletAddress
                                                                }).then(function () {
                                                                  mintResultCrew = true;
                                                                })["catch"](function () {
                                                                  mintResultCrew = false;
                                                                  return;
                                                                }));

                                                              case 2:
                                                              case "end":
                                                                return _context14.stop();
                                                            }
                                                          }
                                                        });
                                                      })["catch"](function () {
                                                        mintResultCrew = false;
                                                        return;
                                                      }));

                                                    case 3:
                                                      _context15.next = 7;
                                                      break;

                                                    case 5:
                                                      _context15.next = 7;
                                                      return regeneratorRuntime.awrap(crewContract.methods.mint(name, coachIds, dancerIds).send({
                                                        from: walletAddress
                                                      }).then(function () {
                                                        mintResultCrew = true;
                                                      })["catch"](function () {
                                                        mintResultCrew = false;
                                                        return;
                                                      }));

                                                    case 7:
                                                    case "end":
                                                      return _context15.stop();
                                                  }
                                                }
                                              });
                                            })["catch"](function () {
                                              mintResultCrew = false;
                                              return;
                                            }));

                                          case 2:
                                          case "end":
                                            return _context16.stop();
                                        }
                                      }
                                    });
                                  }));

                                case 3:
                                  _context19.next = 7;
                                  break;

                                case 5:
                                  _context19.next = 7;
                                  return regeneratorRuntime.awrap(dancerContract.methods.isApprovedForAll(walletAddress, crewAddress).call().then(function _callee16(resDancer) {
                                    return regeneratorRuntime.async(function _callee16$(_context18) {
                                      while (1) {
                                        switch (_context18.prev = _context18.next) {
                                          case 0:
                                            if (!(resDancer.status === false)) {
                                              _context18.next = 5;
                                              break;
                                            }

                                            _context18.next = 3;
                                            return regeneratorRuntime.awrap(dancerContract.methods.setApprovalForAll(crewAddress, true).send({
                                              from: walletAddress
                                            }).then(function _callee15() {
                                              return regeneratorRuntime.async(function _callee15$(_context17) {
                                                while (1) {
                                                  switch (_context17.prev = _context17.next) {
                                                    case 0:
                                                      _context17.next = 2;
                                                      return regeneratorRuntime.awrap(crewContract.methods.mint(name, coachIds, dancerIds).send({
                                                        from: walletAddress
                                                      }).then(function () {
                                                        mintResultCrew = true;
                                                      })["catch"](function () {
                                                        mintResultCrew = false;
                                                        return;
                                                      }));

                                                    case 2:
                                                    case "end":
                                                      return _context17.stop();
                                                  }
                                                }
                                              });
                                            })["catch"](function () {
                                              mintResultCrew = false;
                                              return;
                                            }));

                                          case 3:
                                            _context18.next = 7;
                                            break;

                                          case 5:
                                            _context18.next = 7;
                                            return regeneratorRuntime.awrap(crewContract.methods.mint(name, coachIds, dancerIds).send({
                                              from: walletAddress
                                            }).then(function () {
                                              mintResultCrew = true;
                                            })["catch"](function () {
                                              mintResultCrew = false;
                                              return;
                                            }));

                                          case 7:
                                          case "end":
                                            return _context18.stop();
                                        }
                                      }
                                    });
                                  })["catch"](function () {
                                    mintResultCrew = false;
                                    return;
                                  }));

                                case 7:
                                case "end":
                                  return _context19.stop();
                              }
                            }
                          });
                        })["catch"](function () {
                          mintResultCrew = false;
                          return;
                        })["catch"](function () {
                          mintResultCrew = false;
                          return;
                        }));

                      case 8:
                      case "end":
                        return _context20.stop();
                    }
                  }
                });
              })["catch"](function (error) {
                console.log(error);
                return;
              }));

            case 2:
              return _context21.abrupt("return", mintResultCrew);

            case 3:
            case "end":
              return _context21.stop();
          }
        }
      });
    },
    // Update Crew
    updateCrew: function updateCrew(walletAddress, crewID, coachID, dancerID) {
      var updateCrewRes;
      return regeneratorRuntime.async(function updateCrew$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              _context26.next = 2;
              return regeneratorRuntime.awrap(tokenContract.methods.allowance(walletAddress, crewAddress).call().then(function _callee22(res) {
                return regeneratorRuntime.async(function _callee22$(_context25) {
                  while (1) {
                    switch (_context25.prev = _context25.next) {
                      case 0:
                        if (!(parseInt(res) < web3.utils.toWei('1000', 'ether'))) {
                          _context25.next = 5;
                          break;
                        }

                        _context25.next = 3;
                        return regeneratorRuntime.awrap(crewTokenContract.methods.approve(crewAddress, web3.utils.toWei('10000', 'ether')).send({
                          from: walletAddress
                        }).then(function _callee20() {
                          return regeneratorRuntime.async(function _callee20$(_context23) {
                            while (1) {
                              switch (_context23.prev = _context23.next) {
                                case 0:
                                  _context23.next = 2;
                                  return regeneratorRuntime.awrap(crewContract.methods.updateCrew(crewID, coachID, dancerID).send({
                                    from: walletAddress
                                  }).then(function _callee19() {
                                    return regeneratorRuntime.async(function _callee19$(_context22) {
                                      while (1) {
                                        switch (_context22.prev = _context22.next) {
                                          case 0:
                                            updateCrewRes = true;

                                          case 1:
                                          case "end":
                                            return _context22.stop();
                                        }
                                      }
                                    });
                                  })["catch"](function () {
                                    updateCrewRes = false;
                                  }));

                                case 2:
                                case "end":
                                  return _context23.stop();
                              }
                            }
                          });
                        }));

                      case 3:
                        _context25.next = 8;
                        break;

                      case 5:
                        if (!(parseInt(res) >= web3.utils.toWei('1000', 'ether'))) {
                          _context25.next = 8;
                          break;
                        }

                        _context25.next = 8;
                        return regeneratorRuntime.awrap(crewContract.methods.updateCrew(crewID, coachID, dancerID).send({
                          from: walletAddress
                        }).then(function _callee21() {
                          return regeneratorRuntime.async(function _callee21$(_context24) {
                            while (1) {
                              switch (_context24.prev = _context24.next) {
                                case 0:
                                  updateCrewRes = true;

                                case 1:
                                case "end":
                                  return _context24.stop();
                              }
                            }
                          });
                        })["catch"](function () {
                          updateCrewRes = false;
                        }));

                      case 8:
                      case "end":
                        return _context25.stop();
                    }
                  }
                });
              }));

            case 2:
              return _context26.abrupt("return", updateCrewRes);

            case 3:
            case "end":
              return _context26.stop();
          }
        }
      });
    },
    // Get Mint Price
    getMintPrice: function getMintPrice(amount) {
      var price;
      return regeneratorRuntime.async(function getMintPrice$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              _context28.next = 2;
              return regeneratorRuntime.awrap(feehandlerContract.methods.getMintingPrice(amount).call().then(function _callee23(res) {
                return regeneratorRuntime.async(function _callee23$(_context27) {
                  while (1) {
                    switch (_context27.prev = _context27.next) {
                      case 0:
                        // console.log(res);
                        price = res;

                      case 1:
                      case "end":
                        return _context27.stop();
                    }
                  }
                });
              }));

            case 2:
              return _context28.abrupt("return", parseFloat(web3.utils.fromWei(price, 'ether')).toFixed(2));

            case 3:
            case "end":
              return _context28.stop();
          }
        }
      });
    }
  };
};

var _default = Mint;
exports["default"] = _default;