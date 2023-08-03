<template>
  <Header ref="headerBar" @toggle-menu="toggleBurgerMenu()"/>
  <Sidebar ref="sideBarMobileToggle"/>
  <div>
    <div class="dancer-invi-box"></div>
    <div class="dancer-container">
      <div class="container-box">
        <div class="box-title">
          <h3 class="h3-text-style">Your Inventory</h3>
          <!-- <img src="./../assets/images/title/invertory.png"> -->
        </div>
        <div class="box-content">
          <ul>
            <li>Dancer: <span>{{ dancer }}</span></li>
            <li>Coach: <span>{{ coach }}</span></li>
            <li>Crew: <span>{{ crew }}</span></li>
            <li>Available crew to battle: <span>{{ availableCrew }} / {{ crew }}</span></li>
            <!-- <li>Next battle time: <span>UTC 00:00</span></li> -->
            <li>DP of top crew: <span>{{ parseInt(dpHighest/100) }}</span></li>
            <li>Unclaimed $MDC: <span class="spanRightAlign">{{ unclaimedMDC }} </span> $MDC</li>
            <li>After tax: <span class="spanRightAlign">{{ afterTax }} </span> $MDC</li>
            <li>Tax days left: <span>{{ taxDaysLeft }} days</span></li>
            <li>$MDC in your Wallet: <span class="spanRightAlign">{{ mcrewWallet }} </span> $MDC</li>
            <li>1$USD: <span class="spanRightAlign">{{ (this.perUSD ) }} </span> $MDC</li>
          </ul>
        </div>
      </div>
      <div class="container-box">
        <div class="container-child-box">
          <div class="box-title">
            <h3 class="h3-text-style">Take Action</h3>
            <!-- <img src="./../assets/images/title/take-action.png"> -->
          </div>
          <div class="box-content">
            <div class="take-action-box">
              <a href="https://www.dextools.io/app/en/bnb/pair-explorer/0xf78c3df05da24cc4a53245d77c34c215d630f314" target="_blank">
                <span class="takeAction-btn box01">
                  <img src="./../assets/images/icon/chart.png">
                  Dextools Chart
                </span>
                <!-- <img src="./../assets/images/btn/tools-chart.png"> -->
              </a>
              <a href="https://pancakeswap.finance/swap?outputCurrency=0xbb2889B9B27B91358dD7c12325263c83D4a6e0A6&inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56" target="_blank">
                <span class="takeAction-btn box02">
                  <img src="./../assets/images/icon/pancake.png">
                  Buy $MDC
                </span>
                <!-- <img src="./../assets/images/btn/buy-mcrew.png"> -->
              </a>
            </div>
          </div>
        </div>
        <div class="container-child-box bottom-child-box">
          <div class="box-title">
            <h3 class="h3-text-style">Referral</h3>
            <!-- <img src="./../assets/images/title/Referral.png"> -->
          </div>
          <div class="box-content">
            <div class="referral-box">
              <h2>Referral Link</h2>
              <p>You get a bonus whenever someone uses your referral link to hire new dancers or coaches. The bonus is 5% of the MDC total amount they spend for the hiring.</p>
              <div class="referral-container">
                <div class="referral-link-box">
                  <img src="./../assets/images/input/input.png">
                  <input class="referral-link-copy" v-on:focus="$event.target.select()"  ref="referralLink" readonly :value="referralLink">
                </div>
                <a class="copy-btn" @click="copyreferralLink()">
                  <span v-if="copyConfirm === false" class="small-btn">
                    Copy
                  </span>
                  <span v-else class="small-btn">
                    Copied
                  </span>
                </a>
              </div>
              <p class="tips-purple-bottom">You are eligible for the dancer & coach referral bonus only if you hold some dancers & coaches in your wallet.</p>
              <h2 class="yourRewards-box">Your referral rewards</h2>
              <div class="referral-container">
                <div class="claim-box">
                  <img src="./../assets/images/input/input.png">
                  <p>{{ bonusReferrer }}<span>USD</span>=({{ bonusReferrerMDC }}<span>$MDC</span>)</p>
                </div>
                <span v-if="canClaimNow === false || bonusReferrer <= 0" class="small-btn claim-btn cursor-pointer" style="background-color: grey;">
                  Claim
                </span>
                <span v-if="canClaimNow === true && bonusReferrer > 0" class="small-btn claim-btn cursor-pointer" @click="claimReferralBonus()">
                  Claim
                </span>
              </div>
              <p style="margin-top: 10px;">Claim Countdown:
                <span>{{ countDay }} d : </span>
                <span>{{ countHour }} h : </span>
                <span>{{ countMin }} m : </span>
                <span>{{ countSec }} s</span>
              </p>
              <p class="tips-purple-bottom">You can claim your referral bonus 7 days after your referral link was used.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalClaimTaxNotifications ref="modalClaimTax"/>
    <ModalLoadingClaimReferral ref="ModalLoadingClaimReferral"/>
  </div>
</template>

