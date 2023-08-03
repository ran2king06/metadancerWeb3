import Web3 from 'web3';

const web3 = new Web3(window.ethereum);
const dancerAbi = require('./abi/dancer_abi.json');
const coachAbi = require('./abi/coach_abi.json');
const crewAbi = require('./abi/crew_abi.json');
const tokenMDC = require('./abi/token_mdc.json');
const marketplaceAbi = require('./abi/marketplace_abi.json');

// let tokenAddress = process.env.VUE_APP_TOKEN_ADDRESS;
let dancerAddress = process.env.VUE_APP_DANCER_ADDRESS;
let coachAddress = process.env.VUE_APP_COACH_ADDRESS;
let crewAddress = process.env.VUE_APP_CREW_ADDRESS;
let marketplaceAddress = process.env.VUE_APP_MARKETPLACE_ADDRESS;
let tokenAddress = process.env.VUE_APP_TOKEN_ADDRESS;

let dancerContract = new web3.eth.Contract(dancerAbi, dancerAddress);
let coachContract = new web3.eth.Contract(coachAbi, coachAddress);
let crewContract = new web3.eth.Contract(crewAbi, crewAddress);
let tokenContract = new web3.eth.Contract(tokenMDC, tokenAddress);
let marketplaceContract = new web3.eth.Contract(marketplaceAbi, marketplaceAddress);

