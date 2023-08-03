<template>
  <div v-if="login === true" class="bg"></div>
  <main class="mainContent">
    <router-view v-if="login === true"></router-view>
    <div v-if="login === false" class="enter-page">
      <div class="bg-login">
        <div class="login-box">
          <img class="logoPNG" src="./assets/images/logo.png" alt="">
          <div class="btn-login-container cursor-pointer" @click="connectWallet()">
            <img :src="changeImage" @mouseover="changeImage = logoImage" @mouseleave="changeImage = hoverImage"/>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Web3 from 'web3';
import { useRoute } from 'vue-router';

export default {
  name: 'App',
  inject: {
    Wallet: {
      from: 'Wallet'
    }
  },
  data() {
    return {
      walletAddress: '',
      walletDetect: '',
      changeImage: require("./assets/images/group-connect-hover.png"),
      hoverImage: require("./assets/images/group-connect-hover.png"),
      logoImage: require("./assets/images/group-connect.png"),
      login: false,
      web3: '',
      refLink: '',
      route: useRoute() 
    }
  },

  mounted() {
    var _this = this;
    // console.log(this.route.query);
    if (typeof web3 !== 'undefined') {
      this.checkConnected();
    }

    window.ethereum.on('accountsChanged', function (accounts) {
    // Time to reload your interface with accounts[0]!
    this.walletDetect = accounts.length;
      if(_this.walletDetect > 0 && _this.networkId === '0x38') {
        _this.login = true;
      } else {
        _this.login = false;
      }
    })

    window.ethereum.on('chainChanged', function (networkId) {
    // Time to reload your interface with the new networkId
    // console.log(networkId);
    this.networkId = networkId;

    if((_this.walletDetect > 0 || 
      _this.walletAddress !== null && _this.walletAddress !== '' && _this.walletAddress !== undefined) 
      && networkId === '0x38') {
        _this.login = true;
      } else {
        _this.login = false;
      }
    })
  },
  methods: {

    // Detect connect metamask status
    async checkConnected() {
      this.web3 = new Web3(window.ethereum);
      const network = await this.Wallet().switchNetwork();
      const address = await this.Wallet().getAccount();
      if(address !== '' && address !== undefined && address.code !== 4001 && network === true) {
        this.login = true;
      } else {
        this.login = false;
        // this.$router.push({ path: "/" });
      }

    },
    //  Connect wallet 
    async connectWallet() {
      // console.log("OK");
      let network;
      var address = await this.Wallet().connectWallet();
      this.walletAddress = address;

      if( address !== '' || address !== undefined || address !== 0) {
        network = await this.Wallet().switchNetwork();
      }
      // console.log(network);
      if(address !== '' && address !== undefined && address.code !== 4001 && address !== 0 && network === true) {
        this.login = true;
      } else {
        this.login = false;
        // this.$router.push('/');
      }
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  overflow-y: hidden;
}

.logoPNG {
  margin-top: 35px;
  max-width: 500px;
  width: 90%;
}

.bg {
  background: url('./assets/images/bg.jpg');
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.btn-login-container {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translate(-50%, 0);
}

.btn-login-container img{
  width: 100%;
  max-width: 265px;
}

.login-box {
  position: relative;
  height: 100%;
  width: 100%;
}

.bg-login {
  background: url('./assets/images/login-bg.jpg');
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
}

.mainContent {
  margin: 100px 0 0 auto;
  height: 100%;
  width: 100%;
  position: relative;
  padding-bottom: 85px;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
  background: #555;
}

/* Track */
::-webkit-scrollbar-track {

}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

@media (min-width: 960px){
  .mainContent {
      width: calc(100% - 250px);
  }
}

@media (max-width: 960px) {
  .mainContent {
    margin: 115px 0 0 auto;
    height: 100%;
    width: 100vw;
    position: relative;
    padding-bottom: 10px;
  }
}
</style>
