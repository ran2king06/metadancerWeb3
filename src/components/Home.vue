<template>
  <div v-if="login === true" class="bg"></div>
  <Header v-if="login === true" @toggle-menu="toggleBurgerMenu()"/>
  <Sidebar v-if="login === true" ref="sideBarMobileToggle"/>
  <main class="mainContent">
    <div v-if="login === false" class="enter-page">
      <div class="bg-login">
        <div class="login-box">
          <div class="btn-login-container cursor-pointer" @click="connectWallet()">
            <img src="./../assets/images/group-connect.png">
          </div>
        </div>
      </div>
    </div>
  </main>
  
</template>

<script>
import Web3 from 'web3';
import Header from './../components/Header.vue'
import Sidebar from './../components/Sidebar.vue'
// import Dancer from './components/Play/Dancer.vue'

export default {
  name: 'HomePage',
  inject: {
    Wallet: {
      from: 'Wallet'
    }
  },
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      walletAddress: '',
      login: false,
      web3: '',
      refLink: ''
    }
  },

  mounted() {
    // this.getUrlParams();
    if (typeof web3 !== 'undefined') {
      this.checkConnected();
    }
  },
  methods: {
    toggleBurgerMenu() {
      this.$refs.sideBarMobileToggle.toggleBurgerMenu();
    },

    // getUrlParams: function() {
    //   console.log(this.$route);
    //   // localStorage.setItem('ref', this.$route);
    //   // console.log(localStorage.getItem('ref'));
    // },

    // Detect connect metamask status
    async checkConnected() {
      this.web3 = new Web3(window.ethereum);

      const network = await this.Wallet().switchNetwork();
      const address = await this.Wallet().getAccount();

      // console.log(address);
      // console.log(network);
      if(address !== '' && address !== undefined && address.code !== 4001 && network === true) {
        this.login = true;
      } else {
        this.login = false;
        this.$router.push('');
      }

    },

    //  Connect wallet 
    async connectWallet() {
      await this.Wallet().connectWallet();

      const network = await this.Wallet().switchNetwork();
      // console.log(network);

      await this.web3.eth.getAccounts().then(res => {
        this.walletAddress = res[0];
        if(this.walletAddress !== '' && this.walletAddress !== undefined && network === true) {
          this.login = true;
        } else {
          this.login = false;
          this.$router.push('/');
        }
      });
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

.bg {
  background: url('./../assets/images/bg.jpg');
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
  bottom: 15%;
  left: 50%;
  transform: translate(-50%, 0);
}

.btn-login-container img{
  width: 100%;
  max-width: 300px;
}

.login-box {
  position: relative;
  height: 100%;
  width: 100%;
}

.bg-login {
  background: url('./../assets/images/login-bg.jpg');
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
  width: 100vw;
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
