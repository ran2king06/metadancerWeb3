<template>
  <Header @toggle-menu="toggleBurgerMenu()"/>
  <Sidebar ref="sideBarMobileToggle"/>
  <div>
    <div class="battle-invi-box pc-only"></div>
    <div class="battle-container">
      <!-- Did not have Battle Crew -->
      <!-- <h3 v-if="haveBattleCrew === true" class="title-battle">You need to create a crew to start battle!</h3>
      <div v-if="haveBattleCrew === true" class="create-battle-btn">
        <router-link to="/CreateCrew">
          <img src="./../../assets/images/btn/create-crew-battle.png" alt="">
        </router-link>
      </div> -->
      <!-- Have Battle Crew-->
      <div class="battle-crew-wrapper">
        <div class="battle-crew-container">
          <div class="history-title">
            <h2>Battle History</h2>
          </div>
          <div class="history-head-second">
            <span class="head-text">{{ rewardTotalMDC / 10000 }} $USD (= {{ parseFloat((rewardTotalMDC / 10000) * (perMDC)).toFixed(2) }} MDC) <span>Won</span> in Total</span>
            <div>
              <router-link :to="{ path: '/PlayBattle', query: { ref: paramsRef }}">
                <div class="btn-style-custom cursor-pointer ex-btn">
                  <div class="btnCustom-yellow">Battle</div>
                </div>
                <!-- <img class="btncrew" src="./../../assets/images/btn/battle.png"> -->
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="container-box">
        <!-- battle Card -->
        <div class="battle-card-wrapper">
          <div class="battle-card-container">
            <div v-for="(battle, index) in battleCardData" :key="index" class="battle-card-box">
              <div class="battle-card-inner-box" :style="[ battle.result === true ?  { 'background-color' : '#2A7B1C'} : { 'background-color' : '#900C19'} ]">
                <div class="bg-img" :style="'background-image: url('+ require(`./../../assets/images/card/Enemy/` + battleCrew(battle.battleID))"></div>
                <img class="box-mask" src="./../../assets/images/box-mask.png" alt="">
                <div class="corner-center-top">
                  <div class="center-box">
                    <h5 class="cardName-style">#{{ battle.crewId }}</h5>
                    <h5 class="cardName-style">{{ battle.name }}</h5>
                    <h6>{{ getDate(battle.battleTime) }} {{ getTime(battle.battleTime) }}</h6>
                  </div>
                </div>
                <div class="corner-center-bottom">
                  <div class="center-box">
                    <span v-if="battle.result === true" class="result-box-win">WON</span>
                    <span v-if="battle.result === false" class="result-box-lose">LOST</span>
                    
                    <h6>#{{ battle.battleID }} (Result:{{ battle.percentage }})</h6>
                    <h6 v-if="battle.result === true">
                      Earn +{{ (battle.reward / 10000) }} $USD 
                      <span><br>
                        (={{ parseFloat((battle.reward / 10000) * (perMDC)).toFixed(2) }}MDC)
                      </span>
                    </h6>
                    <h6 v-if="battle.result === false">
                      Earn 0 $USD 
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3';
import Header from './../../components/Header.vue'
import Sidebar from './../../components/Sidebar.vue'

