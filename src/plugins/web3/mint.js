import Web3 from 'web3';

const web3 = new Web3(window.ethereum);
const dancerAbi = require('./abi/dancer_abi.json');
const coachAbi = require('./abi/coach_abi.json');
const crewAbi = require('./abi/crew_abi.json');
const tokenMDC = require('./abi/token_mdc.json');
const feeAbi = require('./abi/freehandler_abi.json');

let tokenAddress = process.env.VUE_APP_TOKEN_ADDRESS;
let dancerAddress = process.env.VUE_APP_DANCER_ADDRESS;
let coachAddress = process.env.VUE_APP_COACH_ADDRESS;
let crewAddress = process.env.VUE_APP_CREW_ADDRESS;
let feeHandlerAddress = process.env.VUE_APP_FEE_HANDLER;
let noReferralAddress = process.env.VUE_APP_REFERRAL_ADDRESS;

let dancerTokenContract = new web3.eth.Contract(dancerAbi, tokenAddress);
let dancerContract = new web3.eth.Contract(dancerAbi, dancerAddress);

let coachTokenContract = new web3.eth.Contract(coachAbi, tokenAddress);
let coachContract = new web3.eth.Contract(coachAbi, coachAddress);

let crewTokenContract = new web3.eth.Contract(crewAbi, tokenAddress);
let crewContract = new web3.eth.Contract(crewAbi, crewAddress);
let tokenContract = new web3.eth.Contract(tokenMDC, tokenAddress);
let feehandlerContract = new web3.eth.Contract(feeAbi, feeHandlerAddress);

let mintResultDancer;
let mintResultCoach;
let mintResultCrew;



