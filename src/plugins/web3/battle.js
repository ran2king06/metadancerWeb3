import Web3 from 'web3';

const web3 = new Web3(window.ethereum);
// const dancerAbi = require('./abi/dancer_abi.json');
// const coachAbi = require('./abi/coach_abi.json');
const crewAbi = require('./abi/crew_abi.json');
const battleAbi = require('./abi/battle_abi.json');

// let tokenAddress = process.env.VUE_APP_TOKEN_ADDRESS;
// let dancerAddress = process.env.VUE_APP_DANCER_ADDRESS;
// let coachAddress = process.env.VUE_APP_COACH_ADDRESS;
let crewAddress = process.env.VUE_APP_CREW_ADDRESS;
let battleAddress = process.env.VUE_APP_BATTLE_ADDRESS;

// let dancerContract = new web3.eth.Contract(dancerAbi, dancerAddress);
// let coachContract = new web3.eth.Contract(coachAbi, coachAddress);
let crewContract = new web3.eth.Contract(crewAbi, crewAddress);
let battleContract = new web3.eth.Contract(battleAbi, battleAddress);


// let battleStart;

const Battle = () => ({

  // display Dancers
  async battleInfo(id) {
    const info = await battleContract.methods.getBatlleInfo(id).call();
    var enemy = {
      name: info['0'], 
      percent: info['1'], 
      dancing_power: info['2'], 
      reward: info['3'], 
    }
    return enemy;
  },
  // Battle
  async battleRandom(walletAddress) {
    var getRandom = null;
    await crewContract.methods.requestRandomWords().send({from: walletAddress}).then(async function() {
      getRandom = true
    })
    .catch(function(){ 
      getRandom = false;
    });
    return getRandom;
  },

  // Battle BEGIN 
  async battleStart(walletAddress, crewID, battleID) {
    var battleResult;
    await crewContract.methods.dance(crewID, battleID, 0).send({from: walletAddress}).then(async function(res) {
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
      }

   // console.log(battleResult);
    })
    .catch(function(){ 
      // console.log(res);
      battleResult = false;
    });
    return battleResult;
  },

  // Mass Battle
  async massBattle(walletAddress) {
    var battleInfo;

    await crewContract.methods.requestRandomWords().send({from: walletAddress}).then(async function() {
      await crewContract.methods.massDance().send({from: walletAddress}).then(async function(res) {
    console.log(res);

        battleInfo = {
          success: true,
          list: res
        }
      })
      .catch(function(res){ 
    console.log(res);

        battleInfo = {
          success: false,
          list: []
        }
      });
    })
    .catch(function(){ 
    // console.log(res);
      battleInfo = {
        success: false,
        list: []
      }
    });
    return battleInfo;
  },

  // Battle history
  async battleHistory() {
    const history = await crewContract.methods.getAllBattleCrewInfo().call();
    return history;
  },

  async getAllBattle() {
    const getAllBattle = await battleContract.methods.getAllBattle().call();
    // console.log(getAllBattle);
    return getAllBattle;
  },

  // Get History
  async getHistory(acc) {
    let history = [];
    await crewContract.methods.getHistory().call({from: acc, gas: 500000000}).then(function(res){
      // console.log(res);
      for(let i = 0; i < res['0'].length; i++) {
        if( res['0'][i] == acc) {
          let item = {
            address: res['0'][i],
            name: res['1'][i],
            crewId: res['2'][i],
            battleTime: res['3'][i],
            battleID: res['4'][i],
            percentage: res['5'][i],
            result: res['6'][i],
            reward: res['7'][i],
          }
          history.push(item);
        }
      }
    });
 // console.log(history);
    return history
  }
});

export default Battle;