const MarketPlace = () => ({
  // display Dancers
  async marketplaceDancers() {
    const dancerData = await dancerContract.methods.getAllDancers(marketplaceAddress).call();
    // console.log(dancerData);
    return dancerData;
  },

  // display Coach
  async marketplaceCoach() {
    const coachData = await coachContract.methods.getAllCoachs(marketplaceAddress).call()
    // console.log(coachData);
    return coachData;
  },

  // display Crew
  async marketplaceCrew() {
    // const crewDataInfo = await crewContract.methods.getAllBattleCrewInfo().call();
    // eslint-disable-next-line no-unused-vars
    const tokenID = await crewContract.methods.getTokenIds(marketplaceAddress).call();
    let crewData = [];
    var tokenList = [];

    for(var i = 0; i < tokenID.length; i++){
      tokenList = await crewContract.methods.getCrew(tokenID[i]).call();

      // console.log(tokenList);
      var crew = {
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
      crew.own = await this.getMarketItemAddress(3, tokenID[i]),
      crew.price = await this.getMarketItemPrice(3, tokenID[i])

      
      crew.member = 'D/' + tokenList[2].length + ',' + 'C/' + tokenList[1].length;

      crewData.push(crew);
    }
    // console.log(crewData);
    return crewData;
  },

  // View market item per seller
  // (1= coach, 2=dancer, else= crew)
  async getMarketItemPrice(itemType, tokenID) {
    const item = await marketplaceContract.methods.getMarketItem(itemType, tokenID).call();
    return item[0];
  },

  async getMarketItemAddress(itemType, tokenID) {
    const item = await marketplaceContract.methods.getMarketItem(itemType, tokenID).call();
    return item[1];
  },

  // Get Dancers
  async getDancers(tokenID) {
    const dancerData = await dancerContract.methods.getDancer(tokenID).call();
    return dancerData;
  },

  // Get Coaches
  async getCoaches(tokenID) {
    const coachData = await coachContract.methods.getCoach(tokenID).call();
    return coachData;
  },

  // Sell Item To The Marketplace
  async sellItem(walletAddress, itemType, tokenID, price) {
    var sellItemResult;
    var priceWei =  web3.utils.toWei(price, 'ether');

    // await tokenContract.methods.allowance( walletAddress, marketplaceAddress).call().then(async function(res){
    //   // console.log(parseInt(res));
    //   if ( parseInt(res) < web3.utils.toWei('1000', 'ether')) {
    //     await tokenContract.methods.approve( marketplaceAddress, web3.utils.toWei('10000', 'ether')).send({from: walletAddress}).then(async function(){
          if (itemType === 'coach') {
            await coachContract.methods.approve( marketplaceAddress, tokenID).send({from: walletAddress}).then(async function(){
              await marketplaceContract.methods.sellToken(1, tokenID, priceWei).send({from: walletAddress}).then(function(res){
                console.log(res);
                sellItemResult = true;
              })
              .catch(function(){
                sellItemResult = false;
              });
            })
            .catch(function(){
              sellItemResult = false;
            });
    
          } else if (itemType === 'dancer') {
            await dancerContract.methods.approve( marketplaceAddress, tokenID).send({from: walletAddress}).then(async function(){
              await marketplaceContract.methods.sellToken(2, tokenID, priceWei).send({from: walletAddress}).then(function(){
                sellItemResult = true;
              })
              .catch(function(){
                sellItemResult = false;
              });
    
            })
            .catch(function(){
              sellItemResult = false;
            });
    
          } else if (itemType === 'crew') {
            await crewContract.methods.approve( marketplaceAddress, tokenID).send({from: walletAddress}).then(async function(){
              await marketplaceContract.methods.sellToken(3, tokenID, priceWei).send({from: walletAddress}).then(function(){
                // console.log(res);
                sellItemResult = true;
              })
              .catch(function(){
                // console.log(res);
                sellItemResult = false;
              });
            })
            .catch(function(){
              sellItemResult = false;
            });
          }  
    //     })
    //     .catch(function(){
    //     });
    //   } else if( parseInt(res) >= web3.utils.toWei('1000', 'ether')) {
    //     if (itemType === 'coach') {
    //       await coachContract.methods.approve( marketplaceAddress, tokenID).send({from: walletAddress}).then(async function(){
    //         await marketplaceContract.methods.sellToken(1, tokenID, priceWei).send({from: walletAddress}).then(function(res){
    //           console.log(res);
    //           sellItemResult = true;
    //         })
    //         .catch(function(){
    //           sellItemResult = false;
    //         });
    //       })
    //       .catch(function(){
    //         sellItemResult = false;
    //       });
  
    //     } else if (itemType === 'dancer') {
    //       await dancerContract.methods.approve( marketplaceAddress, tokenID).send({from: walletAddress}).then(async function(){
    //         await marketplaceContract.methods.sellToken(2, tokenID, priceWei).send({from: walletAddress}).then(function(){
    //           sellItemResult = true;
    //         })
    //         .catch(function(){
    //           sellItemResult = false;
    //         });
  
    //       })
    //       .catch(function(){
    //         sellItemResult = false;
    //       });
  
    //     } else if (itemType === 'crew') {
    //       await crewContract.methods.approve( marketplaceAddress, tokenID).send({from: walletAddress}).then(async function(){
    //         await marketplaceContract.methods.sellToken(3, tokenID, priceWei).send({from: walletAddress}).then(function(){
    //           // console.log(res);
    //           sellItemResult = true;
    //         })
    //         .catch(function(){
    //           // console.log(res);
    //           sellItemResult = false;
    //         });
    //       })
    //       .catch(function(){
    //         sellItemResult = false;
    //       });
    //     }  
    //   }
    // });
    // console.log(sellItemResult);
    return sellItemResult;
  },

  async buyToken(walletAddress, itemType, tokenID, price) {
    var buyItemResult;
    const priceWei = price;
    // const priceWei = web3.utils.toWei(price, 'ether');

    await tokenContract.methods.allowance( walletAddress, marketplaceAddress).call().then(async function(res){
      // console.log(res);
      if ( parseInt(res) < web3.utils.toWei('10000', 'ether')) {
        await tokenContract.methods.approve( marketplaceAddress,  web3.utils.toWei('10000', 'ether')).send({from: walletAddress}).then(async function(){
          if (itemType === 'coach') {
              await marketplaceContract.methods.buyToken(1, tokenID, priceWei).send({from: walletAddress}).then(function(){
                buyItemResult = true;
              })
              .catch(function(){
                buyItemResult = false;
              });
    
          } else if (itemType === 'dancer') {
              await marketplaceContract.methods.buyToken(2, tokenID, priceWei).send({from: walletAddress}).then(function(){
                buyItemResult = true;
              })
              .catch(function(){
                buyItemResult = false;
              });
    
          } else if (itemType === 'crew') {
              await marketplaceContract.methods.buyToken(3, tokenID,  priceWei).send({from: walletAddress}).then(function(){
                buyItemResult = true;
              })
              .catch(function(res){
                console.log(res);
                buyItemResult = false;
              });
          }  
        })
        .catch(function(error){
          console.log(error);
        });
      } else if (res >= web3.utils.toWei('1000', 'ether')) {
          if (itemType === 'coach') {
            // console.log("Buying crew...")
              await marketplaceContract.methods.buyToken(1, tokenID, priceWei).send({from: walletAddress}).then(function(){
                buyItemResult = true;
              })
              .catch(function(){
                buyItemResult = false;
              });

          } else if (itemType === 'dancer') {
              // console.log("Buying Dancers...")
              await marketplaceContract.methods.buyToken(2, tokenID, priceWei).send({from: walletAddress}).then(function(){
                buyItemResult = true;
              })
              .catch(function(){
                buyItemResult = false;
              });
    
          } else if (itemType === 'crew') {
            // console.log("Buying crew...")
              await marketplaceContract.methods.buyToken(3, tokenID, priceWei).send({from: walletAddress}).then(function(res){
                console.log(res);
                buyItemResult = true;
            })
            .catch(function(error){
              console.log(error);
              buyItemResult = false;
          });
        }
      }
    });
    return buyItemResult;
  },

  // (1= coach, 2=dancer, else= crew)
  async updatePrice(walletAddress ,itemType, tokenID, price) {
    var resUpdate;
    var priceWei =  web3.utils.toWei(price, 'ether');

    await marketplaceContract.methods.updatePrice(itemType, tokenID, priceWei).send({from: walletAddress}).then(function () {
      resUpdate = true;
    })
    .catch(function(){
      // console.log(error);
      resUpdate = false;
    });
    // console.log(resUpdate);
    return resUpdate;
  },

  // Cancel item selling in the marketplace
  // (1= coach, 2=dancer, else= crew)
  async cancelSelling(walletAddress ,itemType, tokenID) {
    var resCancel;
    await marketplaceContract.methods.cancelSelling(itemType, tokenID).send({from: walletAddress}).then(function () {
      // console.log(res);
      resCancel = true;
    })
    .catch(function(){
      // console.log(error);
      resCancel = false;
    });
    // console.log(resCancel);
    return resCancel;
  }
});

export default MarketPlace;