<script>
import Web3 from 'web3';
import ModalClaimTaxNotifications from './../components/Modal/ModalClaimTaxNotification.vue'
import ModalLoadingClaimReferral from './../components/Modal/Loading/ModalLoadingClaimReferral.vue'
import Header from './../components/Header.vue'
import Sidebar from './../components/Sidebar.vue'
// import ModalLoading from './../components/Modal/ModalLoading.vue'

// eslint-disable-next-line no-unused-vars
import { onBeforeMount, onErrorCaptured, onMounted, onUnmounted, onBeforeUpdate, onUpdated, onBeforeUnmount, reactive, toRefs} from 'vue'

export default {
  name: 'DashboardPage',
  setup() {
    // eslint-disable-next-line no-unused-vars
    const timerBattle = null

    onMounted(() => {
    })

    onBeforeUnmount(() => {
      clearInterval(timerBattle);
    })

    return {
      timerBattle
    }
  },


  props: {
  },
  components: {
    Header,
    Sidebar,
    ModalClaimTaxNotifications,
    ModalLoadingClaimReferral
  },
  inject: {
    Display: {
      from: 'Display'
    },
    Wallet: {
      from: 'Wallet'
    }
  },
  data() {
    return {
      walletAddress: '',
      referralAddress: '',
      dancer: null,
      coach: null,
      crew: null,
      availableCrew: null,
      battleCountdown: '00h 00m 00s',
      dpHighest: null,
      unclaimedMDC: null,
      afterTax: null,
      taxDaysLeft: null,
      mcrewWallet: null,
      perMDC: null,
      perUSD: null,
      bonusReferrer: null,
      bonusReferrerMDC: null,

      referralLink: '',
      copyConfirm: false,
      countDay: '0',
      countHour: '0',
      countMin: '0',
      countSec: '0',
      canClaimNow: false,
    }
  },
  mounted() {
    // Get Referral Link
    if(this.$route.query.ref !== undefined && this.$route.query.ref !== null && this.$route.query.ref !== '') {
      localStorage.setItem('mintdancingdapp_linkRef', this.$route.query.ref);
    } else {
      localStorage.clear();
    }
    this.inventoryInfo();
    this.dateBonusClaim();
  },
  methods: {
    toggleBurgerMenu() {
      this.$refs.sideBarMobileToggle.toggleBurgerMenu();
    },

    copyreferralLink() {
      this.$refs.referralLink.focus();
      document.execCommand('copy');
      this.copyConfirm = true;
    },

    async inventoryInfo() {
      // Get Wallet Address
      const web3 = new Web3(window.ethereum);
      await web3.eth.getAccounts().then(res => {
        // console.log(res[0]);
        this.walletAddress = res[0];
      });

      this.referralLink = 'https://bsc-metadancingcrew.web.app/#/' + '?ref=' + this.walletAddress;
      // this.referralLink = 'https://maqidoknow.com/#/'+ '?ref=' + this.walletAddress;
      // this.referralLink = 'https://testnet-metadancingcrew.web.app/#/?ref=' + this.walletAddress;
      // console.log(this.walletAddress);
      var value = await this.Wallet().checkBalanceMDC();
      this.mcrewWallet = parseFloat(value).toFixed(2);

      this.dancer = await this.Display().balanceOfDancer(this.walletAddress);
      this.coach = await this.Display().balanceOfCoach(this.walletAddress);
      this.crew = await this.Display().balanceOfCrew(this.walletAddress);
      // var balance = await this.Display().balanceOf(this.walletAddress);
      // console.log(balance);
      this.dpHighest = await this.Display().getMaxBattlePower(this.walletAddress);
      this.unclaimedMDC = parseFloat(await this.Wallet().getUnclaimed(this.walletAddress)).toFixed(2);
      // this.getNextBattleTime = await this.Display().getNextBattleTime(this.crewId);
      this.availableCrew = await this.Display().getAvailableCrewsCount(this.walletAddress);
      this.afterTax = await this.Display().RewardAfterTax(this.walletAddress);
      this.taxDaysLeft = await this.Display().getTaxLeftDays(this.walletAddress);
      this.perMDC = await this.Display().getUSDAmountFromMDC(10000);
      this.perUSD = await this.Display().getMDCAmountFromUSD(1);
      this.checkBalance();
      this.bonusReferrer = parseFloat(await this.Display().viewBonusReferrer(this.walletAddress)).toFixed(2);
      // console.log(this.bonusReferrer);
      // this.bonusReferrerMDC = await this.Display().getMDCAmountFromUSD(1);
      this.bonusReferrerMDC = parseFloat(this.bonusReferrer * (this.perUSD )).toFixed(2);
    },

    claimTaxNotifications() {
      this.$refs.modalClaimTax.showModal();
    },

    async checkBalance() {
      const web3 = new Web3(window.ethereum);
      web3.eth.getAccounts().then(async res => {
        this.walletAddress = res[0];
      });
    },

    async claimReferralBonus(){
      // console.log(this.bonusReferrerMDC);
      if (this.bonusReferrer > 0) {
        this.$refs.ModalLoadingClaimReferral.showModal();


        const res = await this.Display().claimRefferalBonus(this.walletAddress);
        if ( res === true){
          this.bonusReferrer = parseFloat(await this.Display().viewBonusReferrer(this.walletAddress)).toFixed(2);
          this.bonusReferrerMDC = parseFloat(this.bonusReferrer * (this.perUSD )).toFixed(2);
          this.$refs.headerBar.collectReward();
        } else {
          this.$refs.ModalLoadingClaimReferral.hideModal();
        }
        this.$refs.ModalLoadingClaimReferral.hideModal();
      } else {
        alert('No rewards can be claimed.')
      }
    },
    getTimestamp(dateClaim) {
    var _this = this;
    if(this.canClaimNow == false) {
      // const date = new Date();
      // this.daysAfterSeven= date.setDate(date.getDate() + 7);

      this.timerBattle = setInterval(function() {
        var timeNow = Date.now();
        var timeClaim = new Date(dateClaim * 1000);
        var timeClaimTimestamp = timeClaim.getTime();

        // console.log(timeClaimTimestamp);
        var distance = timeClaimTimestamp - timeNow;
        // console.log(distance);
        _this.countDay = Math.floor((distance / 1000) / 86400);
        _this.countHour = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        _this.countMin = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        _this.countSec = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
          clearInterval(this.timerBattle);
          _this.countDay = 0;
          _this.countHour = 0;
          _this.countMin = 0;
          _this.countSec = 0;
          _this.canClaimNow = true;
        }
      }, 1000);
    } else {
      clearInterval(this.timerBattle);
      }
    },

    async dateBonusClaim(){
      const web3 = new Web3(window.ethereum);
      await web3.eth.getAccounts().then(res => {
        this.walletAddress = res[0];
      });

       await this.Display().dateBonusClaim(this.walletAddress).then(res => {
        // console.log(res);
        this.getTimestamp(res);
      })
    },

    onBeforeUnmount() {
      clearInterval(this.timerBattle);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .dancer-invi-box {
    min-height: 100px;
  }

  .dancer-container {
    width: 80%;
    display: flex;
    margin: 0px auto 0 auto;
    justify-content: space-around;
  }

  .container-box {
    width: 50%;
    margin: 0 10px;
  }

  .box-title {
    padding: 10px 0;
    background: rgba(130,45,86, 0.2);
  }

  .box-content {
    padding: 10px;
    background: rgba(49,40,107, .5);
  }

  .box-content ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .box-content li {
    color: #ffffff;
    text-align: left;
    line-height: 2.5;
    display: flex;
  }

  .box-content li span {
    color: #59D8FD;
    margin: 0 0 0 5px;
  }

  .box-content li span.spanRightAlign {
    margin: 0 10px 0 auto;
    text-align: right;
  }
  
  .take-action-box {
    display: flex;
    margin: 15px 0;
    justify-content: space-around;
    align-items: center;
    -webkit-text-fill-color: #fff;
  }

  .bottom-child-box {
    margin-top: 15px;
  }

  .referral-box {
    padding: 0 15px;
  }

  .referral-box h2 {
    color: #ffffff;
    text-align: left;
    font-size: 1.5rem;
  }

  .referral-box p {
    color: #ffffff;
    text-align: left;
    font-size: .6em;
  }

  .referral-container {
    display: flex;
    justify-content: space-between;
  }

  .referral-link-box {
    position: relative;
    overflow: hidden;
  }

  .referral-link-box img{
    width: 100%;
    height: 100%;
    position: relative;
  }

  .referral-link-copy {
    position: absolute;
    z-index: 1;
    text-align: left;
    font-size: .5em;
    color: #59D8FD;
    top: 20%;
    left: 5%;
    overflow: hidden;
    width: 90%;
    white-space: pre;
    background: none;
    outline: none;
    border: none;
  }

  .claim-box {
    position: relative;
    overflow: hidden;
  }

  .claim-box img {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .claim-box p {
    position: absolute;
    z-index: 1;
    text-align: left;
    font-size: .6em;
    color: #59D8FD;
    top: 20%;
    left: 50%;
    overflow: hidden;
    transform: translate(-50%, 0);
    white-space: pre;
    background: none;
    outline: none;
    border: none;
  }

  .claim-box span {
    color: #ffffff;
  }

  p.tips-purple-bottom {
    font-size: 0.6rem;
    color: #D884FF;
    margin-top: 10px
  }

  .copy-btn {
    margin-left: 15px;
    -webkit-text-fill-color: #fff;
  }

  .claim-btn {
    margin-left : 15px;
    -webkit-text-fill-color: #fff;
  }

  .yourRewards-box {
    margin-top: 25px;
  }

  @media (max-width: 960px) {
    .takeAction-btn {
      font-size: 10px;
    }

    .claim-box img {
      width: 90%;
      height: 100%;
    }
    
    .container-box {
      width: 90%;
      margin: 0 auto 25px auto;
    }
    .dancer-container {
      display: block;
      width: 100%;
    }
  }
</style>
