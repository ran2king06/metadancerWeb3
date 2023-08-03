<template>
  <Header ref="headerBar" @toggle-menu="toggleBurgerMenu()"/>
  <Sidebar ref="sideBarMobileToggle"/>
  <div>
    <div class="crew-invi-box pc-only"></div>
    <div class="crew-container">
      <h1>Crew</h1>
      <div class="container-box">
        <div class="crew-wrapper">
          <div class="crew-data-box">
            <router-link :to="{ path: '/CreateCrew', query: { ref: paramsRef }}" class="firstOrder">
              <div class="btn-style-custom cursor-pointer ex-btn">
                <div class="btnCustom-blue">Create Crew</div>
              </div>
              <!-- <img class="btncrew"  src="./../../assets/images/btn/create-crew.png"> -->
            </router-link>
            <span class="cardName-style">Available Dancers: <span class="bit-marg-left blue-color-text">{{ availableDancers }}</span></span>
            <span class="cardName-style">Available Coaches: <span class="bit-marg-left blue-color-text">{{ availableCoaches }}</span></span>
          </div>
          <div class="crew-data-box">
            <span class="cardName-style">Current Crews: <span class="bit-marg-left blue-color-text">{{ currentCrews }}</span></span>
            <span class="cardName-style">Total DP: <span class="bit-marg-left blue-color-text" style="font-size: 1.2em;">{{ parseInt(totalDP / 100) }}</span></span>
            <div class="cursor-pointer">
              <router-link :to="{ path: '/PlayBattle', query: { ref: paramsRef }}">
                <div class="btn-style-custom cursor-pointer ex-btn">
                  <div class="btnCustom-yellow">Battle</div>
                </div>
                <!-- <img class="btncrew" src="./../../assets/images/btn/battle.png"> -->
              </router-link>
            </div>
          </div>
          <div class="crew-data-box">
          
            <h4>Top 3 Crews</h4>
            <span v-for="(top, index) in topList.slice(0, 3)" v-show="topList.length > 0" :key="index">
              <span class="cardName-style">{{ top.name }}</span>
              <span class="bit-marg-left">{{ parseInt(top.dp / 100) }} DP</span>
            </span>
          </div>
        </div>
        <div class="choose-level-wrapper">
          <!-- Range Slider -->
          <div class="range-slider-container">
            <h5>Filter By DP-</h5>
            <vue-slider 
            ref="slider"
              v-model="rangeValue" 
              v-bind="rangeOptions"
              :enable-cross="false"></vue-slider>
              <div class="rangeValueConvert">
                <span>1</span>
                <span>2500+</span>
              </div>
          </div>
          <!-- Sort By DP- -->
          <div class="filter-main">
            <div class="filter-level-container">
              <h5>Sort By DP-</h5>
              <div class="pagintaion-level-custom">
                <div @click="filterByDP('low');" class="pag-box cursor-pointer" :class="{ 'active': dpLowHigh === 'low' }">
                  <span>Lowest</span>
                </div>
                <div @click="filterByDP('high');" class="pag-box cursor-pointer" :class="{ 'active': dpLowHigh === 'high' }">
                  <span>Highest</span>
                </div>
              </div>
            </div>
            <!-- Crew Status- -->
            <div class="filter-level-container">
              <h5>Crew Status-</h5>
              <div class="pagintaion-level-custom">
                <div @click="filterByStatus('all');" class="pag-box cursor-pointer" :class="{ 'active': statusFilter === 'all' }">
                  <span>All</span>
                </div>
                <div @click="filterByStatus('ready');" class="pag-box cursor-pointer" :class="{ 'active': statusFilter === 'ready' }">
                  <span>Ready</span>
                </div>
                <div @click="filterByStatus('cooling');" class="pag-box cursor-pointer" :class="{ 'active': statusFilter === 'cooling' }">
                  <span>Cooling</span>
                </div>
                <div @click="filterByStatus('exhausted');" class="pag-box cursor-pointer" :class="{ 'active': statusFilter === 'exhausted' }">
                  <span>Exhausted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Crew Card -->
        <div class="crew-card-wrapper">
          <div class="crew-card-container">
            <div v-for="(crew, index) in crewCardData" :key="index" v-show="
            parseInt(crew.dp /100) >= rangeValue[0] && ( parseInt(crew.dp / 100) <= rangeValue[1] || rangeValue[1] === 2500) &&
            (( statusFilter === 'all' ) || 
            ( statusFilter === 'ready' && crew.canBattle == 1) || 
            ( statusFilter === 'cooling' && crew.canBattle == 2) ||
            ( statusFilter === 'exhausted' && crew.supply == 0)
            )
            " class="crew-card-box">
              <!-- <img class="card-character" :src="require(`./../../assets/images/character/crew/${crew.image}`)"> -->
              <!-- <div v-if="crew.check === false" class="crew-card-inner-box" :style="'background-image: url('+ require(`./../../assets/images/character/crew/${crew.image}`) +')'"> -->
                <div v-if="crew.check === false" class="crew-card-inner-box" :style="'background-image: url('+ require(`./../../assets/images/card/Crew/` + crewImage(crew.tokenID))">

                <img class="box-mask" src="./../../assets/images/box-mask.png" alt="">
                <div class="corner-left-top">
                  <h5>{{ crew.name }}</h5>
                  <h6>#{{ crew.tokenID }}</h6>
                </div>
                <div @click="modalBattleBuyEnergyDrink(crew.tokenID, index)" class="corner-right-top cursor-pointer tooltip-custom">
                  <img class="power-rate" src="./../../assets/images/icon/crew-power.png">
                  <span class="supply">{{ crew.supply }}</span>
                  <span class="tooltiptext-custom" style="left: 55px;">Buy Energy Drinks</span>
                </div>
                <div class="corner-left-bottom">
                  <!-- sellItemToMarket( dancer.tokenID, 1) -->
                  <div v-if="crew.dp >= 10000" @click="listMarketModal( 'crew' , crew.tokenID)" class="cursor-pointer tooltip-custom">
                    <img class="star-rate" src="./../../assets/images/icon/trolley.png">
                    <span class="tooltiptext-custom">Sell</span>
                  </div>
                  <!-- UpdateCrew -->
                  <div class="cursor-pointer tooltip-custom" @click="updateCrewGroup(crew.tokenID);">
                    <img class="star-rate" src="./../../assets/images/icon/refresh.png">
                    <span class="tooltiptext-custom">Update Crew</span>
                  </div>
                </div>
                <div class="corner-right-bottom">
                  <div @click="checkCrewDetail(index, true)" class="cursor-pointer tooltip-custom">
                    <img class="star-rate" src="./../../assets/images/icon/magni.png">
                    <span class="tooltiptext-custom">Show Detail</span>
                  </div>
                </div>
                <h4 class="cardName-style">
                  {{ crew.member }}<br>
                  {{ parseInt(crew.dp / 100) }} DP 
                </h4>
              </div>
              <!-- Check Detail -->
              <div v-if="crew.check === true" class="crew-card-inner-box check-crew-detail">
                <div class="corner-left-top">
                  <h5>{{ crew.name }}</h5>
                  <div class="choose-character">
                    <div @click="changeCharacterDetail(index, 'dancer')" class="pag-box cursor-pointer detail-pag-box" :class="{ 'active': crew.checkCrew === 'dancer' }">
                      <span>Dancer</span>
                    </div>
                    <div @click="changeCharacterDetail(index, 'coach')" class="pag-box cursor-pointer detail-pag-box" :class="{ 'active': crew.checkCrew === 'coach' }">
                      <span>Coach</span>
                    </div>
                    <!-- <img @click="changeCharacterDetail(index, 'dancer')" class="cursor-pointer" src="./../../assets/images/btn/crew-dancer.png" alt="">
                    <img @click="changeCharacterDetail(index, 'coach')" class="cursor-pointer"  src="./../../assets/images/btn/crew-coach.png" alt=""> -->
                  </div>
                </div>
                <!-- crew -->
                <div v-if="crew.checkCrew === 'dancer'" class="coach-group-container">
                  <div  class="coach-group-members">
                    <div v-for="(crew, index) in crew.dancers" :key="index" class="member-box">
                      <div class="members-inner">
                        <span>{{ crew.name }}</span>
                        <span>#{{ crew.tokenID }}</span>
                      </div>
                      <div class="members-inner">
                        <span>{{ crew.dp }} DP</span>
                        <span class="crewRate">
                          <img v-for="(key, index) in crew.rate" :key="index" class="rate-star" src="./../../assets/images/icon/star-rate.png" alt="">
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Coach -->
                <div v-if="crew.checkCrew === 'coach'" class="coach-group-container">
                  <div  class="coach-group-members">
                    <div v-for="(coach, index) in crew.coaches" :key="index" class="member-box">
                      <div class="members-inner">
                        <span>{{ coach.name }}</span>
                        <span>#{{ coach.tokenID }}</span>
                      </div>
                      <div class="members-inner">
                        <span>{{ coach.capacity }}<img src="./../../assets/images/icon/coach-capacity.png" alt=""></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div @click="modalBattleBuyEnergyDrink(crew.tokenID, index)" class="corner-right-top cursor-pointer tooltip-custom">
                  <img class="power-rate" src="./../../assets/images/icon/crew-power.png">
                  <span>{{ crew.supply }}</span>
                  <span class="tooltiptext-custom">Buy Energy Drinks</span>
                </div>
                <div class="corner-right-bottom">
                  <div @click="checkCrewDetail(index, false)" class="cursor-pointer tooltip-custom">
                    <img class="star-rate" src="./../../assets/images/icon/magni-uncheck.png">
                    <span class="tooltiptext-custom">Close Detail</span>
                  </div>
                </div>
                <h4 class="cardName-style">
                  {{ crew.member }}<br>
                  {{ parseInt(crew.dp / 100) }} DP 
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalListOnMarketPlace ref="modalListOnMarketPlace" @refresh="revealCrews()"/>
  
  <ModalBattleBuyEnergyDrink ref="modalBattleBuyEnergyDrink" @buydrink-ok="buyDrinkOK"/>
