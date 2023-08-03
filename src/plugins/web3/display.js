import Web3 from 'web3';

const web3 = new Web3(window.ethereum);
const dancerAbi = require('./abi/dancer_abi.json');
const coachAbi = require('./abi/coach_abi.json');
const crewAbi = require('./abi/crew_abi.json');
const rewardpoolAbi = require('./abi/rewardpool_abi.json');
const freehandleAbi = require('./abi/freehandler_abi.json');
const tokenMDC = require('./abi/token_mdc.json');

let tokenAddress = process.env.VUE_APP_TOKEN_ADDRESS;
let dancerAddress = process.env.VUE_APP_DANCER_ADDRESS;
let coachAddress = process.env.VUE_APP_COACH_ADDRESS;
let crewAddress = process.env.VUE_APP_CREW_ADDRESS;
let rewardpoolAddress = process.env.VUE_APP_REWARD_POOL_ADDRESS;
let freehandleAddress = process.env.VUE_APP_FEE_HANDLER;
// let noReferralAddress = process.env.VUE_APP_REFERRAL_ADDRESS;

let dancerContract = new web3.eth.Contract(dancerAbi, dancerAddress);
let coachContract = new web3.eth.Contract(coachAbi, coachAddress);
let crewContract = new web3.eth.Contract(crewAbi, crewAddress);
let rewardpoolContract = new web3.eth.Contract(rewardpoolAbi, rewardpoolAddress);
let feehandleContract = new web3.eth.Contract(freehandleAbi, freehandleAddress);
let tokenContract = new web3.eth.Contract(tokenMDC, tokenAddress);