const Mint = () => ({
  // Mint Dancers
  async mintDancer(walletAddress ,quantity, referralAddress) {
    var refAdd;
    if(referralAddress !== null && referralAddress !== undefined && referralAddress !== '') {
      refAdd = referralAddress;
    } else {
      refAdd = noReferralAddress;
    }
    // allowance
    await tokenContract.methods.allowance( walletAddress, dancerAddress).call().then(async function(res){
      if ( parseInt(res) < web3.utils.toWei('1000', 'ether')) {
        // approve
        await dancerTokenContract.methods.approve(dancerAddress, web3.utils.toWei('10000', 'ether')).send({from: walletAddress}).then(async function(){
          // requestRandomWords
          await dancerContract.methods.requestRandomWords().send({from: walletAddress}).then(async function(){
            // Mint
            await dancerContract.methods.mint(quantity, refAdd).send({from: walletAddress}).then(function(res){
              // Mint Success
              console.log(res);
              mintResultDancer = true;
            })
            .catch(function(){ 
              mintResultDancer = false;
              return;});
          })
          .catch(function(){ 
            mintResultDancer = false;
            return; });
        })
        .catch(function(){ 
          mintResultDancer = false; 
          return;});
      } else if ( parseInt(res) >= web3.utils.toWei('1000', 'ether')) {
        // requestRandomWords
        await dancerContract.methods.requestRandomWords().send({from: walletAddress}).then(async function(){
          // Mint
          await dancerContract.methods.mint(quantity, refAdd).send({from: walletAddress}).then(function(){
            // Mint Success
            // console.log(res);
            mintResultDancer = true;
          })
          .catch(function(){ 
            mintResultDancer = false;
            return;});
        })
        .catch(function(){ 
          mintResultDancer = false;
          return; });
      }
    })
    .catch(function(error){ console.log(error); return;});
    return mintResultDancer;
  },

  // Mint Coach
  async mintCoach(walletAddress, quantity, referralAddress) {
    var refAdd;
    if(referralAddress !== null && referralAddress !== undefined && referralAddress !== '') {
      refAdd = referralAddress;
    } else {
      refAdd = noReferralAddress;
    }
    // allowance
    await tokenContract.methods.allowance( walletAddress, coachAddress).call().then(async function(res){
      if ( parseInt(res) < web3.utils.toWei('1000', 'ether')) {
        // approve
        await coachTokenContract.methods.approve(coachAddress, web3.utils.toWei('10000', 'ether')).send({from: walletAddress}).then(async function(){
          // requestRandomWords
          await coachContract.methods.requestRandomWords().send({from: walletAddress}).then(async function(){
            // Mint
            await coachContract.methods.mint(quantity, refAdd).send({from: walletAddress}).then(function(){
              // Mint Success
              mintResultCoach = true;
            })
            .catch(function(){ 
              mintResultCoach = false;
              return;});
          })
          .catch(function(){ 
            mintResultCoach = false;
            return; });
        })
        .catch(function(){ 
          mintResultCoach = false; 
          return;});
      } else if ( parseInt(res) >= web3.utils.toWei('1000', 'ether')) {
        // requestRandomWords
        await coachContract.methods.requestRandomWords().send({from: walletAddress}).then(async function(){
          // Mint
          await coachContract.methods.mint(quantity, refAdd).send({from: walletAddress}).then(function(){
            // Mint Success
            mintResultCoach = true;
          })
          .catch(function(){ 
            mintResultCoach = false;
            return;});
        })
        .catch(function(){ 
          mintResultCoach = false;
          return; });
      }
    })
    .catch(function(error){ console.log(error); return;});
    return mintResultCoach;
  },

  // Mint Crew
  // eslint-disable-next-line no-unused-vars
  async mintCrew(walletAddress, name, coachIds, dancerIds) {
    await tokenContract.methods.allowance( walletAddress, crewAddress).call().then(async function(res){
      if ( parseInt(res) < web3.utils.toWei('1000', 'ether')) {
        await crewTokenContract.methods.approve( crewAddress, web3.utils.toWei('10000', 'ether')).send({from: walletAddress}).then(async function(){
          await coachContract.methods.setApprovalForAll( crewAddress, true).send({from: walletAddress}).then(async function(){
            await dancerContract.methods.setApprovalForAll( crewAddress, true).send({from: walletAddress}).then(async function(){
              await crewContract.methods.mint(name, coachIds, dancerIds).send({from: walletAddress}).then(function(){
                mintResultCrew= true;
              })
              .catch(function(){ 
                mintResultCrew = false;
                return;
              });
            })
            .catch(function(){ 
              mintResultCrew = false;
              return;
            });
          })
          .catch(function(){ 
            mintResultCrew = false;
            return;
          });
        })
        .catch(function(){ 
          mintResultCrew = false;
          return;
        });
      } else if ( parseInt(res) >= web3.utils.toWei('1000', 'ether')) {
        // Check coach, if owner is not approved (Create crew)
        await coachContract.methods.isApprovedForAll( walletAddress, crewAddress).call().then(async function(approveAllRes){
          // console.log(approveAllRes);
          if ( approveAllRes === false) {
            // Check dancer ,if owner is not approved (Create crew)
            await coachContract.methods.setApprovalForAll( crewAddress, true).send({from: walletAddress}).then(async function(){
              await dancerContract.methods.isApprovedForAll( walletAddress, crewAddress).send({from: walletAddress}).then(async function(resDan){
                // console.log(resDan);
                if ( resDan === false) {
                  await dancerContract.methods.setApprovalForAll( crewAddress, true).send({from: walletAddress}).then(async function(){
                    await crewContract.methods.mint(name, coachIds, dancerIds).send({from: walletAddress}).then(function(){
                      mintResultCrew= true;
                    })
                    .catch(function(){ 
                      mintResultCrew = false;
                      return;
                    });
                  })
                  .catch(function(){ 
                    mintResultCrew = false;
                    return;
                  });
                } else {
                  await crewContract.methods.mint(name, coachIds, dancerIds).send({from: walletAddress}).then(function(){
                    mintResultCrew= true;
                  })
                  .catch(function(){ 
                    mintResultCrew = false;
                    return;
                  });
                }
              })
              .catch(function(){ 
                mintResultCrew = false;
                return;
              });
            })
          } else {
            // Check dancer ,if owner is approved (Create crew)
            await dancerContract.methods.isApprovedForAll( walletAddress, crewAddress).call().then(async function(resDancer){
              // console.log(resDancer);
              if ( resDancer.status === false) {
                await dancerContract.methods.setApprovalForAll( crewAddress, true).send({from: walletAddress}).then(async function(){
                  await crewContract.methods.mint(name, coachIds, dancerIds).send({from: walletAddress}).then(function(){
                    mintResultCrew= true;
                  })
                  .catch(function(){ 
                    mintResultCrew = false;
                    return;
                  });
                })
                .catch(function(){ 
                  mintResultCrew = false;
                  return;
                });
              } else {
                await crewContract.methods.mint(name, coachIds, dancerIds).send({from: walletAddress}).then(function(){
                  mintResultCrew= true;
                })
                .catch(function(){ 
                  mintResultCrew = false;
                  return;
                });
              }
            })
            .catch(function(){ 
              mintResultCrew = false;
              return;
            });
          }
        })
        .catch(function(){ 
          mintResultCrew = false;
          return;
        })
        .catch(function(){ 
          mintResultCrew = false;
          return;
        });
      }
    })
    .catch(function(error){ console.log(error); return;});
    return mintResultCrew;
  },

  // Update Crew
  async updateCrew(walletAddress, crewID, coachID, dancerID) {
    var updateCrewRes;

    await tokenContract.methods.allowance( walletAddress, crewAddress).call().then(async function(res){
      // console.log(res);
      if ( parseInt(res) < web3.utils.toWei('1000', 'ether')) {
        await crewTokenContract.methods.approve( crewAddress, web3.utils.toWei('10000', 'ether')).send({from: walletAddress}).then(async function(){
          await crewContract.methods.updateCrew( crewID, coachID, dancerID).send({from: walletAddress}).then(async function() {
            updateCrewRes = true;
          })
          .catch(function(){ 
            updateCrewRes = false;
          });
        });

      } else if ( parseInt(res) >= web3.utils.toWei('1000', 'ether')) {
        await crewContract.methods.updateCrew( crewID, coachID, dancerID).send({from: walletAddress}).then(async function() {
          updateCrewRes = true;
        })
        .catch(function(){ 
          updateCrewRes = false;
        });
      }
    })
    return updateCrewRes;
  },

  // Get Mint Price
  async getMintPrice(amount) {
    let price;
    await feehandlerContract.methods.getMintingPrice(amount).call().then(async function(res) {
      // console.log(res);
      price = res;
    })
    return parseFloat(web3.utils.fromWei(price, 'ether')).toFixed(2);
  }
});

export default Mint;
