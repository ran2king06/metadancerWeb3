<template>
  <Header ref="headerBar" @toggle-menu="toggleBurgerMenu()"/>
  <Sidebar ref="sideBarMobileToggle"/>
  <iframe 
    v-if="battleAnimation === true"
    name="battleLoad"
    id="unity-infame" 
    ref="iframeDom" 
    :src="battleFrameData" 
    frameborder="0" 
    scrolling="no"
    style="position: fixed;left: 0px;top: 0px;width: 100vw;height: 100vh;z-index: 9;">
  </iframe>
  <div>
    <div class="battle-invi-box pc-only"></div>
    <div class="battle-container">
      <!-- Did not have Battle Crew -->
      <div v-if="haveBattleCrew === false">
        <h3 class="title-battle">You need to create a crew to start battling!</h3>
        <div class="create-battle-btn">
          <router-link :to="{ path: '/CreateCrew', query: { ref: paramsRef }}">
            <img src="./../../assets/images/btn/create-crew-battle.png" alt="">
          </router-link>
        </div>
      </div>
      <!-- Have Battle Crew-->
      <div v-if="haveBattleCrew === true" class="battle-crew-wrapper">
        <div class="battle-crew-container">
          <div>
            <div class="dropdown">
              <select class="form-select" aria-label="Select battle crew" @change="selectCrew($event)">
                <option selected value="none">Select battle crew</option>
                <option v-for="(crew, index) in crewList" :key="index" :value="index">{{ crew.name }}</option>
              </select>
              <img class="select-arrow" src="./../../assets/images/icon/polygon.png" alt="">
            </div>
          </div>
          <span class="dp-box cursor-pointer" @click="goToDP( parseInt(parseInt(crewDP) / 10000) )">
            {{ parseInt(parseInt(crewDP) / 100) }} DP</span>
          <div class="dancersCoach-box">
            <div class="dc-box">Dancers: <span>{{ totalDancers }}</span></div>
            <div class="dc-box">Coach: <span>{{ totalCoaches }}</span></div>
          </div>
          <div class="dancersCoach-box" >
            <div class="time-box cursor-pointer" v-if="choosingDate == true" @click="modalBattleBuyEnergyDrink()" style="color: #33FF00;" :style="[ drinkEnergy == 0 ? { 'color' : '#d33d3d' } : { 'color': '#0be74f' }]">
              {{ drinkEnergy }} Drinks
            </div>
            <!-- {{ lastBattleTime }} -->
            <div class="time-box" v-if="choosingDate == true && (canBattle == 1 || canBattle == 3)">0 : 0 : 0</div>
            <div class="time-box" v-if="choosingDate == true && (canBattle == 2)">{{ lbhour }} : {{ lbmin }} : {{ lbsec }}</div>
          </div> 
          <!-- Mass Button -->
          <div class="dc-crew-box cursor-pointer btn-style-custom">
            <span v-if="allTeamCanBattle === true && this.crewList.length <= 10" @click="confirmMassBattle()" class="btnCustom-yellow-battle">Mass Battle</span>
            <span v-if="allTeamCanBattle === false || this.crewList.length > 10" class="btnCustom-grey-battle">Mass Battle</span>
            <!-- <img src="./../../assets/images/btn/mass-battle.png" alt=""> -->
          </div>
          <!-- Battle History Button -->
          <div class="dc-crew-box cursor-pointer btn-style-custom">
            <router-link :to="{ path: '/BattleHistory', query: { ref: paramsRef }}">
              <span class="btnCustom-grey-battle">Battle History</span>
              <!-- <img src="./../../assets/images/btn/battle-history.png" alt=""> -->
            </router-link>
          </div>
          <div class="battle-crew-checkbox">
            <input type="checkbox" id="checkBoxShowAnimation" name="showAnimation" v-model="showAnimation" class="cursor-pointer">
            <label for="checkBoxShowAnimation" class="cursor-pointer"></label>
            <span class="custom-checkbox">Show battle animation</span>
          </div>
        </div>
      </div>
      <div class="container-box">
        <!-- battle Card -->
        <div class="battle-card-wrapper">
          <div class="battle-card-container">
            <div v-for="(battle, index) in battleCardData" :key="index" :ref="'battle'+ index" class="battle-card-box">
              <div class="battle-card-inner-box">
                <div class="bg-img" :style="'background-image: url('+ require(`./../../assets/images/card/Enemy/` + battleCrew(index))"></div>
                <!-- <div class="bg-img" :style="'background-image: url('+ require(`./../../assets/images/battle/${battle.image}`) +')'"></div> -->
                <img class="box-mask" src="./../../assets/images/box-mask.png" alt="">
                <div class="corner-center-top">
                  <h5 class="battle-team-name">#{{ index + 1 }} {{ battle.name }}</h5>
                  <div class="center-box">
                    <h6>
                      Min DP<br>
                      {{ parseInt(battle.dancing_power) / 100 }}
                    </h6>
                    <div class="custom-sideline"></div>
                    <h6>
                      Base %<br>
                      {{ battle.percent }}
                    </h6>
                    <div class="custom-sideline"></div>
                    <h6>
                      Bonus %<br>
                      {{ bonusPercentCal(index) }}</h6>
                  </div>
                </div>
                <div class="corner-left-bottom">
                  <h6 class="winRate">{{ only88(parseInt(battle.percent), index) }} % to Win</h6>
                </div>
                <div class="corner-right-bottom">
                  <div>
                  <!-- <div @click="modalBattling()" class="cursor-pointer"> -->
                  <!-- <div @click="modalBattleResult()" class="cursor-pointer"> -->
                    <div v-if="crewDP >= parseInt(battle.dancing_power) && drinkEnergy > 0 && canBattle == 1"  class="btn-style-custom nomargin cursor-pointer" @click="battleStart(index)">
                      <span class="btnCustom-yellow-battle">Battle</span>
                    </div>
                    <div v-else class="btn-style-custom nomargin">
                      <span class="btnCustom-grey-battle">Battle</span>
                    </div>
                    <!-- <img class="battle-btn star-rate" src="./../../assets/images/btn/battle-mini.png"> -->
                  </div>
                </div>
                <h5 class="battle-price-detail">
                  <div class="battle-mdc-text">{{ parseInt(battle.reward / 10000) }} $USD</div>
                  <span>({{ ((battle.reward  * perMDC) / 10000).toFixed(2)  }}) MDC</span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalMassBattleConfirm ref="modalMassBattleConfirm" @confirm-massbattle="modalMassBattle()" />
  <ModalMassBattle ref="modalMassBattle" @collect-reward="collectReward()" />
  <ModalWaitingApproval ref="modalWaitingApproval"/>
  <ModalBattling ref="modalBattling"/>
  <ModalBattleResult ref="modalBattleResult" @collect-reward="collectReward()" />
  <!-- <ModalLoading ref="modalLoading"/> -->
  <ModalBattleBuyEnergyDrink ref="modalBattleBuyEnergyDrink" @buydrink-ok="buyDrinkOK"/>

  <ModalLoadingBattleMass ref="ModalLoadingBattleMass"/>