export default {
  name: 'BattleHistory',
  props: {
  },
  components: {
    Header,
    Sidebar,
  },
  inject: {
    Battle: {
      from: 'Battle'
    },
    Display: {
      from: 'Display'
    }
  },
  data() {
    return {
      walletAddress: '',
      battleCardData: [],
      paramsRef: '',
      perMDC: null,
      lbhour: null,
      lbmin: null,
      lbsec: null,
      rewardTotalMDC: null
    }
  },

  mounted() {
    this.rangeValue = [0, 5000];
    this.paramsRef = this.$route.query.ref;
    this.battleHistory();
    this.getUSD();
  },
  methods: {
    toggleBurgerMenu() {
      this.$refs.sideBarMobileToggle.toggleBurgerMenu();
    },

    async battleHistory() {
      const web3 = new Web3(window.ethereum);
      await web3.eth.getAccounts().then(res => {
        this.walletAddress = res[0];
      });

      this.battleCardData = await this.Battle().getHistory(this.walletAddress);
      
      // console.log(this.battleCardData[0].reward);
      for (var i = 0 ; i < this.battleCardData.length ; i++){
        if(this.battleCardData[i].result === true) {
          this.rewardTotalMDC += parseFloat(this.battleCardData[i].reward);
          this.battleCardData[i].battleTime
        }
      } 
    },

    battleCrew(index) {
      return 'lv' + index +'.png';
    },

    async getUSD() {
      this.perMDC = await this.Display().getMDCAmountFromUSD(1);
      // console.log(this.perMDC);
    },

    getDate(t) {
      // console.log(parseInt(t));
      var date = new Date(parseInt(t) * 1000);
      // console.log(date);
      var year = date.getUTCFullYear();
      var month = date.getUTCMonth();
      var day = date.getUTCDate();

      return year + '/' + (month + 1) + '/' + day;
    },

    getTime(t) {
      // var timeNow = Date.now();
      var timeClaim = new Date(t * 1000);
      var newT = timeClaim.getTime();
      // console.log(newT);
      // console.log(Math.floor((newT % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      // console.log(Math.floor((newT % (1000 * 60 * 60)) / (1000 * 60)));
      // console.log(Math.floor((newT % (1000 * 60)) / 1000));

      return Math.floor((newT % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + ' : ' + 
      Math.floor((newT % (1000 * 60 * 60)) / (1000 * 60)) + ' : ' + 
      Math.floor((newT % (1000 * 60)) / 1000);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .history-title {
    display:flex;
    align-items: center;
  }

  .history-title h2 {
    text-align: left;
    color: #ffffff;
    margin: auto;
  }


  .bg-img {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    padding-top: 110%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .select-arrow {
    position: absolute;
    top: 50%;
    right: 5%;
    max-height: 10px;
    max-width: 15px;
    transform: translate(0, -50%);
  }

  .battle-invi-box {
    min-height: 50px;
  }

  .battle-container {
    width: 100%;
    padding: 0px 15px 0 15px;
    display: block;
    margin: 0 auto;
  }

  .create-battle-btn {
    margin: 35px auto 50px auto;
  }

  .create-battle-btn img{
    width: 90%;
    margin: 0 auto;
    max-width: 200px;
  }

  h1 {
    text-align: left;
    color: #ffffff;
    margin-bottom: 20px;
    padding-left: 35px;
  }

  img.box-mask {
    position: absolute;
    z-index: 0;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  .battle-wrapper {
    display: flex;
  }

  .battle-data-box {
    margin: 0px 10px;
    padding: 15px 2.5vw;
    background: rgba(50,47,208, .4);
    width: 33%;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .check-battle-detail {
    background: rgba(0,0,0,.5);
  }

  .battle-data-box span {
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    font-size: 1vw;
  }

  .battle-data-box h4 {
    color: #ffffff;
  }

  span.bit-marg-left {
    margin-left: 15px;
    color: #59D8FD;
  }

  .center-box {
    width: 100%;
  }

  .center-box h6 {
    font-size: .5em;
    margin: 7.5px auto;
    color: #fff;
  }

  .custom-sideline {
    border-right: 2px solid #000000;
    height: 25px;
    width: 2px;
  }

  .battle-data-box img {
    display: block;
    margin: 10px auto;
  }

  .battle-data-box h5 {
    margin: 0;
    color: #59D8FD;
  }

  .battle-data-box .titlebattle {
    height: 1.5vw;
    max-height: 40px;
  }

  .battle-data-box .btnbattle {
    height: 3vw;
    max-height: 60px;
  }

  .battle-card-wrapper {
    display: flex;
  }

  .battle-card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(250px, 1fr));
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .battle-card-box {
    position: relative;
    width: 100%;
    max-width: 250px;
    margin: 0 auto 25px auto;
    overflow: hidden;
    display: inline-block;
    padding: 0px 10px;
  }

  .battle-card-inner-box {
    position: relative;
    width: 100%;
    margin: 0 auto 0 auto;
    border-radius: 15px;
    padding-top: 150%;
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: rgba(0,0,0,.5);
  }
  .card-character {
    height: 80%;
    margin: auto;
  }

  .corner-center-top {
    position: absolute;
    left: 50%;
    top: 3%;
    transform: translate(-50%, 0);
    text-align: center;
    width: 100%;
  }

  .corner-center-top h5 {
    font-size: 1.1em;
  }

  .result-box-win {
    width: 95px;
    display: block;
    background: #2a7b1c;
    color: #fff;
    border-radius: 20px;
    margin: 0 auto;
  }

  .result-box-lose {
    width: 95px;
    display: block;
    background: #900C19;
    color: #fff;
    border-radius: 20px;
    margin: 0 auto;
  }

  .corner-right-top {
    position: absolute;
    right: 5%;
    top: 5%;
    display: flex;
    color: #ffffff;
  }

  .star-rate {
    margin: 0 1.5px;
  }

  .corner-right-top img{
    width: 1.5vw;
    min-width: 5px;
    max-width: 25px;
  }

  .battle-card-box .battle-price-detail {
    color: #ffffff;
    font-size: 1.2em;
    text-align: center;
    position: absolute;
    transform: translate(-50%, 0);
    left: 50%;
    bottom: 5%;
    margin: 0;
    font-size: .9em;
  }

  .battle-card-box .battle-price-detail span{
    color: #FF50E8;
    font-size: .8em;
    margin-top: 5px;
  }

  .corner-left-top h6 {
    color: #ffffff;
    font-size: .6em;
    text-align: left;
  }

  .corner-left-bottom {
    position: absolute;
    left: 5%;
    bottom: 5%;
    display: flex;
    flex-direction: column;
  }

  .corner-left-bottom img{
    margin: 5px 0;
  }

  .corner-right-bottom {
    position: absolute;
    right: 5%;
    bottom: 5%;
  }

  .power-rate {
    margin-right: 10px;
  }

  .battle-btn {
    max-width: 85px;
    min-width: 65px;
    width: 5vw;
  }

  .winRate {
    font-size: .5em;
    color: #ffffff;
    margin: 0;
  }

  .battle-mdc-text {
    margin-bottom: 5px;
  }
  
  .battle-crew-wrapper {
    max-width: 1200px;
    margin: 0 auto 35px auto;
    padding: 0 10px;
  }

  .battle-crew-container {
    display: flex;
    font-size: .6em;
    border-radius: 15px;
    background-color: #150E3D;
    width: 100%;
    justify-content: space-between;
    padding: 25px;
    align-items: center;
    color: #ffffff;
  }

  .battle-crew-container .form-select {
    background: #0C0920;
    color: #ffffff;
    width: 25%;
    min-width: 250px;
    font-size: 1.5em;
    text-align: left;
    border-radius: 10px;
    border: 1px solid #ffffff;
  }

  .history-head-second {
    display: flex;
    align-items: center;
  }

  .history-head-second .head-text {
    margin-right: 25px;
  }

  .dc-box {
    margin: 10px 0;
    text-align: left;
  }

  .dc-box span {
    color: #59D8FD;
  }

  .time-box {
    margin: 10px 0;
    text-align: center;
  }

  .dc-crew-box img{
    height: 100%;
    max-height: 45px;
  }

  .battle-crew-checkbox {
    display: flex;
    align-items: center;
  }

  .corner-center-top {
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
  }

  .corner-center-bottom {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
  }

  @media (max-width: 960px) {
    .battle-crew-container {
      display: block;
    }

    .corner-center-top h5 {
      font-size: 0.8em;
    }

    .battle-card-container {
      display: grid;
      grid-template-columns: repeat(auto-fill,minmax(50%, 1fr));
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
    }
  
    .battle-card-box {
      position: relative;
      width: 100%;
      max-width: 250px;
      margin: 0 auto 25px auto;
      overflow: hidden;
      display: inline-block;
      padding: 0px 10px;
    }
  }

</style>