</template>

<script>
import Web3 from 'web3';
import Header from './../../components/Header.vue'
import Sidebar from './../../components/Sidebar.vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

import ModalBattleBuyEnergyDrink from './../../components/Modal/ModalBattleBuyEnergyDrink.vue'
import ModalListOnMarketPlace from './../../components/Modal/ModalListOnMarketPlace.vue'
  
export default {
  name: 'CrewPage',
  props: {
  },
  inject: {
    Display: {
      from: 'Display'
    },
    MarketPlace: {
      from: 'MarketPlace'
    }
  },
  components: {
    Header,
    Sidebar,
    VueSlider,
    ModalBattleBuyEnergyDrink,
    ModalListOnMarketPlace,
  },

  data() {
    return {
      walletAddress: '',
      availablecrews: 0,
      availableDancers: 0,
      availableCoaches: 0,

      currentCrews: 0,
      totalDP: 0,

      topList: [],

      dpLowHigh: 'high',
      statusFilter: 'all',

      rangeValue: [1, 2500],
      rangeOptions: {
        dotSize: 16,
        width: 'auto',
        height: 2,
        contained: false,
        direction: 'ltr',
        data: null,
        dataLabel: 'label',
        dataValue: 'value',
        min: 1,
        max: 2500,
        interval: 1,
        disabled: false,
        clickable: true,
        duration: 0.5,
        adsorb: false,
        lazy: false,
        tooltip: 'active',
        tooltipPlacement: 'top',
        tooltipFormatter: void 0,
        useKeyboard: false,
        keydownHook: null,
        dragOnClick: false,
        enableCross: true,
        fixed: false,
        minRange: void 0,
        maxRange: void 0,
        order: true,
        marks: false,
        dotOptions: void 0,
        dotAttrs: void 0,
        process: true,
        dotStyle: void 0,
        railStyle: void 0,
        processStyle: void 0,
        tooltipStyle: void 0,
        stepStyle: void 0,
        stepActiveStyle: void 0,
        labelStyle: void 0,
        labelActiveStyle: void 0,
      },

      crewCardData: [],

      dancersTest: [],
      dancerNumber: 0,
      paramsRef: ''
    }
  },

  mounted() {
    this.rangeValue = [1, 2500];
    this.$refs.sideBarMobileToggle.activeClass('pcrew');
    this.topCrew();
    this.displayCrew();
    this.paramsRef = this.$route.query.ref;
  },
  methods: {
    toggleBurgerMenu() {
      this.$refs.sideBarMobileToggle.toggleBurgerMenu();
    },

    changeCharacterDetail(index, c) {
      this.crewCardData[index].checkCrew = c;
    },

    modalBattleBuyEnergyDrink(tokenID, index) {
      this.dancerNumber = this.crewCardData[index].dancersId.length;
      // console.log(this.dancerNumber);
      this.$refs.modalBattleBuyEnergyDrink.showModal(this.walletAddress, tokenID, this.dancerNumber);
    },

    listMarketModal( itemType, tokenId) {
      this.$refs.modalListOnMarketPlace.showModal(itemType, tokenId);
    },

    async buyDrinkOK(){
      this.rangeValue = [1, 2500];
      this.statusFilter = 'all';
      this.displayCrew();
      this.filterByDP('high');
      this.$refs.headerBar.collectReward();
    },

    filterByDP(lh) {
      this.dpLowHigh = lh;

      if(lh === 'low') {
        this.crewCardData.sort(function(a, b) {
            return a.dp - b.dp;
        });
      }

      if(lh === 'high') {
        this.crewCardData.sort(function(a, b) {
          return b.dp - a.dp;
        });
      }
    },

    filterByStatus(status) {
      this.statusFilter = status;
    },

    // Show Details
    async checkCrewDetail(index, check) {
      this.crewCardData[index].check = check;
      this.crewCardData[index].dancers = [];
      this.crewCardData[index].coaches = [];

      for ( let i = 0; i < this.crewCardData[index].dancersId.length; i++){
        var crewDancers = await this.getDancerByTokenID(this.crewCardData[index].dancersId[i]);
        this.crewCardData[index].dancers.push(crewDancers);
        // console.log(this.dancersTest);
      }

      for ( let c = 0; c < this.crewCardData[index].coachesId.length; c++){
        var crewCoaches = await this.getCoachByTokenID(this.crewCardData[index].coachesId[c]);
        this.crewCardData[index].coaches.push(crewCoaches);
        // console.log(this.dancersTest);
      }
    },

    async revealCrews() {
      // console.log("TEST");
      this.rangeValue = [1, 2500];
      this.statusFilter = 'all';
      // this.currentDancers = this.dancerCardData.length;
      this.topCrew();
      this.displayCrew();
      this.filterByDP('high');
    },

    // Display Smart Contract Crew Character
    async displayCrew() {
      // Get Wallet Address
      const web3 = new Web3(window.ethereum);
      await web3.eth.getAccounts().then(res => {
        this.walletAddress = res[0];
      });

      this.coachTotal();
      this.dancerTotal();

      var crewData = await this.Display().displayCrew(this.walletAddress);
      this.crewCardData = crewData;
      this.currentCrews = crewData.length;
      this.availablecrews = crewData.length;

      for (let i = 0 ; i < crewData.length ; i++) {
        this.totalDP += parseInt(crewData[i].dp);
      }
      this.filterByDP(this.dpLowHigh);
      // this.crewCardData.reverse();
    },

    //Top 3 Crew
    async topCrew() {
      this.topList = [];
      // Get Wallet Address
      const web3 = new Web3(window.ethereum);
      await web3.eth.getAccounts().then(res => {
        this.walletAddress = res[0];
      });
      var list = await this.Display().displayCrew(this.walletAddress);
      list.sort(function(a, b) {
        return b.dp - a.dp;
      });

      this.topList = list; //Top 3 Crew
    },

    async dancerTotal() {
      var dancer = await this.Display().displayDancer(this.walletAddress);
      this.availableDancers = dancer[0].length;
    },

    // Available Coaches:
    async coachTotal() {
      var coach = await this.Display().displayCoach(this.walletAddress);
      this.availableCoaches = coach[0].length;
    },

    // Get Dancers
    async getDancerByTokenID(id) {
      var item = await this.Display().getDancers(id);
      var dancers = {
        name: item[0],
        tokenID: id,
        dp: item[2]
      } 
      return dancers;
    },

    // Get Coach
    async getCoachByTokenID(id) {
      var item = await this.Display().getCoaches(id);
      var coaches = {
        name: item[0],
        tokenID: id,
        capacity: item[2]
      } 
      // console.log(coaches);
      return coaches;
    },

    // Update Crew
    async updateCrew(crewID, coachID, dancerID) {
      await this.Display().updateCrew(this.walletAddress, crewID, coachID, dancerID);
    },

    crewImage(id) {
      var v = id.toString();
      var d = v[v.length - 1];
      return 'Crew' + d +'.png'
    },

    // Sell Item to Market
    async sellItemToMarket(tokenID, price) {
      await this.MarketPlace().sellItem(this.walletAddress, 'crew', tokenID, price);
      this.displayCrew();
    },

    updateCrewGroup(crewID) {
      this.$router.push({ path: "/UpdateCrew", query: { crewid: crewID , ref: this.paramsRef } });
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .crew-invi-box {
    min-height: 50px;
  }

  .crew-container {
    width: 100%;
    padding: 0px 15px 0 15px;
    display: block;
    margin: 0 auto;
  }

  h1 {
    text-align: left;
    color: #ffffff;
    margin-bottom: 20px;
    padding-left: 35px;
  }

  img.box-mask {
    position: absolute;
    border-radius: 15px;
    z-index: 0;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  .crew-wrapper {
    display: flex;
  }

  .crew-data-box {
    margin: 0px 10px;
    padding: 15px 2.5vw;
    background: rgba(50,47,208, .4);
    width: 33%;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .firstOrder {
    order: 0;
  }

  .check-crew-detail {
    background: rgba(0,0,0,.5);
  }

  .crew-data-box span {
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    font-size: 1em;
  }

  .crew-data-box h4 {
    color: #ffffff;
  }

  span.bit-marg-left {
    margin-left: 15px;
    color: #59D8FD;
  }


  .crew-data-box img {
    display: block;
    margin: 10px auto;
  }

  .crew-data-box h5 {
    margin: 0;
    color: #59D8FD;
  }

  .crew-data-box .titlecrew {
    height: 1.5vw;
    max-height: 40px;
  }

  .crew-data-box .btncrew {
    height: 3vw;
    max-height: 60px;
    min-height: 30px;
  }

  .choose-level-wrapper {
    display: flex;
    margin: 0 auto 0 0;
  }

  .filter-level-container {
    margin: 35px 20px;
    display: inline-block;
  }

  .filter-level-container h5 {
    text-align: left;
    color: #ffffff;
    margin-bottom: 25px;
    font-size: 1em;
  }

  .pagintaion-level-custom {
    display: flex;
  }

  .range-slider-container {
    width: 100%;
    max-width: 300px;
    margin: 35px 25px;
  }

  .range-slider-container h5{
    text-align: left;
    color: #ffffff;
    margin-bottom: 25px;
    font-size: 1em;
  }

  .rangeValueConvert {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
    color: #ffffff;
  }

  .crew-card-wrapper {
    display: flex;
  }

  .crew-card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(360px, 1fr));
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .crew-card-box {
    position: relative;
    width: 100%;
    max-width: 400px;
    margin: auto;
    border-radius: 15px;
    display: inline-block;
    padding: 0px 10px;
  }

  .crew-card-inner-box {
    position: relative;
    width: 100%;
    margin: 0 auto 15px auto;
    padding-top: 100%;
    border-radius: 15px;
    display: flex;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .card-character {
    height: 80%;
    margin: auto;
  }

  .corner-left-top {
    position: absolute;
    left: 5%;
    top: 5%;
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
    min-width: 5px;
    max-width: 25px;
  }

  .crew-card-box h4 {
    color: #ffffff;
    font-size: 1.2em;
    text-align: center;
    position: absolute;
    transform: translate(-50%, 0);
    left: 50%;
    bottom: 2.5%;
  }

  .corner-left-top h5 {
    color: #ffffff;
    font-size: 1.2em;
    text-align: left;
    text-shadow: 0px 0px 0px #2c0f3b, 0 0 0em #040404, 0 0 0.2em black;
  }

  .corner-left-top h6 {
    color: #ffffff;
    font-size: .6em;
    text-align: left;
    text-shadow: 0px 0px 0px #2c0f3b, 0 0 0em #040404, 0 0 0.2em black;
  }

  .corner-left-bottom {
    position: absolute;
    left: 5%;
    bottom: 8.5%;
    display: flex;
    flex-direction: column;
  }

  .corner-left-bottom img{
    margin: 5px 0;
  }

  .corner-right-bottom {
    position: absolute;
    right: 5%;
    bottom: 8.5%;
  }

  .power-rate {
    margin-right: 10px;
  }

  .choose-character {
    margin-top: 15px;
    width: 40%;
    display: flex;
  }
  
  .choose-character img {
    width: 100%;
  }

  .coach-group-container {
    position: absolute;
    top: 30%;
    left: 5%;
    overflow: auto;
    height: 50%;
    width: 90%;
  }

  .coach-group-members {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    overflow: auto;
  }

  .member-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 48.5%;
    border: 1px solid #FF50E8;
    border-radius: 15px;
    margin: 5px 0px;
  }

  .members-inner {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 5px 10px;
  }

  .members-inner img {
    width: 15px;
    margin-left: 10px;
  }

  .coach-group-members span {
    font-size: .6em;
    color: #ffffff;
  }

  .crewRate {
    display: flex;
    align-items: center;
  }

  .memberPowerData {
    position: absolute;
    top: 15%;
    right: 5%;
    color: #ffffff;
  }

  img.rate-star {
    height: 10px;
    width: 10px;
    margin: 0 1.5px 0 0;
  }
  @media (min-width: 960px) {
    .range-slider-container {
      width: 30%;
    }
    .filter-main {
      display: flex;
      width: 70%;
    }

    .filter-main img{
      width: 100%;
    }
  }

  @media (max-width: 960px) {
    .crew-wrapper {
      flex-wrap: wrap;
      justify-content: center;
    }

    .crew-data-box:nth-child(1),
    .crew-data-box:nth-child(2) {
      width: 47%;
      margin: 1% 1.5%;
    }

    .crew-data-box:nth-child(3) {
      width: 100%;
      margin: 1% 1.5%;
    }

    .crew-card-container {
    }

    .crew-card-box {
      width: calc(100% - 10px);
      height: auto;
      max-width: 400px;
    }

    .range-slider-container {
      max-width: unset;
      margin: 5px auto;
    }

    .crew-card-box h4 {
      font-size: 1em;
    }

    .choose-level-wrapper {
      flex-wrap: wrap;
      width: 95%;
      margin: 15px auto;
    }

    .order-last {
      order: 0;
    }

    .firstOrder {
      order: 1;
    }

    .filter-level-container {
      margin: 10px 0 25px 0;
      display: block;
    }

    .filter-level-container img{
      width: 100%;
    }

    .filter-main {
      display: block;
      gap: 0 20px;
    }

    .range-slider-container h5 {
      font-size: 0.5em;
    }

    .filter-level-container h5 {
      font-size: 0.5em;
    }

    .crew-data-box:nth-child(1) span{
      flex-direction: column;
    }
    
    .crew-data-box:nth-child(2) span{
      flex-direction: column;
    }
  }
</style>
