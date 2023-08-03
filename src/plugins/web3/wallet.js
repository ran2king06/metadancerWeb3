import Web3 from 'web3';

const web3 = new Web3(window.ethereum);
const tokenMDC = require('./abi/token_mdc.json');
const crewAbi = require('./abi/crew_abi.json');
const rewardpoolAbi = require('./abi/rewardpool_abi.json');

let tokenAddress = process.env.VUE_APP_TOKEN_ADDRESS;
let crewAddress = process.env.VUE_APP_CREW_ADDRESS;
let rewardpoolAdress = process.env.VUE_APP_REWARD_POOL_ADDRESS;

let crewContract = new web3.eth.Contract(crewAbi, crewAddress);
let rewardpoolContract = new web3.eth.Contract(rewardpoolAbi, rewardpoolAdress);

var walletAddress;
const chainId = 56; // 137 Polygon Mainnet //97 bsc tesnet

const Wallet = () => ({
  async getAccount() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: "eth_accounts"}).then((acc) => {
          walletAddress = acc[0];
        });
      }
      catch (error) {
        console.log(error);
        walletAddress = 0;
      }
    }
    else {
      alert("Please install metamask.");
      return 0;
    }

    return walletAddress;
  },

  async connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts"}).then((acc) => {
          // console.log(acc[0]);
          walletAddress = acc[0];
        });
        // console.log(walletAddress);
        
      }
      catch (error) {
        console.log(error);
        walletAddress = 0;
      }
      // console.log(walletAddress);
      return walletAddress;

    } else {
      alert("Please install metamask.");
      return 0;
    }
  },

  // chainName: 'Polygon Mainnet',
  // nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
  // rpcUrls: ['https://polygon-rpc.com/']
  async switchNetwork() {
    if (window.ethereum.networkVersion !== chainId) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: web3.utils.toHex(chainId) }]
        });
        return true;
      } catch (err) {
          // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainName: 'Binance Smart Chain',
                chainId: web3.utils.toHex(chainId),
                nativeCurrency: { name: 'Binance Smart Chain', decimals: 18, symbol: 'BNB' },
                rpcUrls: ['https://bsc-dataseed.binance.org/']
              }
            ]
          });
        }
      }
    }
  },

  async checkBalanceBNB() {
    await this.switchNetwork();
    // const testnet = process.env.VUE_APP_TESTNET;
    const web3MDC = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');
    var balance = await web3MDC.eth.getBalance(walletAddress); //Will give value in.
    return web3.utils.fromWei(balance, 'ether')
  },

  async checkBalanceMDC() {
    await this.switchNetwork();
    // const testnet = process.env.VUE_APP_TESTNET;
    let tokenContract = new web3.eth.Contract(tokenMDC, tokenAddress);
    const balance = await tokenContract.methods.balanceOf(walletAddress).call();
    return web3.utils.fromWei(balance, 'ether')
  },


  // Get unclaimed reward USD
  async getUnclaimedUSD() {
    var getRes;
    await rewardpoolContract.methods.getUnclaimedUSD(walletAddress).call().then(async function(res) {
      // console.log(res);
      getRes = res;
    })
    .catch(function(){ 
      // console.log(error); 
      // getRes = false;
    });
    // console.log(unclaim);
    return getRes / 10000;
  },

  // Get unclaimed reward
  async getUnclaimed() {
    var getRes;
    await rewardpoolContract.methods.getUnclaimedMDC(walletAddress).call().then(async function(res) {
      // console.log(res);
      getRes = res;
    })
    .catch(function(){ 
      // console.log(error); 
      // getRes = false;
    });
    // console.log(unclaim);
    return web3.utils.fromWei(getRes, 'ether');
  },

  async claimReward(walletAddress) {
    var rewardRes;
    await crewContract.methods.claimReward().send({from: walletAddress}).then(async function() {
      rewardRes = true
    })
    .catch(function(){ 
      // getRes = false;
      rewardRes = false;
    });
    // console.log(unclaim);
    return rewardRes;
  }
});

export default Wallet;