const Display = () => ({
  // display Dancers
  async displayDancer(walletAddress) {
    const dancerData = await dancerContract.methods.getAllDancers(walletAddress).call();
    // console.log(dancerData);
    return dancerData;
  },

  // display Coach
  async displayCoach(walletAddress) {
    
    const coachData = await coachContract.methods.getAllCoachs(walletAddress).call()
    // console.log(coachData);
    return coachData;
  },

  // display Crew
  async displayCrew(walletAddress) {
    // const crewDataInfo = await crewContract.methods.getAllBattleCrewInfo().call();
    // eslint-disable-next-line no-unused-vars
    const tokenID = await crewContract.methods.getTokenIds(walletAddress).call();
    let crewData = [];
    var tokenList = [];

    for(var i = 0; i < tokenID.length; i++){
      tokenList = await crewContract.methods.getCrew(tokenID[i]).call();
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
        lastBattleTime: [],
        canBattle: 0,
        dancersCount: 0,
        coachesCount: 0
      };
      // console.log(crew);
      crew.tokenID = tokenID[i];
      crew.name = tokenList[0];
      crew.coachesId = tokenList[1];
      crew.dancersId = tokenList[2];
      crew.supply = tokenList[3];
      crew.dp = tokenList[4];
      crew.lastBattleTime = tokenList[5];
      crew.coachesCount = tokenList[1].length;
      crew.dancersCount = tokenList[2].length;
      crew.canBattle = await this.canBattleDance(tokenID[i]),
      crew.member = 'D/' + tokenList[2].length + ',' + 'C/' + tokenList[1].length;

      crewData.push(crew);
    }
    return crewData;
  },

  // Get Crew Info 
  async getCrew(crewId){
    const crewInfo = await crewContract.methods.getCrew(crewId).call();
    return crewInfo;
  },

  // Get Dancers
  async getDancers(tokenID) {
    const dancerData = await dancerContract.methods.getDancer(tokenID).call();
    // console.log(dancerData);
    return dancerData;
  },

  // Get Dancers
  async getCoaches(tokenID) {
    const coachData = await coachContract.methods.getCoach(tokenID).call();
    // console.log(dancerData);
    return coachData;
  },

  async balanceOfDancer(acc) {
    const res = await dancerContract.methods.balanceOf(acc).call();
    return res;
  },

  async balanceOfCoach(acc) {
    const res = await coachContract.methods.balanceOf(acc).call();
    return res;
  },

  async balanceOfCrew(acc) {
    const res = await crewContract.methods.balanceOf(acc).call();
    return res;
  },

  // async getNextBattleTime(acc) {
  //   const res = await crewContract.methods.getNextBattleTime(acc).call();
  //   return res;
  // },
  async canBattleDance(tokenID) {
    const canBattle = await crewContract.methods.canBattleDance(tokenID).call();
    // console.log(canBattle);
    return canBattle;
  },

  async getAvailableCrewsCount(acc) {
    const res = await crewContract.methods.getAvailableCrewsCount(acc).call();
    return res;
  },

  async viewBonusReferrer(acc) {
    const res = await crewContract.methods.viewBonusReferrer(acc).call();
    // return parseFloat(web3.utils.fromWei(res, 'ether')).toFixed(2);
    if ( res > 0) {
      return parseFloat(res).toFixed(2);
    } else {
      return 0;
    }
  },

  async claimRefferalBonus(acc) {
    var claimBonus;
    await crewContract.methods.claimRefferalBonus().send({from: acc}).then(async function() {
      claimBonus = true;
    })
    .catch(function(){ 
      claimBonus = false;
    });
    return claimBonus;
  },

  async RewardAfterTax(acc) {
    // console.log(acc);
    const res = await crewContract.methods.RewardAfterTax().call({from: acc});
    return parseFloat(web3.utils.fromWei(res, 'ether')).toFixed(2);
  },

  async getMaxBattlePower(acc) {
    const res = await crewContract.methods.getMaxBattlePower(acc).call();
    return res;
  },
  
  async getTaxLeftDays(acc) {
    const res = await crewContract.methods.getTaxLeftDays(acc).call();
    return res;
  },

  // USD to MDC
  async getMDCAmountFromUSD(usd) {
    // console.log(usd);
    const res = await feehandleContract.methods.getMDCAmountFromUSD(usd).call();
    return parseFloat(web3.utils.fromWei(res, 'ether')).toFixed(3);
  },

  // MDC to USD  
  async getUSDAmountFromMDC(mdc) {
    // console.log(mdc);
    const res = await feehandleContract.methods.getUSDAmountInMDC(mdc).call();
    return res;
  },

  
  // Show Energy Drinks Price
  async buyDrink(walletAddress ,tokenID, supply, fromWallet) {
    let buyDrinkRes;
    await tokenContract.methods.allowance( walletAddress, crewAddress).call().then(async function(res){
      if ( parseInt(res) < web3.utils.toWei('1000', 'ether')) {
        await tokenContract.methods.approve( crewAddress, web3.utils.toWei('10000', 'ether')).send({from: walletAddress}).then(async function(){
          await crewContract.methods.addSupply(tokenID, supply, fromWallet).send({from: walletAddress}).then(async function() {
            buyDrinkRes = true;
          })
          .catch(function(){ 
            buyDrinkRes = false;
          });
        })
      } else if ( parseInt(res) >= web3.utils.toWei('1000', 'ether')) {
        await crewContract.methods.addSupply(tokenID, supply, fromWallet).send({from: walletAddress}).then(async function() {
          buyDrinkRes = true;
        })
        .catch(function(){ 
          buyDrinkRes = false;
        });
      }
    })
    return buyDrinkRes;
  },

  // Buy Energy Drinks
  async getSupplyCost(dancerCount, supply) {
    let drinkPrice;
    await feehandleContract.methods.getSupplyCost(dancerCount, supply).call().then(async function(res) {
      drinkPrice = res;
    })
    return parseFloat(web3.utils.fromWei(drinkPrice, 'ether')).toFixed(2);
  },

  // Update Crew
  async updateCrew(walletAddress, crewID, coachID, dancerID) {
    let updateCrewRes
    await crewContract.methods.updateCrew( crewID, dancerID, dancerID).send({from: walletAddress}).then(async function() {
      updateCrewRes = true;
    })
    .catch(function(){ 
      updateCrewRes = false;
    });
    return updateCrewRes;
  },

  //  Claim Reward
  async claimReward(walletAddress) {
    let claimReward ;
    await crewContract.methods.claimReward().send({from: walletAddress}).then(async function() {
      claimReward = true;
    })
    .catch(function(){ 
      claimReward = false;
    });
    return claimReward;
  },
  
  //  Get unclaimed reward
  async getUnclaimedMDC(walletAddress) {
    let unclaimReward
    await rewardpoolContract.methods.getUnclaimedMDC().send({from: walletAddress}).then(async function() {
      unclaimReward = true;
    })
    .catch(function(){ 
      unclaimReward = false;
    });
    return unclaimReward;
  },

  async getMinClaimTax(walletAddress) {
    let tax;
    await feehandleContract.methods.getMinClaimTax().call({from: walletAddress}).then(async function(res) {
      // console.log(res);
      tax = res;
    })
    .catch(function(){ 
    });
    return tax;
  },

  // Mass Dismiss
  // bool isCoach = true (if coach), false (if dancer)
  async dismiss(walletAddress, tokenID, isCoach) {
    var dismissRes;
    await crewContract.methods.Dismiss( tokenID, isCoach).send({from: walletAddress}).then(async function(res){
      console.log(res);
      dismissRes = parseFloat(web3.utils.fromWei(res.events.Dismissed.returnValues.amount, 'ether')).toFixed(2);
    })
    .catch(function(error){ 
      console.log(error); 
      dismissRes = false;
    });
    return dismissRes;
  },

  async getTrainingCost(walletAddress, amount) {
    var total;
    await feehandleContract.methods.getTrainingCost(amount).call().then(async function(res){
      total = res;
    });
    return total;
  },

  async getCostForAddingDancer(dancerCount, remainingDrinks) {
    var total;
    await feehandleContract.methods.getCostForAddingDancer(dancerCount, remainingDrinks).call().then(async function(res){
      total = res;
    });
    return total;
  },

  async dateBonusClaim(walletAddress) {
    var date;

    // console.log(walletAddress);

      await rewardpoolContract.methods.dateBonusClaim(walletAddress).call().then(async function(res){
        // console.log(res);
        date = res;
    });
    return date;
  }
});

export default Display;
