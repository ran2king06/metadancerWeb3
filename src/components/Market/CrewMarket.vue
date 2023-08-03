<template>
  <Header ref="headerBar" @toggle-menu="toggleBurgerMenu()"/>
  <Sidebar ref="sideBarMobileToggle"/>
  <div>
    <div class="dancer-invi-box pc-only"></div>
    <div class="dancer-container">
      <h1>Crew Market</h1>
      <div class="container-box">
        <div class="choose-level-wrapper">
          <!-- Range Slider -->
          <div  class="range-slider-container">
            <h5>Filter By DP-</h5>
            <div class="slider-container">
              <vue-slider 
              ref="slider"
                v-model="rangeValueSlider" 
                v-bind="rangeOptions"
                :enable-cross="false"></vue-slider>
                <div class="rangeValueSliderConvert">
                  <span>1</span>
                  <span>2500+</span>
                </div>
              </div>
          </div>
          <!-- Sort By DP- -->
          <div class="filter-level-container">
            <h5>Sort By DP-</h5>
            <div class="pagintaion-level-custom sort-slot">
              <div @click="filterByDP(1);" class="pag-box cursor-pointer" :class="{ 'active': dpLowHigh === 1 }">
                <span>Lowest DP</span>
              </div>
              <div @click="filterByDP(2);" class="pag-box cursor-pointer" :class="{ 'active': dpLowHigh === 2 }">
                <span>Highest DP</span>
              </div>
              <div @click="filterByDP(3);" class="pag-box cursor-pointer" :class="{ 'active': dpLowHigh === 3 }">
                <span>Lowest$</span>
              </div>
              <div @click="filterByDP(4);" class="pag-box cursor-pointer" :class="{ 'active': dpLowHigh === 4 }">
                <span>Highest$</span>
              </div>
            </div>
          </div>
          <!-- Show Only My Dancer -->
          <div class="checkbox-container">
            <span class="custom-checkbox">Show only my crew</span>
            <input type="checkbox" id="checkbox3" name="energyDrink" v-model="showOnlyMyCard" class="cursor-pointer">
            <label for="checkbox3" class="cursor-pointer"></label>
          </div>
        </div>
        <!-- Crew Card -->
        <div class="crew-card-wrapper">
          <div class="crew-card-container">
            <div v-for="(crew, index) in crewCardData" :key="index" v-show="
            (parseInt(crew.dp / 100) >= rangeValueSlider[0] && ( parseInt(crew.dp / 100) <= rangeValueSlider[1] || rangeValueSlider[1] === 2500)) &&
            ((showOnlyMyCard === true && crew.own === walletAddress) || (showOnlyMyCard === false
            ))" 
            class="crew-card-box">
              <div class="crew-card-box-inner">
              <!-- <img class="card-character" :src="require(`./../../assets/images/character/crew/${crew.image}`)"> -->
              <!-- <div v-if="crew.check === false" class="crew-card-inner-box" :style="'background-image: url('+ require(`./../../assets/images/character/crew/${crew.image}`) +')'"> -->
                <div v-if="crew.check === false" class="crew-card-inner-box" :style="'background-image: url('+ require(`./../../assets/images/card/Crew/` + crewImage(crew.tokenID))">
                  <img class="box-mask" src="./../../assets/images/box-mask.png" alt="">
                  <div class="corner-left-top">
                    <h5 class="cardName-style">{{ crew.name }}</h5>
                    <h6>#{{ crew.tokenID }}</h6>
                  </div>
                  <div @click="modalBattleBuyEnergyDrink()" class="corner-right-top cursor-pointer">
                    <img class="power-rate" src="./../../assets/images/icon/crew-power.png">
                    <span>{{ crew.supply }}</span>
                  </div>
                  <!-- <div class="corner-left-bottom">
                    <a href="">
                      <img class="star-rate" src="./../../assets/images/icon/refresh.png">
                    </a>
                  </div> -->
                  <div class="corner-right-bottom">
                    <div @click="checkCrewDetail(index, true)" class="cursor-pointer tooltip-custom">
                      <img class="star-rate" src="./../../assets/images/icon/magni.png">
                      <span class="tooltiptext-custom" style="left: 35px;">Show Detail</span>
                    </div>
                  </div>
                  <div class="corner-left-bottom cursor-pointer tooltip-custom" v-if="crew.own === walletAddress" @click="cancelSelling(crew.tokenID)">
                    <img src="./../../assets/images/icon/delete.png">
                    <span class="tooltiptext-custom" style="left: 35px;">Cancel Sell</span>
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
                    </div>
                  </div>
                  <!-- Dancer -->
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
                  <div class="corner-right-top">
                    <img class="power-rate" src="./../../assets/images/icon/crew-power.png">
                    <span>{{ crew.supply }}</span>
                  </div>
                  <div class="corner-right-bottom">
                    <div @click="checkCrewDetail(index, false)" class="cursor-pointer">
                      <img class="star-rate" src="./../../assets/images/icon/magni-uncheck.png">
                    </div>
                  </div>
                  <h4 class="cardName-style">
                    {{ crew.member }}<br>
                    {{ parseInt(crew.dp / 100) }} DP 
                  </h4>
                </div>
              </div>
              <div class="outter-box">
                <div v-if="crew.own !== walletAddress" class="market-button cursor-pointer" @click="buyItem(crew.tokenID, crew.price)">
                  {{ crew.price / 1000000000000000000 }} $MDC
                </div>
                <div v-if="crew.own === walletAddress" class="market-button-own cursor-pointer cardName-style">
                  {{ crew.price / 1000000000000000000 }} $MDC
                  <span class="cursor-pointer tooltip-custom" @click="updatePrice(crew.tokenID)" >
                    <img src="./../../assets/images/icon/exchange.png">
                    <span class="tooltiptext-custom">Update Price</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalLoadingBuyCrew ref="ModalLoadingBuyCrew"/>
  <ModalLoadingCancelCrew ref="ModalLoadingCancelCrew"/>
  <ModalUpdatePrice ref="modalUpdatePrice" @refresh="refresh"/>
