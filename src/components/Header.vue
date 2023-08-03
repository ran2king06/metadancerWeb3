<template>
  <header>
    <div class="header">
      <div class="headerContainer">
        <div class="headerBox">
          <!-- Mobile -->
          <div @click="$emit('toggle-menu')" class="cursor-pointer">
            <img class="menuMobile mobile-only" src="./../assets/images/icon/menu.png">
          </div>
          <div class="logoBox">
            <router-link :to="{ path: '/', query: { ref: paramsRef }}">
              <img class="logo" src="./../assets/images/logo.png">
            </router-link>
          </div>
          <div class="walletBox">
            <div class="walletBox-container">
              <div class="walletBox-inner">
                <!-- Claim -->
                <div class="mobile-box  mdc-value-box cursor-pointer" @click="claimTaxNotifications()">
                  <span class="pc-only">Claim {{ parseFloat(valueUSD).toFixed(2) }} $USD <br></span>
                  <div class="mdc-value-text pc-only"><span class="wave-style">≈</span> {{ valueMDC }} $MDC</div>
                  <span class="mobile-only s-font">{{ (valueMDC * (perMDC / 10000)).toFixed(2)  }} $USD</span>
                </div>
                <!-- Token ICON -->
                <div class="walletBox-coin pc-only">
                  <img src="./../assets/images/coin.png">
                </div>
                <!-- Wallet -->
                <div class="mobile-box">
                  <div class="pc-only wallet-detail">
                    <h6>{{ walletValue }}</h6>
                    <h6>$MDC</h6>
                  </div>
                  <div class="wallet-address-box">
                    <div class="nav-bar-item wallet-box">
                      <img class="pc-only" src="./../assets/images/icon/wallet.png">
                      <span class="s-font">{{ walletAddress }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Token ICON -->
              <div class="walletBox-coin mobile-only">
                <img src="./../assets/images/coin.png">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <ModalClaimTaxNotifications ref="modalClaimTax" @refresh-wallet="collectReward()"/>
  <ModalLoading ref="modalLoading"/>
</template>

<script>
import Web3 from 'web3';
import ModalClaimTaxNotifications from './../components/Modal/ModalClaimTaxNotification.vue'
import ModalLoading from './../components/Modal/ModalLoading.vue'

export default {
  name: 'HeaderPagination',
  props: {
  },
  inject: {
    Wallet: {
      from: 'Wallet'
    },
    Display: {
      from: 'Display'
    }
  },
  components: {
    ModalClaimTaxNotifications,
    ModalLoading
  },
  emits: ['toggle-menu'],

  data() {
    return {
      walletValue: 0,
      valueMDC: 0,
      walletAddress: '',
      paramsRef: '',
      perMDC: null,
      valueUSD: 0
    }
  },
  mounted() {
    this.checkBalance();
    this.paramsRef = this.$route.query.ref;
    this.detectLoginWallet();
    this.mdcToUsd();
  },
  methods: {
    detectLoginWallet() {
      const res = this.Wallet().getAccount();
      // console.log(res);
      if(res === 0) {
        // this.$router.push({ path: "/", query: { show: true, ref: this.$route.query.ref } });
      }
    },

    claimTaxNotifications() {
      this.$refs.modalClaimTax.showModal();
    },

    async unclaimRewardUSD() {
      this.valueUSD = await this.Wallet().getUnclaimedUSD(this.walletAddress);
      // console.log(parseFloat(this.valueUSD).toFixed(2));
      this.valueUSD = parseFloat(this.valueUSD).toFixed(2);
    },

    async unclaimReward() {
      this.valueMDC = await this.Wallet().getUnclaimed(this.walletAddress);
      // console.log(parseFloat(this.valueMDC).toFixed(2));
      this.valueMDC = parseFloat(this.valueMDC).toFixed(2);
    },

    async checkBalance() {
      const web3 = new Web3(window.ethereum);
      web3.eth.getAccounts().then(async res => {
        this.walletAddress = res[0];
        // console.log(this.walletAddress);
        if(this.walletAddress !== '' && this.walletAddress !== 0 && this.walletAddress !== undefined) {
          var value = await this.Wallet().checkBalanceMDC();
          this.walletValue = parseFloat(value).toFixed(2); 
        }
      });
      this.unclaimReward();
      this.unclaimRewardUSD();
    },

    async mdcToUsd() {
      this.perMDC = await this.Display().getUSDAmountFromMDC(10000);
      // console.log(this.perMDC);
    },

    collectReward() {
      this.checkBalance();
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  header {
    position: relative;
    z-index: 100;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    width: 100vw;
    z-index: 10;
    background: #201A36;
    align-items: center;
  }

  .headerContainer {
    width: 100%;
    margin-left: auto;
    box-sizing: border-box;
    margin-right: auto;
    display: block;
    padding-left: 16px;
    padding-right: 16px;
  }

  .logoBox {
    padding-top: 15px;
  }

  .logo {
    max-height: 80px;
  }

  .walletBox {
    margin-left: auto;
    display: flex;
    flex-direction: column;
  }

  .walletBox-inner {
    display: flex;
    align-items: flex-end;
  }

  .walletBox-coin {
    margin: 0 10px;
  }

  .walletBox-coin img {
    height: 40px;
  }

  .wallet-detail {
    height: 25px;
    display: flex;
    justify-content: space-between;
  }

  .wallet-detail h6{
    margin: 0;
    color: #ffffff;
    font-size: 1em;
  }

  .mdc-value-box {
    position: relative;
    background: #7ACFFF;
    border-radius: 10px;
    padding: 0px 20px;
    color: #000
  }

  .mdc-value-box .mdc-value-text {
    font-size: 12px;
    color: #235989;
  }

  .wallet-address-box {
    position: relative;
    background: #FF50E8;
    color: #ffffff;
    height: 40px;
    border-radius: 10px;
    padding: 0px 20px;
    line-height: 40px;
    display: flex;
    align-items: center;
  }

  .wallet-address-box .wallet-box {
    display: flex;
    align-items: center;
  }

  .wallet-address-box .wallet-box span {
    text-overflow: ellipsis;
    max-width: 200px;
    overflow: hidden;
  }

  .wallet-address-box img {
    height: 20px;
    margin-right: 10px;
  }

  .mdc-value-box span {
  }

  a {
    text-decoration: none;
    color: #ffffff;
  }

  @media (orientation: landscape){
    .headerBox {
      min-height: 48px;
    }
  }

  @media (min-width: 960px) {
    .headerContainer {
      padding-top: 5px;
      padding-bottom: 5px;
      padding-left: 40px;
      padding-right: 40px;
    }

    .headerBox {
      min-height: 64px;
    }

    .walletBox {
      -webkit-box-flex: 0;
      flex-grow: 0;
    }
  }

  @media (max-width: 960px) {
    .logoBox {
      padding-top: 10px;
    }

    .mobile-box {
      width: 150px !important;
      margin: 5px 0 !important;
    }
    .headerContainer .headerBox {
      flex-flow: row !important;
    }

    .mobile-box.mdc-value-box {
      order: 2;
    }

    .walletBox-coin {
      order: 2;
    }

    .wallet-address-box .wallet-box span {
      text-overflow: ellipsis;
      max-width: 120px;
      overflow: hidden;
    }
  
    .mdc-value-box {
      height: 30px;
      line-height: 30px;
      margin-right: 15px;
    }
  
    .wallet-address-box {
      height: 30px;
      line-height: 30px;
    }

    .walletBox-container {
      display: flex;
      align-items: end;
    }
    .walletBox-inner {
      align-items: center;
      flex-direction: column;
    }
  }
</style>