</template>

<script>
import Web3 from 'web3';
import Header from './../../components/Header.vue'
import Sidebar from './../../components/Sidebar.vue'
import ModalLoadingBattleMass from './../../components/Modal/Loading/ModalLoadingBattleMass.vue'
import ModalMassBattle from './../../components/Modal/ModalMassBattle.vue'
import ModalWaitingApproval from './../../components/Modal/ModalWaitingApproval.vue'
import ModalBattling from './../../components/Modal/ModalBattling.vue'
import ModalBattleResult from './../../components/Modal/ModalBattleResult.vue'
import ModalBattleBuyEnergyDrink from './../../components/Modal/ModalBattleBuyEnergyDrink.vue'
import ModalMassBattleConfirm from './../../components/Modal/ModalMassBattleConfirm.vue'
// eslint-disable-next-line no-unused-vars
import { onBeforeMount, onErrorCaptured, onMounted, onUnmounted, onBeforeUpdate, onUpdated, onBeforeUnmount, reactive, toRefs} from 'vue'

export default {
  name: 'BattlePage',
  
  setup() {
    // eslint-disable-next-line no-unused-vars
    const showAnimation = false;
    const countDown = 10

    onMounted(() => {
      window.addEventListener("resize", myEventHandler);
    })

    onBeforeUnmount(() => {
      window.removeEventListener("resize", myEventHandler);
      clearInterval(countDown);
    })

    // eslint-disable-next-line no-unused-vars
    const myEventHandler = (e) => {
      // console.log(e.target.innerWidth)
    }

    return {
      showAnimation,
      countDown
    }
  },

  components: {
    Header,
    Sidebar,
    ModalMassBattle,
    ModalWaitingApproval,
    ModalBattling,
    ModalBattleResult,
    ModalBattleBuyEnergyDrink,
    ModalMassBattleConfirm,
    ModalLoadingBattleMass,
  },

  inject: {
    Display: {
      from: 'Display'
    },
    Battle: {
      from: 'Battle'
    }
  },

  data() {
    return {
      walletAddress: '',
      haveBattleCrew: null,
      // showAnimation: false,
      battleAnimation: false,
      lastBattleTime: 0,
      totalDancers: 0,
      totalCoaches: 0,
      drinkEnergy: 0,
      dancers: [],
      dancersName: [],
      crewDP: 0,
      crewID: null,
      battleCardData: [],
      crewList: [],
      // countDown: 10,
      battleResultInfo: null,
      lbhour: undefined,
      lbmin: undefined,
      lbsec: undefined,
      timerBattle: 0,
      choosingDate: false,
      canBattle: 0,
      perUSD: 0,
      crewChoosing: 0,
      perMDC: 0,
      battleID: 0,
      paramsRef: '',
      allTeamCanBattle: false,
      availableCrewCanBattle: 0
    }
  },

  mounted() {
    var _this = this;

    this.$refs.sideBarMobileToggle.activeClass('pbattle');
    this.paramsRef = this.$route.query.ref;
    this.mdcToUsd();
    this.getUSD();
    this.displayEnemy();
    this.getCrewInfo();
    this.getCrewCanBattle();

    window.onmessage = function(e) { // inside the parent
      if (e.data == 'Game Load Done') {
        _this.afterWEBGLLoadDone();
      }
    };
  },

  methods: {
    toggleBurgerMenu() {
      this.$refs.sideBarMobileToggle.toggleBurgerMenu();
    },

    checkbattleDetail(index, check) {
      this.battleCardData[index].check = check;
    },

    changeCharacterDetail(index, c) {
      this.battleCardData[index].checkbattle = c;
    },

    modalBattling() {
      this.$refs.modalBattling.showModal();
    },

    modalBattleBuyEnergyDrink() {
      if(this.choosingDate === true) {
        this.$refs.modalBattleBuyEnergyDrink.showModal(this.walletAddress, this.crewID, this.totalDancers);
      }
    },

    async getCrewCanBattle() {
      // Get Wallet Address
      const web3 = new Web3(window.ethereum);
      await web3.eth.getAccounts().then(res => {
        this.walletAddress = res[0];
      });

      // console.log(this.walletAddress);
      this.availableCrewCanBattle = await this.Display().getAvailableCrewsCount(this.walletAddress);
    },

    async getUSD() {
      this.perMDC = await this.Display().getMDCAmountFromUSD(1);
      // console.log(this.perMDC);
    },

    async buyDrinkOK(){
      this.crewList = await this.Display().displayCrew(this.walletAddress);
      this.drinkEnergy = this.crewList[this.crewChoosing].supply;
      this.canBattle = this.crewList[this.crewChoosing].canBattle;
      this.getCrewInfo();
      this.getTimestamp();
      this.getCrewCanBattle();
      this.$refs.headerBar.collectReward();
    },

    confirmMassBattle() {
      this.$refs.modalMassBattleConfirm.showModal();
    },

    async modalMassBattle() {  
      // const web3 = new Web3(window.ethereum);
      this.$refs.ModalLoadingBattleMass.showModal();
      const res = await this.Battle().massBattle(this.walletAddress);

      // console.log(res);
      if(res.success === true) {
        var modalBattleList = [];
        if(Array.isArray(res.list.events.Danced)){
          for (let i = 0; i < res.list.events.Danced.length ; i++){
            var battle = {
              address: res.list.events.Danced[i].returnValues['0'],
              name: res.list.events.Danced[i].returnValues['1'],
              crewId: res.list.events.Danced[i].returnValues['2'],
              battleId: res.list.events.Danced[i].returnValues['3'],
              roll: res.list.events.Danced[i].returnValues['4'],
              percent: res.list.events.Danced[i].returnValues['5'],
              success: res.list.events.Danced[i].returnValues['6'],
              reward: res.list.events.Danced[i].returnValues['7']
            }
            // console.log(battle);
            modalBattleList.push(battle);
          }
        } else {
          battle = {
            address: res.list.events.Danced.returnValues['0'],
            name: res.list.events.Danced.returnValues['1'],
            crewId: res.list.events.Danced.returnValues['2'],
            battleId: res.list.events.Danced.returnValues['3'],
            roll: res.list.events.Danced.returnValues['4'],
            percent: res.list.events.Danced.returnValues['5'],
            success: res.list.events.Danced.returnValues['6'],
            reward:res.list.events.Danced.returnValues['7']
          }

          modalBattleList = battle;
        }
        // modalBattleList = battleSingle;
        // console.log(modalBattleList);

        this.$refs.ModalLoadingBattleMass.hideModal();
        this.$refs.modalMassBattle.showModal(modalBattleList);
        this.allTeamCanBattle = false;
      } else {
        this.$refs.ModalLoadingBattleMass.hideModal();
      }
    },

    async mdcToUsd() {
      this.perUSD = await this.Display().getMDCAmountFromUSD(1);
    },

    bonusPercentCal(index) {
      let bonus;
      if (this.crewDP < 0) {
        bonus = 0;
      } else {
        bonus = parseInt((parseInt(this.crewDP/100 - parseInt(index * 100) - 100))/100) * 2;
      }
       
      if(bonus < 0) {
          bonus = 0;
      }
      return bonus;
    },

    async selectCrew(event) {
      // console.log(event.target.value);
      if (event.target.value === 'none') {
        this.choosingDate = false;
        this.crewDP = 0;
        this.totalDancers = 0;
        this.totalCoaches = 0;
      }
      // console.log(this.crewList);
      if (event.target.value !== undefined && event.target.value !== 'none') {
        this.crewChoosing = event.target.value;
        this.choosingDate = true;
        this.crewDP = this.crewList[event.target.value].dp;
        this.totalDancers = this.crewList[event.target.value].dancersCount;
        this.totalCoaches = this.crewList[event.target.value].coachesCount;
        this.crewID = this.crewList[event.target.value].tokenID;
        this.drinkEnergy = this.crewList[event.target.value].supply;
        this.lastBattleTime = this.crewList[event.target.value].lastBattleTime;
        this.dancers = this.crewList[event.target.value].dancersId;
        this.coaches = this.crewList[event.target.value].coachesId;
        this.canBattle = this.crewList[event.target.value].canBattle;
      }
      // console.log(this.canBattle);
      this.checkCrewDetail();

      this.getTimestamp();
    },

    battleCrew(index) {
      return 'lv' + (parseInt(index) + 1) +'.png';
    },

    // Display Smart Contract Dancer Character
    async displayEnemy() {
      // Get Wallet Address
      const web3 = new Web3(window.ethereum);
      await web3.eth.getAccounts().then(res => {
        this.walletAddress = res[0];
      });
      for (let i = 1; i <= 30; i++ ) {
        var enemy = await this.Battle().battleInfo(i);
        this.battleCardData.push(enemy);
      }
      // console.log(this.battleCardData);
    },

    // Display Smart Contract Crew Character
    async getCrewInfo() {
      // Get Wallet Address
      const web3 = new Web3(window.ethereum);
      await web3.eth.getAccounts().then(res => {
        this.walletAddress = res[0];
      });
      this.crewList = await this.Display().displayCrew(this.walletAddress);
      // console.log(this.crewList);
      if ( this.crewList.length > 0 ) {
        this.haveBattleCrew = true;

        for( let c = 0 ; c < this.crewList.length ; c++) {
          if(this.crewList[c].canBattle == 1 ) {
            this.allTeamCanBattle = true;
            break;
          }
        }
      } else {
        this.haveBattleCrew = false;
        this.allTeamCanBattle = false;
      }
    },

    // Show Details
    async checkCrewDetail() {
      this.dancersName = [];
      for ( let i = 0; i < this.dancers.length; i++){
        var crewDancers = await this.getDancerByTokenID(this.dancers[i]);
        this.dancersName.push(crewDancers);
      }
    },

    // Get Dancers
    async getDancerByTokenID(id) {
      var item = await this.Display().getDancers(id);
      return item[0];
    },


    // window.frames['battleLoad'].end(true);
    // 決鬥 ！
    async battleStart(battleID) {
      // console.log(battleID);
      this.battleID = battleID;
      
      if( this.crewID !== 'none' && this.crewID !== null && this.crewID !== '') {
        if (this.drinkEnergy > 0){
          this.$refs.modalWaitingApproval.showModal();
          this.battleFrameData = '/static/battle/index.html?battle=' + parseInt(battleID + 1)
          for( let i = 0 ; i < this.dancersName.length; i++ ) {
            this.battleFrameData = this.battleFrameData + '&crew=' + this.dancersName[i];
          }
          const randomRes = await this.Battle().battleRandom(this.walletAddress);
          if(randomRes === true) {
            // 如果不跳過就開啓
            if (this.showAnimation === true) {
              this.$refs.modalWaitingApproval.hideModal();
              this.battleAnimation = true;
            } else {
              const res = await this.Battle().battleStart(this.walletAddress, parseInt(this.crewID), battleID + 1);
              this.battleResultInfo = res;
              // console.log(this.battleResultInfo);
              if(res) {
                if(res.ok === true) {
                  // 有沒有打開Loading 都關掉
                  this.$refs.modalWaitingApproval.hideModal();
                  // 取得結果後來，WEBGL 執行結果 // 倒數約 5 秒再關閉webG
                  if (this.showAnimation === true) {
                    window.frames['battleLoad'].end(res.success);
                    this.whenAnimationStart();
                  } else {
                    this.$refs.modalBattleResult.showModal(this.battleResultInfo);
                  }
                }
              } else {
                this.battleAnimation = false;
                this.$refs.modalWaitingApproval.hideModal();
              }
            }
          } else {
            this.battleAnimation = false;
            this.$refs.modalWaitingApproval.hideModal();
          }
        } else {
          this.$refs.modalWaitingApproval.hideModal();
        }
      }
    },

    async afterWEBGLLoadDone() {
      const res = await this.Battle().battleStart(this.walletAddress, parseInt(this.crewID), this.battleID + 1);
      this.battleResultInfo = res;
      if(res) {
        if(res.ok === true) {
            // 有沒有打開Loading 都關掉
            this.$refs.modalWaitingApproval.hideModal();
            // 取得結果後來，WEBGL 執行結果 // 倒數約 5 秒再關閉webG
            if (this.showAnimation === true) {
              window.frames['battleLoad'].end(res.success);
              this.whenAnimationStart();
            } else {
              this.$refs.modalBattleResult.showModal(this.battleResultInfo);
            }
        } else {
          this.battleAnimation = false;
          this.$refs.modalWaitingApproval.hideModal();
        }
      } else {
        this.battleAnimation = false;
        this.$refs.modalWaitingApproval.hideModal();
      }
    },

    whenAnimationStart() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.whenAnimationStart()
        }, 1000)
      } else {
        this.battleAnimation = false;
        this.$refs.modalBattleResult.showModal(this.battleResultInfo);
        clearInterval(this.countDown);
      }
    },

    getTimestamp() {
      var _this = this;

      if(this.canBattle == 2) {
        this.timerBattle = setInterval(function() {
          var timeTarget = new Date();
          timeTarget.setDate(timeTarget.getDate() +1);
          timeTarget.setUTCHours(0,0,0,0);
          timeTarget.getTime();

          var timeNow = Date.now();
          var distance = timeTarget - timeNow;

          _this.lbhour = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          _this.lbmin = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          _this.lbsec = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
          clearInterval(this.timerBattle);
          this.canBattle = 1;
        }
        }, 1000);
      } else {
        clearInterval(this.timerBattle);
      }
    },

    goToDP(dp) {
      var element = this.$refs['battle' + dp];
      var top = element[0].offsetTop - 50;
      window.scrollTo({ top: top, left:0, behavior: "auto"})
    },

    only88(value, index) {
      let total = parseInt(this.bonusPercentCal(index)) + value;
      if(total > 88){
        return 88;
      } else {
        return total;
      }
    },

    async collectReward() {
      this.crewList = await this.Display().displayCrew(this.walletAddress);
      this.drinkEnergy = this.crewList[this.crewChoosing].supply;
      this.canBattle = this.crewList[this.crewChoosing].canBattle;
      this.getCrewInfo();
      this.canBattle = 2;
      this.getTimestamp();
      this.getCrewCanBattle();
      this.$refs.headerBar.collectReward();
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title-battle {
    text-align: center;
    margin-top: 15px;
    color: #ffffff;
  }

  .bg-img {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    padding-top: 85%;
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
    display: flex;
    border-radius: 50px;
    background-color: #392F76;
    margin: 15px auto 0 auto;
    width: 80%;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
  }

  .center-box h6 {
    font-size: .65em;
    margin: auto;
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
    grid-template-columns: repeat(auto-fill,minmax(360px, 1fr));
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .battle-card-box {
    position: relative;
    width: 100%;
    max-width: 400px;
    margin: auto;
    border-radius: 15px;
    overflow: hidden;
    display: inline-block;
    padding: 0px 10px;
  }

  .battle-card-inner-box {
    position: relative;
    width: 100%;
    margin: 0 auto 15px auto;
    padding-top: 100%;
    border-radius: 15px;
    display: flex;
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #150E3D;
  }

  .card-character {
    height: 80%;
    margin: auto;
  }

  .corner-center-top {
    position: absolute;
    left: 50%;
    top: 5%;
    transform: translate(-50%, 0);
    text-align: center;
    width: 100%;
  }

  .corner-center-top h5 {
    color: #ffffff;
    font-size: 1em;
    text-align: center;
    text-shadow: 0px 0px 0px #2c0f3b, 0 0 0em #040404, 0 0 0.2em black;
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
    font-size: .65em;
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
    padding: 15px 20px;
    align-items: center;
    color: #ffffff;
  }

  .battle-crew-container .form-select {
    background: #0C0920;
    color: #ffffff;
    width: 25%;
    min-width: 250px;
    font-size: 1.5em;
    padding: 10px 10px;
    text-align: left;
    border-radius: 10px;
    border: 1px solid #ffffff;
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

  @media (max-width: 960px) {
    .battle-crew-container {
      display: block;
    }

    .battle-crew-checkbox {
      display: flex;
      align-items: center;
      margin: 20px auto 10px auto;
      justify-content: center;
    }
    
    .battle-crew-container .form-select {
      width: 100%
    }

    .dp-box {
      display: block;
      margin: 15px 0 0 0;
    }

    .dancersCoach-box {
      display: inline-block;
      width: 50%;
    }

    .dancersCoach-box .time-box{
      text-align: left;
    }

    .dc-crew-box {
      margin: 20px 0;
      width: 50%;
      display: inline-block;
    }

    .battle-crew-checkbox[data-v-54b966da] {
      justify-content: center;
      margin: 15px 0 0 0;
    }
  }
</style>