</template>

<script>
import Web3 from 'web3';
import Header from './../../components/Header.vue'
import Sidebar from './../../components/Sidebar.vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import ModalLoadingBuyCrew from './../../components/Modal/Loading/ModalLoadingBuyCrew.vue'
import ModalLoadingCancelCrew from './../../components/Modal/Loading/ModalLoadingCancelCrew.vue'
import ModalUpdatePrice from './../../components/Modal/ModalUpdatePrice.vue'
  
export default {
  name: 'CrewMarket',
  props: {
  },
  components: {
    Header,
    Sidebar,
    VueSlider,
    ModalUpdatePrice,
    ModalLoadingBuyCrew,
    ModalLoadingCancelCrew
  },
  inject: {
    MarketPlace: {
      from: 'MarketPlace'
    }
  },

  data() {
    return {
      walletAddress: '',

      currentDancers: 0,
      showOnlyMyCard: false,

      rangeValueSlider: [1, 2500],
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
      dpLowHigh: 1
    }
  },

  mounted() {
    this.rangeValueSlider = [1, 2500];
    this.$refs.sideBarMobileToggle.activeClass('mcrew');
    this.marketplaceCrew();

    if (this.$route.query.show == 'true') {
      this.showOnlyMyCard = true;
    }
  },
  methods: {
    toggleBurgerMenu() {
      this.$refs.sideBarMobileToggle.toggleBurgerMenu();
    },

    hireDancerModal() {
      this.$refs.modalHireDancer.showDancerModal();
    },

    changeCharacterDetail(index, c) {
      this.crewCardData[index].checkCrew = c;
    },

    modalBattleBuyEnergyDrink() {
      this.$refs.modalBattleBuyEnergyDrink.showModal();
    },

    async showMyCrew(own) {
      if(this.showOnlyMyCard === false) {
        return !null;
      }

      if(this.showOnlyMyCard === false) {
        if ( own === this.walletAddress) {
          return own;
        }
      }
    },

    async refresh() {
      this.rangeValueSlider = [1, 2500];
      this.levelChoose = 'all',
      this.dpSort= 1;
      this.marketplaceCrew();
      this.$refs.headerBar.collectReward();
    },

    filterByDP(lh) {
      this.dpLowHigh = lh;
      if(lh === 1) {
        this.crewCardData.sort(function(a, b) {
          return a.dp - b.dp;
        });
      }
      if(lh === 2) {
        this.crewCardData.sort(function(a, b) {
          return b.dp - a.dp;
        });
      }
      if(lh === 3) {
        this.crewCardData.sort(function(a, b) {
          return a.price - b.price;
        });
      }
      if(lh === 4) {
        this.crewCardData.sort(function(a, b) {
          return b.price - a.price;
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
      }

      for ( let c = 0; c < this.crewCardData[index].coachesId.length; c++){
        var crewCoaches = await this.getCoachByTokenID(this.crewCardData[index].coachesId[c]);
        this.crewCardData[index].coaches.push(crewCoaches);
      }
      // console.log(this.crewCardData);
    },

    // Display Smart Contract Crew Character
    async marketplaceCrew() {
      this.coachDataCard = [];
      // Get Wallet Address
      const web3 = new Web3(window.ethereum);
      await web3.eth.getAccounts().then(res => {
        this.walletAddress = res[0];
      });

      // this.coachTotal();

      var crewData = await this.MarketPlace().marketplaceCrew(this.walletAddress);
      this.crewCardData = crewData;
      this.currentCrews = crewData.length;
      this.availablecrews = crewData.length;

      for ( let i = 0 ; i < crewData.length ; i++) {
        this.totalDP += parseInt(crewData[i].dp);
      }
      // console.log(crewData);
      this.filterByDP(this.dpLowHigh);
    },

    async buyItem(tokenID, price) {
      this.$refs.ModalLoadingBuyCrew.showModal();
      // console.log(price);
      var res = await this.MarketPlace().buyToken( this.walletAddress , 'crew' , tokenID, price);
      if ( res === true) {
        this.refresh();
      }
      this.$refs.ModalLoadingBuyCrew.hideModal();
    },

    async updatePrice(tokenID) {
      this.$refs.modalUpdatePrice.showModal( 'crew',tokenID);
    },

    async cancelSelling(tokenID) {
      this.$refs.ModalLoadingCancelCrew.showModal();
      var res = await this.MarketPlace().cancelSelling( this.walletAddress ,3, tokenID);
      if ( res === true) {
        this.refresh();
      }
      this.$refs.ModalLoadingCancelCrew.hideModal();
    },

    //Top 3 Crew
    async topCrew() {
      // Get Wallet Address
      const web3 = new Web3(window.ethereum);
      await web3.eth.getAccounts().then(res => {
        this.walletAddress = res[0];
      });
      var list = await this.MarketPlace().marketplaceCrew(this.walletAddress);
      list.sort(function(a, b) {
        return b.dp - a.dp;
      });

      this.topList = list; //Top 3 Crew
    },

    // Available Coaches:
    // async coachTotal() {
    //   var coach = await this.Display().marketplaceCoach(this.walletAddress);
    //   this.availableCoaches = coach[0].length;
    // },

    // Get Dancers
    async getDancerByTokenID(id) {
      var item = await this.MarketPlace().getDancers(id);
      var dancers = {
        name: item[0],
        tokenID: id,
        dp: item[2]
      } 
      return dancers;
    },

    // Get Coach
    async getCoachByTokenID(id) {
      var item = await this.MarketPlace().getCoaches(id);
      var coaches = {
        name: item[0],
        tokenID: id,
        capacity: item[2]
      } 
      // console.log(coaches);
      return coaches;
    },

    crewImage(id) {
      var v = id.toString();
      var d = v[v.length - 1];
      return 'Crew' + d +'.png'
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  input[type=checkbox] + label {
    display: block;
    margin: 15px;
  }

  .dancer-invi-box {
    min-height: 50px;
  }

  .dancer-container {
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

  .dancer-wrapper {
    display: flex;
  }

  .dancer-data-box {
    margin: 0px 10px;
    padding: 10px 0;
    background: rgba(50,47,208, .4);
    width: 33%;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .dancer-data-box img {
    display: block;
    margin: 10px auto;
  }

  .dancer-data-box h5 {
    margin: 0;
    color: #59D8FD;
  }

  .dancer-data-box .titleDancer {
    height: 1.5vw;
    max-height: 40px;
  }

  .dancer-data-box .btnDancer {
    height: 3vw;
    max-height: 60px;
  }

  .choose-level-wrapper {
    display: flex;
    margin: 0 auto 0 0;
    align-items: flex-start;
  }

  .filter-level-container {
    margin: 35px 10px;
    display: inline-block;
  }

  .filter-level-container h5 {
color: #ffffff;
    text-align: left;
    font-size: .6em;
    margin-top: 15px;
  }

  .pagintaion-level-custom {
    display: flex;
  }

  .pagintaion-level-custom div{
    margin: 0 1.5px;
  }

  .range-slider-container {
    margin: 35px 10px;
    display: inline-block;
    width: 100%;
    max-width: 250px;
  }

  .range-slider-container h5{
    color: #ffffff;
    text-align: left;
    font-size: .6em;
    margin-top: 15px;
  }

  .checkbox-container {
    margin: 35px 10px;
    display: inline-block;
  }



  .rangeValueSliderConvert {
    display: flex;
    justify-content: space-between;
    color: #ffffff;
    font-size: .6em;
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
    margin: 0 auto 25px auto;
    display: inline-block;
    padding: 0px 10px;
  }

  .crew-card-inner-box {
    position: relative;
    width: 100%;
    margin: 0 auto 0 auto;
    padding-top: 100%;
    border-radius: 15px;
    display: flex;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: rgba(0,0,0,.5);
  }

  .card-character {
    height: 80%;
    margin: auto;
  }

  .crew-card-box-inner {
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 15px;
  }

  .outter-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .market-button {
    border-radius: 25px;
    background-color: #59D8FD;
    padding: 10px 15px;
    color: #ffffff;
    margin-top: 15px;
    text-shadow: 2px 2px #000;
  }

  .market-button-own {
    padding: 10px 15px;
    margin-top: 15px;
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

  .box-mask {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 15px;
  }

  .star-rate {
    margin: 0 1.5px;
  }

  .corner-right-top img{
    min-width: 5px;
    max-width: 20px;
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
  }

  .corner-left-bottom {
    position: absolute;
    left: 7.5%;
    bottom: 8.5%;
    display: flex;
    flex-direction: column;
  }

  .corner-left-bottom img{
    width: 25px;
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
    flex-basis: 48.5%;
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

  .sort-slot .pag-box{
    font-size: 0.9em;
  }

  @media (max-width: 960px) {
    .range-slider-container {
      width: 90%;
      max-width: unset;
      margin: 5px auto;
    }

    .choose-level-wrapper {
      display: block;
      text-align: left;
      padding: 10px;
    }

    .filter-level-container {
      margin: auto;
      display: block;
    }

    .checkbox-container {
      margin: 35px 10px;
      display: flex;
      align-items: center;
    }

    .custom-checkbox {
      order: 2;
    }

    .market-button,
    .market-button-own {
      font-size: 0.6em;
    }

    .sort-slot .pag-box {
      font-size: 0.6em;
      padding: 10px;
    }

    .sort-slot img {
      width: 100%;
    }
  }
  
</style>
